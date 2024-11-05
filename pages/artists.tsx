'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchArtists} from '@/api';
import {useRouter} from 'next/router';
import styles from '../styles/artists.module.scss'
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import figureStyles from '@/components/Sanity/Figure.module.scss';
import React, {FunctionComponent, useState} from 'react';
import {Artist} from '@/api/classes';
import {classNames} from '@/components/utils/classNames';

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
                        <ArtistItem artist={artist}
                                    lastName={lastName}
                                    firstNames={firstNames}
                                    key={artist.Slug} />
                    )
                }))}
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



interface ArtistItemProps {
    readonly artist: Artist
    readonly firstNames?: string
    readonly lastName?: string
}

export const ArtistItem: FunctionComponent<ArtistItemProps> = ({artist, firstNames, lastName}) => {
    // todo loading animation
    const [loaded, setLoaded] = useState(false)
    return (
        <Link href="/artist/[slug]"
              as={`/artist/${artist.Slug}`}
              className={classNames([loaded ? figureStyles.loaded : figureStyles.loading, styles.artistContainer])}>
            <div className={styles.cover}>
                <Figure
                    image={artist.Cover}
                    alt={artist.Name.concat(" – Artist Cover Image")}
                    onLoad={() => setLoaded(true)}
                />
            </div>
            <h2>{firstNames}<br/>{lastName}</h2>
        </Link>
    )
}
