'use client'
import {Event} from '@/api/classes';
import {useEffect, useState} from 'react';
import client from '@/sanity/client';

export const useFetchEvents = (locale: string, query: string): { data: Event[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(query);
                setData(result);
            } catch (error) {
                console.log(error)
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [locale, query]);

    return {
        data: data && data.map((value: any) => Event.fromPayload(value, locale)),
        loading,
        error };
};