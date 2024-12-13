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
    return <Exhibition data={data} />
}

function Exhibition({data}: any) {
    const router = useRouter();
    const exhibition = EventDetailClass.fromPayload(data, router.locale ?? 'cs')

    return (
        <EventDetail event={exhibition} type={EventType.Exhibitions} />
    )
}

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type == "exhibitions" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: false,
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data= await client.fetch(
        `{"event": *[_type == "exhibitions" && slug.current == $slug] | order(_updatedAt desc) [0] {
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

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: data.event,
            messages: (await import(`../../public/locales/${context.locale}.json`)).default,
        },
    };
}
