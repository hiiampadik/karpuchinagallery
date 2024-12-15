'use client'
import {Artist} from '@/api/classes';
import {useEffect, useState} from 'react';
import client from '@/sanity/client';
import {QUERY_ALL_ARTISTS} from '@/sanity/queries';

export const useFetchArtists = (locale: string): { data: Artist[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(QUERY_ALL_ARTISTS);
                setData(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [locale]);

    return {
        data: data && data.map((value: any) => Artist.fromPayload(value, locale)),
        loading,
        error };
};
