'use client'
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import {useFetchEvents} from '@/api/useSanityData';
import React from 'react';
import Events from '@/components/EventsComponents/Events';

export default function Fairs() {
    const router = useRouter();
    const {data: fairs} = useFetchEvents(router.locale ?? 'cs', 'fairs')

    return (
        <Events events={fairs ?? []} type={'fairs'}/>
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