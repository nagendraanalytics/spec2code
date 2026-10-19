"""embeddings.py - local text embeddings for the knowledge base.

Two backends, chosen at startup and recorded on every chunk so vectors from
different backends are never compared:

  * sentence-transformers, when installed and SPEC2CODE_EMBED_MODEL names a
    model (for example a SBERT model). Runs locally, nothing leaves the host.
  * hashing, the default fallback: word and bigram hashing into 1024 dims.
    It needs no model download and works offline, but it is LEXICAL only: it
    matches shared words, not meaning. Treat retrieval quality accordingly.
"""

import os
from typing import Optional

import numpy as np

HASH_DIMS = 1024
_st_model = None
_st_name: Optional[str] = None
_st_failed = False


def _load_st():
    global _st_model, _st_name, _st_failed
    name = os.environ.get("SPEC2CODE_EMBED_MODEL", "").strip()
    if not name or _st_failed:
        return None
    if _st_model is None:
        try:
            from sentence_transformers import SentenceTransformer

            _st_model = SentenceTransformer(name)
            _st_name = name
        except Exception:
            _st_failed = True
            return None
    return _st_model


def backend_name() -> str:
    return f"st:{_st_name}" if _load_st() is not None else "hashing-v1"


def _hashing(texts: list) -> np.ndarray:
    from sklearn.feature_extraction.text import HashingVectorizer

    vec = HashingVectorizer(n_features=HASH_DIMS, ngram_range=(1, 2), alternate_sign=False, norm=None,
                            lowercase=True, token_pattern=r"(?u)\b[\w.]{2,}\b")
    m = vec.transform(texts).toarray().astype(np.float32)
    m = np.log1p(m)  # damp repeated words
    norms = np.linalg.norm(m, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    return m / norms


def embed(texts: list) -> tuple:
    """Returns (matrix of L2-normalised float32 vectors, backend name)."""
    if not texts:
        return np.zeros((0, HASH_DIMS), dtype=np.float32), backend_name()
    model = _load_st()
    if model is not None:
        arr = np.asarray(model.encode(texts, normalize_embeddings=True, show_progress_bar=False), dtype=np.float32)
        return arr, f"st:{_st_name}"
    return _hashing(texts), "hashing-v1"


def to_blob(v: np.ndarray) -> bytes:
    return np.asarray(v, dtype=np.float32).tobytes()


def from_blob(b: bytes) -> np.ndarray:
    return np.frombuffer(b, dtype=np.float32)
