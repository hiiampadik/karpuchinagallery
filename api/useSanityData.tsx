'use client'
import {useEffect, useState} from 'react';
import client from '../client';
import {About, Artist, Exhibition, Homepage} from '@/api/classes';


export const useFetchHomepage = (locale: string): { data: Homepage | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(`
                *[_type == 'homepage'][0]{
                    onDisplay->{
                        ...,
                        artists[]->{
                            name
                        }
                    },
                    upcoming->{
                        ...,
                        artists[]->{
                            name
                        }
                    }
                }
                `
                );
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

    return { data: data && Homepage.fromPayload(data, locale), loading, error };
};

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


export const useFetchArtists = (locale: string): { data: Artist[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(`*[_type == "artists"] | order(orderRank)`);
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
                        `{"artist": *[_type == "artists" && slug.current == $slug] | order(_updatedAt desc) [0] {...}}`,
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

export const useFetchExhibitions = (locale: string): { data: Exhibition[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(`               
                *[_type == "exhibitions"] | order(orderRank) {
                    ...,
                    artists[]->{
                        name
                    },
                }
                `);
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

    return {
        data: data && data.map((value: any) => Exhibition.fromPayload(value, locale)),
        loading,
        error };
};

export const useFetchExhibition = (slug: string | undefined, locale: string): { data: Exhibition | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (slug !== undefined){
                try {
                    const result = await client.fetch(
                        `{"exhibition": *[_type == "exhibitions" && slug.current == $slug] | order(_updatedAt desc) [0] {
                        ...,
                        artists[]->{
                            name
                        },
                        "document": document{
                            ..., 
                            asset->{...},
                            },
                        }}`,
                        { slug: slug}
                    );
                    setData(result.exhibition);
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

    return { data: data && Exhibition.fromPayload(data, locale), loading, error };
};