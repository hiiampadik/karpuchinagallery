import Layout from '../components/Layout';
import styles from '../styles/artists.module.scss'
import React from 'react';
import {ArtistItem} from '@/components/Artists/ArtistItem';
import {useFetchArtists} from '@/api/artist';


export default function Artists() {
    const {data: artists} = useFetchArtists()

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