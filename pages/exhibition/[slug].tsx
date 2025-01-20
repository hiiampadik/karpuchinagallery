import React from "react";
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import EventDetail from '@/components/Events/EventDetail';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import client, {sanityFetch} from '@/sanity/client';
import {QUERY_EXHIBITION, QUERY_EXHIBITION_SLUGS} from '@/sanity/queries';
import {getImageDimensions} from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import Layout from '@/components/Layout';

export default function Exhibition({data}: any) {
    const router = useRouter();
    const exhibition = EventDetailClass.fromPayload(data, router.locale ?? 'cs')
    const coverDimensions = getImageDimensions(exhibition.Cover)
    const builder = imageUrlBuilder(client);

    return (
        <Layout
            title={exhibition.Title}
            image={{
                url: builder.image(exhibition.Cover).auto("format").width(480).quality(60).url(),
                height: coverDimensions.height.toString(),
                width: coverDimensions.width.toString(),
            }}
        >
            <EventDetail event={exhibition} type={EventType.Exhibitions} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const slugs = await sanityFetch({query: QUERY_EXHIBITION_SLUGS, useCdn: false});
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
    const data = await sanityFetch({query: QUERY_EXHIBITION, params: {slug: context.params?.slug}, useCdn: false});
    return {
        props: {
            data: data.event,
        },
        revalidate: 172800, // two days
    };
}
