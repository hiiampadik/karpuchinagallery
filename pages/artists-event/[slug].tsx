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
    return <ArtistsEvent data={data} />
}

function ArtistsEvent({data}: any) {
    const router = useRouter();
    const artistsEvent = EventDetailClass.fromPayload(data, router.locale ?? 'cs')

    return (
        <EventDetail event={artistsEvent} type={EventType.ArtistsEvents} />
    )
}

export async function getStaticPaths() {
    const slugs = await client.fetch(
        `*[_type == "artistsEvents" && defined(slug.current)][].slug.current`
    );
    const locales = ['cs', 'en'];
    const paths = slugs.flatMap((slug: string) =>
        locales.map((locale) => ({
            params: { slug },
            locale,
        }))
    );
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await client.fetch(
        `{"event": *[_type == "artistsEvents" && slug.current == $slug] | order(_updatedAt desc) [0] {
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
