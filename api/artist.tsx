'use client'
import {ArtistDetail as ArtistClass, Artwork} from '@/api/classes';
import {useEffect, useState} from 'react';
import client from '@/sanity/client';
import {QUERY_ALL_ARTWORKS_AND_ARTIST} from '@/sanity/queries';


export const useFetchArtist = (slug: string | undefined, locale: string): { data: {artist: ArtistClass, artworks: Artwork[]} | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (slug !== undefined){
                try {
                    const result = await client.fetch(QUERY_ALL_ARTWORKS_AND_ARTIST, {slug: slug});
                    setData(result);
                } catch (error) {
                    setError(error as Error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [slug]);

    if (data){
        return (
            { data: {
                artist : ArtistClass.fromPayload(data.artist, locale),
                artworks: data.artworks.map((artworks: any) => Artwork.fromPayload(artworks, locale))},
            loading,
            error })
    }
    return { data: null, loading, error };

};
