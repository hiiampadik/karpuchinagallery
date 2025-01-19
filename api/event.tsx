'use client'
import {Event, EventDetail} from '@/api/classes';
import {useEffect, useState} from 'react';
import {sanityFetch} from '@/sanity/client';

export const useFetchEvents = (locale: string, query: string): { data: Event[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await sanityFetch({query: query});
                setData(result);
            } catch (error) {
                console.log(error)
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return {
        data: data && data.map((value: any) => Event.fromPayload(value, locale)),
        loading,
        error };
};


export const useFetchEventDetail = (slug: string | undefined, locale: string, query: string): { data: EventDetail | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (slug !== undefined){
                try {
                    const result = await sanityFetch({query, params: {slug: slug}});
                    setData(result.event);
                } catch (error) {
                    setError(error as Error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [query, slug]);

    return { data: data && EventDetail.fromPayload(data, locale), loading, error };
};