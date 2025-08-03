import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
    serverMinification: false,
    allowedDevOrigins: [
      'https://6000-firebase-studio-1754214354330.cluster-6dx7corvpngoivimwvvljgokdw.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
