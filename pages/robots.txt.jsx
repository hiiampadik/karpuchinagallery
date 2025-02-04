const Robots = function () {
    return <div>loading</div>;
};

export async function getServerSideProps({ res }) {
    const createRobots = () => `# *
User-agent: *
Allow: /

# Host
Host: https://www.karpuchina.gallery

# Sitemaps
Sitemap: https://www.karpuchina.gallery/sitemap.xml

    `;
    res.setHeader('Content-Type', 'text/txt');
    res.write(createRobots());
    res.end();
    return {
        props: {},
    };
}

export default Robots;