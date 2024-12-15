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

        console.log(`===== Revalidating: ${type}, ${slug}`);

        let path = '';
        switch(type){
            case 'exhibitions':
                path = `/exhibition/${req.body.slug.current}`;
                break;
            case 'fairs':
                path = `/fair/${req.body.slug.current}`;
                break;
            case 'artistEvents':
                path = `/artists-event/${req.body.slug.current}`;
                break;
            case 'artists':
                path = `/artist/${req.body.slug.current}`;
                break;
            case 'homepage':
                path = '/';
                break
            case 'about':
                path = '/about';
                break
            default:
                console.log(`===== Wrong type ${type}`);
                return res.status(500).send('Error while revalidating');
        }

        await res.revalidate(path);
        return res.json({ revalidated: true });

    } catch (err) {
        // Could not revalidate. The stale page will continue to be shown until
        // this issue is fixed.
        console.log(`===== Error ${err.message}`);
        return res.status(500).send('Error while revalidating');
    }
}