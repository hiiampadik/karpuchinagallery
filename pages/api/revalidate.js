import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export default async function handler(req, res) {
    const signature = req.headers[SIGNATURE_HEADER_NAME];
    const isValid = isValidSignature(JSON.stringify(req.body), signature, SANITY_WEBHOOK_SECRET);

    // Validate signature
    if (!isValid) {
        console.log(`===== Not valid signature`);
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
    }

    try {
        const type = req.body['_type'];

        let path = '';
        let slug = ''
        switch(type){
            case 'exhibitions':
                slug = req.body.slug.current
                console.log(`===== Revalidating: ${type}, ${slug}`);
                path = `exhibition/${slug}`;
                break;
            case 'fairs':
                slug = req.body.slug.current
                console.log(`===== Revalidating: ${type}, ${slug}`);
                path = `fair/${slug}`;
                break;
            case 'artistEvents':
                slug = req.body.slug.current
                console.log(`===== Revalidating: ${type}, ${slug}`);
                path = `artists-event/${slug}`;
                break;
            case 'artists':
                slug = req.body.slug.current
                console.log(`===== Revalidating: ${type}, ${slug}`);
                path = `artist/${slug}`;
                break;
            case 'homepage':
                console.log(`===== Revalidating: Homepage`);
                path = '';
                break
            case 'about':
                console.log(`===== Revalidating: About`);
                path = 'about';
                break
            default:
                console.log(`===== Wrong type ${type}`);
                res.status(401).json({ success: false, message: 'Invalid Type' });
                return
        }

        await Promise.all([
             res.revalidate(`/en/${path}`),
             res.revalidate(`/cs/${path}`)
        ]);

        return res.json({ revalidated: true });

    } catch (err) {
        // Could not revalidate. The stale page will continue to be shown until
        // this issue is fixed.
        console.log(`===== Error ${err.message}`);
        res.status(401).json({ success: false, message: 'Could not Revalidate' });
    }
}