import {QUERY_ALL_SLUGS} from "../sanity/queries.ts";
import client from "../sanity/client.ts";

const SiteMap = function () {
    return <div>loading</div>;
};

export async function getServerSideProps({ res }) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karpuchinagallery.vercel.app/';
    const urls = await client.fetch(QUERY_ALL_SLUGS);
    const slugs = urls.map(
        (page) =>
            `
      <loc>${baseUrl}${page.replace('/', '')}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    `
    );

    slugs.push(`
        <loc>${baseUrl}</loc>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
    `)

    slugs.push(`
        <loc>${baseUrl}artists</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    `)

    slugs.push(`
        <loc>${baseUrl}exhibitions</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    `)

    slugs.push(`
        <loc>${baseUrl}fairs</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    `)

    slugs.push(`
        <loc>${baseUrl}about</loc>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    `)

    const locations = [...slugs];
    const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${locations.map((location) => `<url> ${location}</url>`).join('')}
    </urlset>
    `;
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap());
    res.end();
    return {
        props: {},
    };
}

export default SiteMap;