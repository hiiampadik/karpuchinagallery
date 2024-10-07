'use client'
import {useTranslations} from 'next-intl';
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchHomepage} from '@/api/useSanityData';
import styles from '@/styles/homepage.module.scss';
import Link from 'next/link';
import React from 'react';
import {useRouter} from 'next/router';
import {Artist} from '@/api/classes';

export default function Home() {
    const router = useRouter();
    const {data: homepage} = useFetchHomepage(router.locale ?? 'cs')
    const t = useTranslations('Homepage');

    const formatArtists = (artists: {name: string}[]) => {
        const names = artists.map((artist) => artist.name);
        if (names.length === 1) {
            return names[0];
        }
        if (names.length === 2) {
            return names.join(' and ');
        }
        return names.slice(0, -1).join(', ') + ', and ' + names[names.length - 1];
    };

    // todo start dates enddates

    return (
        <Layout>
            {homepage &&
                <div className={styles.homepageContainer}>
                    <h1 className={styles.exhibitionTitle} style={{color: homepage.OnDisplay.Color}}>
                        {t('onDisplay')}
                        {' '}<span className={styles.title}>{homepage.OnDisplay.Title}</span>
                        {homepage.OnDisplay.Artists.length > 0 &&
                            <>
                                {' '}{t('by')}
                                {' '}{formatArtists(homepage.OnDisplay.Artists)}
                            </>
                        }
                        {' '}<span className={styles.date}>21.07.2024 — 21.07.2024</span>
                    </h1>
                    <div className={styles.exhibitionCover}>
                    </div>
                    <div className={styles.upcomingWrapping}>
                        <h1 className={styles.upcomingContainer}>
                            <span className={styles.note}>{t('upcoming')}</span>
                            {' '}<span className={styles.title}>{homepage.Upcoming.Title}</span>
                            {homepage.Upcoming.Artists.length > 0 &&
                                <>
                                {' '}{t('by')}
                                {' '}{formatArtists(homepage.Upcoming.Artists)}
                                </>
                            }
                            {' '}<span className={styles.note}>{t('from')}{' '}20.11.2024</span>
                        </h1>
                    </div>
                    <div className={styles.olderExhibitions}>
                        <Link href={"/exhibitions"}>
                            {t('olderExhibition')}
                        </Link>
                    </div>
                </div>
            }
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