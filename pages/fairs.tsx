import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import React from 'react';
import EventList from '@/components/Events/EventList';
import {Event, EventType} from '@/api/classes';
import {QUERY_ALL_FAIRS} from '@/sanity/queries';
import client from '@/sanity/client';

export default function Fairs({data}: any) {
    const router = useRouter();
    const fairs: Event[] = data.map((value: any) => Event.fromPayload(value, router.locale ?? 'cs'))

    return (
        <EventList events={fairs ?? []} type={EventType.Fairs}/>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await client.fetch(QUERY_ALL_FAIRS)

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default
        },
        revalidate: 600
    };
}