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
        const slug = req.body.slug.current;
        const type = req.body['_type'];

        console.log(`===== Revalidating: ${type}, ${slug}`);

        let path = '';
        switch(type){
            case 'exhibitions':
                path = 'exhibition';
                break;
            case 'fairs':
                path = 'fair';
                break;
            case 'artistEvents':
                path = 'artists-event';
                break;
            case 'artists':
                path = 'artist';
                break;
        }

        await res.revalidate(`/${path}/${slug}`);


        return res.json({ revalidated: true });
    } catch (err) {
        // Could not revalidate. The stale page will continue to be shown until
        // this issue is fixed.
        return res.status(500).send('Error while revalidating');
    }
}