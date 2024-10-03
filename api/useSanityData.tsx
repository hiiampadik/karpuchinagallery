'use client'
import {useEffect, useState} from 'react';
import client from '../client';
import { About } from '@/domain/classes';

export const useFetchAbout = (locale: string): { data: About | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(`*[_type == 'about'][0]`);
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
    }, []);

    return { data: data && About.fromPayload(data, locale), loading, error };
};
