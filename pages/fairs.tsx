import {useRouter} from 'next/router';
import React from 'react';
import EventList from '@/components/Events/EventList';
import {EventType} from '@/api/classes';
import {QUERY_ALL_FAIRS} from '@/sanity/queries';
import {useFetchEvents} from '@/api/event';
import Layout from '@/components/Layout';
import {GetStaticPropsContext} from 'next';

export default function Fairs() {
    const router = useRouter();
    const {data} = useFetchEvents( router.locale ?? 'cs', QUERY_ALL_FAIRS)

    return (
        <Layout title={'Fairs'}>
            {data &&
                <EventList events={data} type={EventType.Fairs} />
            }
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        }};
}
