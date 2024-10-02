/** @type {import('next').NextConfig} */

const nextConfig = {
    i18n: {
        defaultLocale: 'cs',
        locales: ['en', 'cs'],
    },

    images: {
        domains: ['cdn.sanity.io'],
    },

};

export default nextConfig;
