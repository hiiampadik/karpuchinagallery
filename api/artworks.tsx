import {Artwork} from '@/api/classes';
import {useEffect, useState} from 'react';
import clientCDN from '@/clientCDN';

export const useFetchArtworks = (locale: string): { data: Artwork[] | null, loading: boolean, error: Error | null} => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await clientCDN.fetch(`*[_type == "artworks"] {
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
