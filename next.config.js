/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true
// }

// module.exports = nextConfig


const withTM = require('next-transpile-modules')(['three-landscape']); 

module.exports = withTM({
  reactStrictMode: true
});