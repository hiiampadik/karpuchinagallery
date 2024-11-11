import {Event, EventDetail} from '@/api/classes';
import {useEffect, useState} from 'react';
import client from '@/client';

export const useFetchEvents = (locale: string, eventType: 'exhibitions' | 'fairs', query?: string | null): { data: Event[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (query === null){
            return
        }
        const fetchData = async () => {
            try {
                let result;
                if (query){
                    result = await client.fetch(`               
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
                } else {
                    result = await client.fetch(`               
                        *[_type == "${eventType}"] | order(orderRank) {
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
                        `);
                }
                setData(result);
            } catch (error) {
                console.log(error)
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            // Optionally, you can cancel any pending requests here
        };
    }, [query, eventType]);

    return {
        data: data && data.map((value: any) => Event.fromPayload(value, locale)),
        loading,
        error };
};

export const useFetchEventDetail = (slug: string | undefined, locale: string, eventType: 'exhibitions' | 'fairs'): { data: EventDetail | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (slug !== undefined){
                try {
                    const result = await client.fetch(
                        `{"event": *[_type == "${eventType}" && slug.current == $slug] | order(_updatedAt desc) [0] {
                        ...,
                        artworks[]->{
                            _id,
                            title,
                            year,
                            artist->{
                                _id,
                                name,
                                slug
                            },
                            showInSelection,
                            cover,
                            gallery
                        },
                        documents[]{
                            ...,
                            documentCover{
                                ...,
                            },
                            file{
                                ...,
                                asset->{
                                    ...
                                }
                            }
                        }
                        
                        
                        }}`,
                        { slug: slug}
                    );
                    setData(result.event);
                } catch (error) {
                    setError(error as Error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            // Optionally, you can cancel any pending requests here
        };
    }, [slug]);

    return { data: data && EventDetail.fromPayload(data, locale), loading, error };
};
