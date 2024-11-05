import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchEventDetail} from '@/api';
import EventDetail from '@/components/Events/EventDetail';

export default function Exhibition() {
    const params = useParams()
    const router = useRouter();
    const {data: exhibition} = useFetchEventDetail(params?.slug as string, router.locale ?? 'cs', 'exhibitions')

    return (
        <EventDetail event={exhibition} type={'exhibitions'} />
    )
}

Exhibition.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

