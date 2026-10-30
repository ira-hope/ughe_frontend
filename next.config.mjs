/** @type {import('next').NextConfig} */
const nextConfig = {
  // Builds a small self-contained server, used by the Dockerfile
  output: "standalone",
};

export default nextConfig;
