import type {NextConfig} from 'next'
import {withPayload} from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 100],
  },
  experimental: {
    reactCompiler: false,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

export default withPayload(nextConfig, {devBundleServerPackages: false})
