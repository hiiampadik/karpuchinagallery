import {Event, EventType} from '@/api/classes';
import client from '@/sanity/client';
import {QUERY_SEARCH} from '@/sanity/queries';
export const fetchEvents = async (query: string, eventType: EventType, locale: string): Promise<Event[]> => {
    try {
        const queryString = `*${query}*`;

        const events = await client.fetch(QUERY_SEARCH, {eventType, queryString});

        return events ? events.map((value: any) => Event.fromPayload(value, locale)) : []
    } catch (error) {
        return [];
    }
};