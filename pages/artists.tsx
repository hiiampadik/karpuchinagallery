'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchArtists} from '@/api/useSanityData';
import {useRouter} from 'next/router';
import styles from '../styles/artists.module.scss'
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import React from 'react';

export default function Artists() {
    const router = useRouter();
    const {data: artists} = useFetchArtists(router.locale ?? 'cs')

    return (
        <Layout>
            <div className={styles.artistsContainer}>
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
                        <Link href="/artist/[slug]"
                              as={`/artist/${artist.Slug}`}
                              key={artist.Slug}
                              className={styles.artistContainer}>
                            <div className={styles.cover}>
                                <Figure
                                    image={artist.Cover}
                                    alt={artist.Name.concat(" – Artist Cover Image")}
                                />
                            </div>
                            <h2>{firstNames}<br/>{lastName}</h2>
                        </Link>
                )}))}
            </div>
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