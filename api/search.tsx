import client from '@/client';
import {Event, EventType} from '@/api/classes';

export const fetchArtists = async (query: string | null) => {
    try {
        return await client.fetch(`*[_type == "artists" && name match $queryString + '*'] | order(orderRank){
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
        const events = await client.fetch(`               
                        *[_type == "${eventType}" && (title.cs match $queryString + "*" || title.en match $queryString + "*")] {
                            ...,
                            _id,
                            title,
                            slug,
                            artists,
                            openingDate,
                            fromDate,
                            toDate,
                            color,
                            cover,
                        }
                        `, {queryString: query});

        return events ? events.map((value: any) => Event.fromPayload(value, locale)) : []
    } catch (error) {
        return [];
    }
};