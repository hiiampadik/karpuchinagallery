import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    i18n: {
        defaultLocale: 'cs',
        locales: ['en', 'cs'],
    },
    images: {
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
