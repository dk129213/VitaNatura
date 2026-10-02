import type { NextConfig } from "next";

// GitHub Pages serves this project from https://<user>.github.io/<repo>/,
// so the deploy workflow sets PAGES_BASE_PATH (e.g. "/VitaNatura").
// Locally it is empty and the app runs at http://localhost:3000/.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // plain HTML/CSS/JS in web/out, no server needed
  basePath,
  trailingSlash: true, // /help/ -> /help/index.html, which GitHub Pages serves directly
  images: {
    // No image server on GitHub Pages: the loader just prefixes the base path.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
