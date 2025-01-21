import React from "react";
import {useRouter} from 'next/router';
import ArtistDetail from '@/components/Artists/ArtistDetail';
import Layout from '@/components/Layout';
import client, {sanityFetch} from '@/sanity/client';
import {QUERY_ALL_ARTWORKS_AND_ARTIST, QUERY_ARTIST_SLUGS} from '@/sanity/queries';
import {GetStaticPropsContext} from 'next';
import {ArtistDetail as ArtistClass, Artwork} from '@/api/classes';
import {getImageDimensions} from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';


export default function Artist({data}: any) {
    const router = useRouter();
    const artist = ArtistClass.fromPayload(data.artist, router.locale ?? 'cs')
    const artworks = data.artworks.map((artworks: any) => Artwork.fromPayload(artworks, router.locale ?? 'cs'))


    const coverDimensions = getImageDimensions(artist.Cover)
    const builder = imageUrlBuilder(client);
    return (
        <Layout title={artist.Name}
                image={{
                    url: builder.image(artist.Cover).auto("format").width(480).quality(60).url(),
                    height: coverDimensions.height.toString(),
                    width: coverDimensions.width.toString(),
                }}
        >
            <ArtistDetail artist={artist} artworks={artworks} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const slugs = await sanityFetch({query: QUERY_ARTIST_SLUGS, useCdn: false});
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
    const data = await sanityFetch({query: QUERY_ALL_ARTWORKS_AND_ARTIST, params: {slug: context.params?.slug}, useCdn: false});

    return {
        props: {
            data,
        },
        revalidate: 172800, // two days
    };
}