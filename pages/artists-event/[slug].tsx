import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchEventDetail} from '@/api';
import EventDetail from '@/components/Events/EventDetail';
import {EventType} from '@/api/classes';

export default function ArtistsEvent() {
    const params = useParams()
    const router = useRouter();
    const {data: artistsEvent} = useFetchEventDetail(params?.slug as string, router.locale ?? 'cs', EventType.ArtistsEvents)

    return (
        <EventDetail event={artistsEvent} type={EventType.ArtistsEvents} />
    )
}

ArtistsEvent.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

