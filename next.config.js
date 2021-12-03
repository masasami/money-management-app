/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/app',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/top',
        permanent: true,
      },
    ]
  },
}
