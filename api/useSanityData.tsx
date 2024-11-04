'use client'
import {useEffect, useState} from 'react';
import client from '../client';
import {About, Artist, Artwork, Event, EventDetail, Homepage} from '@/api/classes';


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
                            _id,
                            slug,
                            name,
                        },
                    },
                    upcoming->{
                        ...,
                        artists[]->{
                            _id,
                            slug,
                            name,
                        },
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

export const useFetchEvents = (locale: string, eventType: 'exhibitions' | 'fairs'): { data: Event[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(`               
                *[_type == "${eventType}"] | order(orderRank) {
                    ...,
                    _id,
                    title,
                    slug,
                    artists[]->{
                        _id,
                        slug,
                        name,
                    },
                    startDate,
                    endDate,
                    color,
                    cover,
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
                        artists[]->{
                            _id,
                            name,
                            slug
                        },
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

export const useFetchArtworks = (locale: string): { data: Artwork[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(`*[_type == "artworks"] {
                ...,
                artist->{
                                _id,
                                name,
                                slug
                            },
                
                }`);
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
        data: data && data.map((value: any) => Artwork.fromPayload(value, locale)),
        loading,
        error };
};