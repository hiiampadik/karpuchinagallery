import React from "react";
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import EventDetail from '@/components/Events/EventDetail';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import {clientWithoutCDN} from '@/sanity/client';
import Layout from '@/components/Layout';
import {QUERY_FAIR, QUERY_FAIR_SLUGS} from '@/sanity/queries';

export default function Wrapper({data}: any) {
    if (!data){
        return <Layout loading={true}></Layout>
    }
    return <Fair data={data} />
}

function Fair({data}: any) {
    const router = useRouter();
    const fair = EventDetailClass.fromPayload(data, router.locale ?? 'cs')

    return (
        <EventDetail event={fair} type={EventType.Fairs} />
    )
}

export async function getStaticPaths() {
    const slugs = await clientWithoutCDN.fetch(QUERY_FAIR_SLUGS);
    const locales = ['cs', 'en'];
    const paths = slugs.flatMap((slug: string) =>
        locales.map((locale) => ({
            params: { slug },
            locale,
        }))
    );
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const fairsData = await clientWithoutCDN.fetch(QUERY_FAIR, { slug: context.params?.slug}
    )

    if (!fairsData) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: fairsData.event,
            messages: (await import(`../../public/locales/${context.locale}.json`)).default,
        },
    };
}
