import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchEventDetail} from '@/api/useSanityData';
import EventDetail from '@/components/Events/EventDetail';

export default function Fair() {
    const params = useParams()
    const router = useRouter();
    const {data: fair} = useFetchEventDetail(params?.slug as string, router.locale ?? 'cs', 'fairs')

    return (
        <EventDetail event={fair} type={'fairs'} />
    )
}

Fair.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

