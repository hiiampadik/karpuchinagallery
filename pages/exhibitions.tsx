'use client'
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import {useFetchEvents} from '@/api/useSanityData';
import React from 'react';
import EventList from '@/components/Events/EventList';

export default function Exhibitions() {
    const router = useRouter();
    const {data: exhibitions} = useFetchEvents(router.locale ?? 'cs', 'exhibitions')

    return (
       <EventList events={exhibitions ?? []} type={'exhibitions'} />
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