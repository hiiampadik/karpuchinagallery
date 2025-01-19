import React from "react";
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import EventDetail from '@/components/Events/EventDetail';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import client, {sanityFetch} from '@/sanity/client';
import {QUERY_FAIR, QUERY_FAIR_SLUGS} from '@/sanity/queries';
import Layout from "@/components/Layout";
import {getImageDimensions} from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';

export default function Fair({data}: any) {
    const router = useRouter();
    const fair = EventDetailClass.fromPayload(data, router.locale ?? 'cs')
    const coverDimensions = getImageDimensions(fair.Cover)
    const builder = imageUrlBuilder(client);

    return (
        <Layout
            title={fair.Title}
            image={{
                url: builder.image(fair.Cover).auto("format").width(480).url(),
                height: coverDimensions.height.toString(),
                width: coverDimensions.width.toString(),
            }}
        >
            <EventDetail event={fair} type={EventType.Fairs} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const slugs = await sanityFetch({query: QUERY_FAIR_SLUGS, useCdn: false});
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
    const fairsData = await sanityFetch({query: QUERY_FAIR, params: {slug: context.params?.slug}, useCdn: false});
    return {
        props: {
            data: fairsData.event,
        },
        revalidate: 86400
    };
}
