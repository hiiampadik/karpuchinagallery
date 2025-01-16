import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import React from 'react';
import EventList from '@/components/Events/EventList';
import {Event, EventType} from '@/api/classes';
import {QUERY_ALL_EXHIBITIONS} from '@/sanity/queries';
import client from '@/sanity/client';

export default function Exhibitions({data}: any) {
    const router = useRouter();
    const exhibitions: Event[] = data.map((value: any) => Event.fromPayload(value, router.locale ?? 'cs'))

    return (
       <EventList events={exhibitions ?? []} type={EventType.Exhibitions} />
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await client.fetch(QUERY_ALL_EXHIBITIONS)

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default
        },
        revalidate: 600
    };
}