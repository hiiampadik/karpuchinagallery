import {useRouter} from 'next/router';
import React from 'react';
import EventList from '@/components/Events/EventList';
import {EventType} from '@/api/classes';
import {QUERY_ALL_EXHIBITIONS} from '@/sanity/queries';
import {useFetchEvents} from '@/api/event';
import Layout from '@/components/Layout';

export default function Exhibitions() {
    const router = useRouter();
    const {data} = useFetchEvents( router.locale ?? 'cs', QUERY_ALL_EXHIBITIONS)

    return (
        <Layout title={'Exhibitions'}>
            {data &&
                <EventList events={data} type={EventType.Exhibitions} />
            }
        </Layout>
    );
}