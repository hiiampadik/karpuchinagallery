/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://www.karpuchina.gallery",
  generateRobotsTxt: true,
  // Sitemaps are generated dynamically from fetched Sanity content
  sitemapSize: 0,
  exclude: ["*"],
};

export default config
