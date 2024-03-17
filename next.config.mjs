/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/contacts',
        permanent: true,
      },
    ]
  },
  transpilePackages: ['mui-tel-input'],
}

export default nextConfig
