import {Artist} from '@/api/classes';
import {useEffect, useState} from 'react';
import client from '@/client';

export const useFetchArtists = (locale: string, query?: string | null): { data: Artist[] | null, loading: boolean, error: Error | null} => {
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
                    result = await client.fetch(`*[_type == "artists" && name match $queryString + '*'] | order(orderRank){
                        ...,
                        events[]->{
                            ...
                        }
                    }`,
                        {queryString: query});
                } else {
                    result = await client.fetch(`*[_type == "artists"] | order(orderRank){
                        ...,
                        events[]->{
                            ...
                        }
                    }`);
                }
                setData(result);
            } catch (error) {
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
    }, [query]);

    return {
        data: data && data.map((value: any) => Artist.fromPayload(value, locale)),
        loading,
        error };
};

export const useFetchArtist = (slug: string | undefined, locale: string): { data: Artist | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (slug !== undefined){
                try {
                    const result = await client.fetch(
                        `{"artist": *[_type == "artists" && slug.current == $slug] | order(_updatedAt desc) [0] {
                        ...,
                         events[]->{
                            ...
                        },
                        }}`,
                        { slug: slug}
                    );
                    setData(result.artist);
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

    return { data: data && Artist.fromPayload(data, locale), loading, error };
};
