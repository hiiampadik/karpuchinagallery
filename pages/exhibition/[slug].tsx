import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchEventDetail} from '@/api';
import EventDetail from '@/components/Events/EventDetail';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import client from '@/client';

interface ExhibitionProps {
    readonly event: any
}

export default function Exhibition({event}: ExhibitionProps) {
    const router = useRouter();
    const exhibition = EventDetailClass.fromPayload(event, router.locale ?? 'cs')

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
        fallback: true,
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const {event} = await client.fetch(
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

    return {
        props: {
            event,
            messages: (await import(`../../public/locales/${context.locale}.json`)).default,
        },
    };
}
