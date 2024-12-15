import {Event, EventType} from '@/api/classes';
import clientCDN from '@/clientCDN';

export const fetchArtists = async (query: string | null) => {
    try {
        return await clientCDN.fetch(`*[_type == "artists" && name match $queryString + '*'] | order(orderRank){
                    ...,
                    events[]->{
                        ...
                    }
                }`,
            {queryString: query});
    } catch (error) {
        throw new Error('Error');
    }
};

export const fetchEvents = async (query: string, eventType: EventType, locale: string): Promise<Event[]> => {
    try {
        const queryString = `*${query}*`;

        const events = await clientCDN.fetch(
            `*[_type == $eventType && (
                title.cs match $queryString ||
                title.en match $queryString ||
                artists[] match $queryString
            )] {
                ..., 
                _id, 
                title, 
                slug, 
                artists, 
                openingDate, 
                fromDate, 
                toDate, 
                color, 
                cover
            }`,
            {
                eventType,
                queryString
            }
        );

        return events ? events.map((value: any) => Event.fromPayload(value, locale)) : []
    } catch (error) {
        return [];
    }
};