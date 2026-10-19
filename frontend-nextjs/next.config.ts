import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: no Node.js server needed at runtime, just any static
  // file host. Because of this, a server-side rewrite proxy isn't
  // available -- there's no Node process running to do the proxying.
  // lib/api.ts instead calls the FastAPI backend directly by absolute
  // URL, relying on the CORS middleware configured in main.py.
  output: "export",
  // Emit /platform/index.html rather than /platform.html so direct loads and
  // reloads work on any plain static file host.
  trailingSlash: true,
};

export default nextConfig;
