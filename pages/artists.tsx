'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchArtists} from '@/api/useSanityData';
import {useRouter} from 'next/router';
import styles from '../styles/artists.module.scss'
import Link from 'next/link';

export default function Artists() {
    const router = useRouter();
    const {data: artists} = useFetchArtists(router.locale ?? 'cs')

    return (
        <Layout>
            <div className={styles.artistsContainer}>
                {artists?.map((artist =>  {
                    const words = artist.Name.trim().split(" ");
                    const lastName = words.pop(); // Get the last word
                    const firstNames = words.join(" "); // Join the rest of the words
                    return (
                        <Link href="/artist/[slug]"
                              as={`/artist/${artist.Slug}`}
                              key={artist.Slug}
                              className={styles.artistContainer}>
                            <div className={styles.cover}>

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