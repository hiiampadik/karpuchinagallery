import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import {useFetchEvents} from '@/api';
import React from 'react';
import EventList from '@/components/Events/EventList';
import {EventType} from '@/api/classes';
import {QUERY_ALL_FAIRS} from '@/sanity/queries';

export default function Fairs() {
    const router = useRouter();
    const {data: fairs} = useFetchEvents(router.locale ?? 'cs', QUERY_ALL_FAIRS)

    return (
        <EventList events={fairs ?? []} type={EventType.Fairs}/>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return {
        props: {
            // You can get the messages from anywhere you like. The recommended
            // pattern is to put them in JSON files separated by locale and read
            // the desired one based on the `locale` received from Next.js.
            messages: (await import(`../public/locales/${context.locale}.json`)).default
        }
    };
}