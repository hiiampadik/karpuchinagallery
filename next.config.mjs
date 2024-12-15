/** @type {import('next').NextConfig} */

const nextConfig = {
    i18n: {
        defaultLocale: 'cs',
        locales: ['en', 'cs'],
    },

    images: {
        domains: ['cdn.sanity.io'],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },

};

export default nextConfig;
