// sanity.js
import {createClient} from '@sanity/client'

// Import using ESM URL imports in environments that supports it:

const client = createClient({
    projectId: 'cg5jvog9', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    useCdn: false, // `false` if you want to ensure fresh data
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

export default client;
