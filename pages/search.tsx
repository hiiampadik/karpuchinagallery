'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/router';
import React from 'react';
import {useSearchParams} from 'next/navigation';
import {useFetchArtists, useFetchEvents} from '@/api';
import {ArtistItem} from '@/pages/artists';
import EventItem from '@/components/Events/EventItem';

export default function Search() {
    const router = useRouter();

    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('query')

    const t = useTranslations('Search');

    const {data: artists} = useFetchArtists(router.locale ?? 'cs', searchQuery)
    const {data: exhibitions} = useFetchEvents(router.locale ?? 'cs','exhibitions', searchQuery)

    return (
        <Layout>
            <h1>{t('results')}</h1>

            {artists?.map((artist =>  {
                const words = artist.Name.trim().split(" ");
                let lastName, firstNames;
                if (words.length === 1){
                    firstNames = words.pop();
                    lastName = '';
                } else {
                    lastName = words.pop();
                    firstNames = words.join(" ");
                }

                return (
                    <ArtistItem artist={artist}
                                lastName={lastName}
                                firstNames={firstNames}
                                key={artist.Slug} />
                )
            }))}

            {exhibitions?.map((event => (
                    <EventItem event={event} key={event.Id} useH2={true} type={'exhibitions'} />
                )
            ))}
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return {
        props: {
            // You can get the messages from anywhere you like. The recommended
            // pattern is to put them in JSON files separated by locale and read
            // the desired one based on the `locale` received from Next.js.
            messages: (await import(`../public/locales/${context.locale}.json`)).default
        }
    };
}