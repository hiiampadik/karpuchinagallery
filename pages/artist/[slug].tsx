import React from "react";
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import {Artist as ArtistClass, Artwork} from '@/api/classes';
import client from '@/sanity/client';
import {QUERY_ALL_ARTWORKS, QUERY_ARTIST, QUERY_ARTIST_SLUGS} from '@/sanity/queries';
import ArtistDetail from '@/components/Artists/ArtistDetail';

export const dynamic = 'auto';

export default function Artist(props: any) {
    const router = useRouter();
    const artist = ArtistClass.fromPayload(props.artist, router.locale ?? 'cs')
    const artworks = props.artworks.map((artworks: any) => Artwork.fromPayload(artworks, router.locale ?? 'cs'));

    return (
        <ArtistDetail artist={artist} artworks={artworks} />
    )
}

export async function getStaticPaths() {
    const slugs = await client.fetch(QUERY_ARTIST_SLUGS);
    const locales = ['cs', 'en'];
    const paths = slugs.flatMap((slug: string) =>
        locales.map((locale) => ({
            params: { slug },
            locale,
        }))
    );
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const artist = await client.fetch(QUERY_ARTIST, { slug: context.params?.slug})
    const artworks = await client.fetch(QUERY_ALL_ARTWORKS)

    if (!artist || !artworks || !(artist.artist)) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            artist: artist.artist,
            artworks: artworks,
            messages: (await import(`../../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 60
    };
}



