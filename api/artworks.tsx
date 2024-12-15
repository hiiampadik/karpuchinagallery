'use client'
import {Artwork} from '@/api/classes';
import {useEffect, useState} from 'react';
import client from '@/sanity/client';
import {QUERY_ALL_ARTWORKS} from '@/sanity/queries';

export const useFetchArtworks = (locale: string): { data: Artwork[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(QUERY_ALL_ARTWORKS);
                setData(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, []);

    return {
        data: data && data.map((value: any) => Artwork.fromPayload(value, locale)),
        loading,
        error };
};
