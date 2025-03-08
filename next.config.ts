import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    viewTransition: true,
    mdxRs: true
  }
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
