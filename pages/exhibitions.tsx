'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import {useFetchArtists, useFetchExhibitions} from '@/api/useSanityData';
import styles from '@/styles/artists.module.scss';
import Link from 'next/link';

export default function Exhibitions() {
    const router = useRouter();
    const {data: exhibitions} = useFetchExhibitions(router.locale ?? 'cs')

    return (
        <Layout>
            <div className={styles.artistsContainer}>
                {exhibitions?.map((exhibition =>  {
                    return (
                        <Link href="/exhibition/[slug]"
                              as={`/exhibition/${exhibition.Slug}`}
                              key={exhibition.Slug}
                              className={styles.artistContainer}>
                            <div className={styles.cover}>

                            </div>
                            <h2>{exhibition.Title}</h2>


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