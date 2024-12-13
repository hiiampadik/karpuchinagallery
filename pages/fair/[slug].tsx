import React from "react";
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import EventDetail from '@/components/Events/EventDetail';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import client from '@/client';
import Layout from '@/components/Layout';

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
    const paths = await client.fetch(
        `*[_type == "fairs" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: false,
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const fairsData = await client.fetch(
        `{"event": *[_type == "fairs" && slug.current == $slug] | order(_updatedAt desc) [0] {
                        ...,
                        artworks[]->{
                            _id,
                            title,
                            year,
                            artist->{
                                _id,
                                name,
                                slug
                            },
                            showInSelection,
                            cover,
                            gallery
                        },
                        documents[]{
                            ...,
                            documentCover{
                                ...,
                            },
                            file{
                                ...,
                                asset->{
                                    ...
                                }
                            }
                        }
                        }}`,
        { slug: context.params?.slug}
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
