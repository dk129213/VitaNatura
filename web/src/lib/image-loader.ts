"use client";

// Images are served as-is from /public. On GitHub Pages they live under the repo path,
// which next/image does not add by itself, so prefix it here.
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
