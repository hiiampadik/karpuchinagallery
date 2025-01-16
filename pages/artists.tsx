import Layout from '../components/Layout';
import styles from '../styles/artists.module.scss'
import React from 'react';
import {ArtistItem} from '@/components/Artists/ArtistItem';
import client from '@/sanity/client';
import {QUERY_ALL_ARTISTS} from '@/sanity/queries';
import {Artist} from '@/api/classes';

export const revalidate = 3600

export default function Artists({data}: any) {
    const artists: Artist[] = data.map((value: any) => Artist.fromPayload(value))

    return (
        <Layout title={'Artists'}>
            <section className={styles.artistsContainer}>
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
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const data = await client.fetch(QUERY_ALL_ARTISTS)

    return {
        props: {
            data,
        },
        revalidate: 3600
    };
}

