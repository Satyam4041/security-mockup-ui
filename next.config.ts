import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes a plain HTML/CSS/JS site to /out.
  output: 'export',
  // Set BASE_PATH (e.g. "/repo-name") when hosting under a sub-path such as GitHub Pages.
  basePath: process.env.BASE_PATH || '',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
