import React from "react";
import {useRouter} from 'next/router';
import ArtistDetail from '@/components/Artists/ArtistDetail';
import {useFetchArtist} from '@/api/artist';
import {useParams} from 'next/navigation';
import Layout from '@/components/Layout';

export const dynamic = 'auto';
export const revalidate = 3600

export default function Artist() {
    const router = useRouter();
    const params = useParams()
    const {data} = useFetchArtist(params?.slug as string, router.locale ?? 'cs')

    return (
        <Layout title={data?.artist.Name}>
            {data &&
                <ArtistDetail artist={data.artist} artworks={data.artworks} />
            }
        </Layout>
    )
}
