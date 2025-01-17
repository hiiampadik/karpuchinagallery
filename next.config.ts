import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    experimental: {
        dynamicIO: true
    },
    i18n: {
        defaultLocale: 'cs',
        locales: ['en', 'cs'],
    },
    images: {
        // remotePatterns: ['cdn.sanity.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ]
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },

};

export default nextConfig;
