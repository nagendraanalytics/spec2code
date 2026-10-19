"""
knowledge_fetch.py -- fetch public reference files into the knowledge library, safely.

Runs wherever the app runs, so that machine needs internet access (the build sandbox did not have it).

Guards, because the URL comes from a catalogue a person can edit:
  * https only; host must be on the allowlist (hosts of the catalogue's fetchable entries, plus
    SPEC2CODE_FETCH_HOSTS, comma separated)
  * every address the host resolves to must be public (no loopback, private, link-local or metadata addresses)
  * redirects are followed by hand, at most 3, and each target is checked again
  * size cap (SPEC2CODE_FETCH_MAX_MB, default 50) and time limit
  * a web page returned where a file was expected (a login or moved page) is rejected, not stored
Residual risk: the address check and the connection are separate lookups, so DNS rebinding is not fully excluded.
Allowlisted hosts are public government and standards sites, which keeps that risk low.
"""
from __future__ import annotations

import http.client
import ipaddress
import json
import os
import socket
import ssl
import urllib.parse

CATALOG_PATH = os.environ.get("SPEC2CODE_CATALOG", os.path.join(os.path.dirname(os.path.abspath(__file__)), "knowledge_catalog.json"))
MAX_BYTES = int(float(os.environ.get("SPEC2CODE_FETCH_MAX_MB", "50")) * 1024 * 1024)
TIMEOUT = float(os.environ.get("SPEC2CODE_FETCH_TIMEOUT", "40"))
MAX_REDIRECTS = 3
UA = "Spec2Code-knowledge-fetch/1.0 (reference documents; contact: your admin)"


class FetchError(Exception):
    pass


def load_catalog() -> list[dict]:
    with open(CATALOG_PATH, encoding="utf-8") as f:
        return json.load(f)["entries"]


def allowed_hosts(entries: list[dict] | None = None) -> set[str]:
    entries = load_catalog() if entries is None else entries
    hosts = {urllib.parse.urlsplit(e["url"]).hostname for e in entries if e.get("kind") == "file" and e.get("url")}
    hosts |= {h.strip().lower() for h in os.environ.get("SPEC2CODE_FETCH_HOSTS", "").split(",") if h.strip()}
    return {h.lower() for h in hosts if h}


def _public(host: str) -> None:
    try:
        infos = socket.getaddrinfo(host, 443, proto=socket.IPPROTO_TCP)
    except socket.gaierror as e:
        raise FetchError(f"Cannot resolve {host}: {e.strerror or e}. Does this machine have internet access?") from e
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if not ip.is_global:
            raise FetchError(f"{host} resolves to a non-public address ({ip}). Refused.")


def _get(host: str, path: str, timeout: float, max_bytes: int):
    """One GET. Returns (status, headers, body). Separate so tests can replace the network."""
    conn = http.client.HTTPSConnection(host, 443, timeout=timeout, context=ssl.create_default_context())
    try:
        conn.request("GET", path, headers={"User-Agent": UA, "Accept": "*/*", "Accept-Encoding": "identity"})
        r = conn.getresponse()
        headers = {k.lower(): v for k, v in r.getheaders()}
        if r.status in (301, 302, 303, 307, 308):
            return r.status, headers, b""
        declared = int(headers.get("content-length", "0") or 0)
        if declared > max_bytes:
            raise FetchError(f"The file is {declared // (1024 * 1024)} MB, over the {max_bytes // (1024 * 1024)} MB limit.")
        body = r.read(max_bytes + 1)
        if len(body) > max_bytes:
            raise FetchError(f"The file is over the {max_bytes // (1024 * 1024)} MB limit.")
        return r.status, headers, body
    except (OSError, http.client.HTTPException) as e:
        raise FetchError(f"Could not download from {host}: {e}") from e
    finally:
        conn.close()


def _split(url: str) -> tuple[str, str]:
    u = urllib.parse.urlsplit(url.strip())
    if u.scheme != "https":
        raise FetchError("Only https links are fetched.")
    if not u.hostname or u.username or u.password or (u.port not in (None, 443)):
        raise FetchError("The link has no host, has credentials, or uses a non-standard port.")
    path = urllib.parse.quote(urllib.parse.unquote(u.path or "/"), safe="/%:@!$&'()*+,;=-._~") + (f"?{u.query}" if u.query else "")
    return u.hostname.lower(), path


def fetch(url: str, hosts: set[str], expect: str = "", *, timeout: float | None = None, max_bytes: int | None = None):
    """Returns (data, final_url). `expect` is the file format the catalogue promises (txt, pdf, xlsx ...)."""
    cur = url
    for _ in range(MAX_REDIRECTS + 1):
        host, path = _split(cur)
        if host not in hosts:
            raise FetchError(f"{host} is not on the allowlist. Add it to SPEC2CODE_FETCH_HOSTS if you trust it.")
        _public(host)
        status, headers, body = _get(host, path, timeout or TIMEOUT, max_bytes or MAX_BYTES)
        if status in (301, 302, 303, 307, 308):
            loc = headers.get("location", "")
            if not loc:
                raise FetchError("Redirect with no target.")
            cur = urllib.parse.urljoin(cur, loc)
            continue
        if status != 200:
            raise FetchError(f"The server answered {status}.")
        ctype = headers.get("content-type", "").lower()
        if expect and expect not in ("html", "htm") and ctype.startswith("text/html"):
            raise FetchError("The server returned a web page, not the file (a login page, or the file moved). Download it by hand and upload it.")
        if not body:
            raise FetchError("The file is empty.")
        return body, cur
    raise FetchError(f"More than {MAX_REDIRECTS} redirects.")
