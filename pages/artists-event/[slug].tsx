import React from "react";
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import EventDetail from '@/components/Events/EventDetail';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import client, {sanityFetch} from '@/sanity/client';
import {QUERY_ARTISTS_EVENTS, QUERY_ARTISTS_EVENTS_SLUGS} from '@/sanity/queries';
import Layout from '@/components/Layout';
import {getImageDimensions} from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';

export default function ArtistsEvent({data}: any) {
    const router = useRouter();
    const artistsEvent = EventDetailClass.fromPayload(data, router.locale ?? 'cs')
    const coverDimensions = getImageDimensions(artistsEvent.Cover)
    const builder = imageUrlBuilder(client);

    return (
        <Layout
            title={artistsEvent.Title}
            image={{
                url: builder.image(artistsEvent.Cover).auto("format").width(480).quality(60).url(),
                height: coverDimensions.height.toString(),
                width: coverDimensions.width.toString(),
            }}
        >
            <EventDetail event={artistsEvent} type={EventType.ArtistsEvents} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const slugs = await sanityFetch({query: QUERY_ARTISTS_EVENTS_SLUGS, useCdn: false});
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
    const data = await sanityFetch({query: QUERY_ARTISTS_EVENTS, params: {slug: context.params?.slug}, useCdn: false});

    return {
        props: {
            data: data.event,
        },
        revalidate: 172800, // two days
    };
}
