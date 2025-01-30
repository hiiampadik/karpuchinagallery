import {QUERY_ALL_SLUGS} from "../sanity/queries.ts";
import client from "../sanity/client.ts";

const SiteMap = function () {
    return <div>loading</div>;
};

function createXmlEntry(url) {
    return `
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>`;
}

export async function getServerSideProps({ res }) {
    const baseUrl = 'https://www.karpuchina.gallery/';
    const urls = await client.fetch(QUERY_ALL_SLUGS);
    const slugs = []

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

    const locations = [
        ...slugs,
        ...urls.exhibitions.map((slug) => createXmlEntry(`${baseUrl}exhibition/${slug.slug}`)),
        ...urls.fairs.map((slug) => createXmlEntry(`${baseUrl}fair/${slug.slug}`)),
        ...urls.artistsEvents.map((slug) => createXmlEntry(`${baseUrl}artists-event/${slug.slug}`)),
        ...urls.artists.map((slug) => createXmlEntry(`${baseUrl}artist/${slug.slug}`)),
    ];

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