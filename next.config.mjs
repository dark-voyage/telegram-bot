/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'orzklv.uz',
                port: '',
                pathname: '/favicons/**',
            },
        ],
    }
}

export default nextConfig
