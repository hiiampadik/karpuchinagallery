import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchEventDetail} from '@/api';
import EventDetail from '@/components/Events/EventDetail';
import {EventType} from '@/api/classes';

export default function Exhibition() {
    const params = useParams()
    const router = useRouter();
    const {data: exhibition} = useFetchEventDetail(params?.slug as string, router.locale ?? 'cs', EventType.Exhibitions)

    return (
        <EventDetail event={exhibition} type={EventType.Exhibitions} />
    )
}

Exhibition.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

