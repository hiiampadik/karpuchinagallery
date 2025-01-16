import React from "react";
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import EventDetail from '@/components/Events/EventDetail';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import client from '@/sanity/client';
import {QUERY_ARTISTS_EVENTS, QUERY_ARTISTS_EVENTS_SLUGS} from '@/sanity/queries';

export const dynamic = 'auto';

export default function ArtistsEvent({data}: any) {
    const router = useRouter();
    const artistsEvent = EventDetailClass.fromPayload(data, router.locale ?? 'cs')

    return (
        <EventDetail event={artistsEvent} type={EventType.ArtistsEvents} />
    )
}

export async function getStaticPaths() {
    const slugs = await client.fetch(QUERY_ARTISTS_EVENTS_SLUGS);
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
    const data = await client.fetch(QUERY_ARTISTS_EVENTS, { slug: context.params?.slug})

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: data.event,
            messages: (await import(`../../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 600
    };
}
