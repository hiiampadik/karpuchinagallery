import {Event} from '@/api/classes';
import {sanityFetch} from '@/sanity/client';
import {QUERY_SEARCH} from '@/sanity/queries';

export const fetchEvents = async (query: string, locale: string): Promise<Event[]> => {
    try {
        const queryString = `*${query}*`;
        // const events = await client.fetch(QUERY_SEARCH, {queryString});
        const events = await sanityFetch({query: QUERY_SEARCH, params: {queryString}});
        return events ? events.map((value: any) => Event.fromPayload(value, locale)) : []

    } catch (error) {
        return [];
    }
};