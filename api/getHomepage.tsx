import {sanityFetch} from '@/sanity/client';
import {QUERY_HOMEPAGE} from '@/sanity/queries';


export async function getHomepage () {
    return sanityFetch({query: QUERY_HOMEPAGE})
}