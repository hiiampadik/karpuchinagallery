'use client'
import {useTranslations} from 'next-intl';
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchHomepage} from '@/api/useSanityData';
import styles from '@/styles/homepage.module.scss';
import BlockContent from '@/components/Sanity/BlockContent';
import Link from 'next/link';
import React from 'react';

export default function Home() {
    const {data: homepage} = useFetchHomepage()
    const t = useTranslations('Homepage');

    return (
        <Layout>
            {homepage &&
                <div className={styles.homepageContainer}>
                    <h1 className={styles.exhibitionTitle}>
                        {t('onDisplay')}{' '}
                        <span className={styles.title}>Always Over Titled Dreamers Safari</span>
                        {' '}{t('by')}{' '}
                        Julius Reichel and Roel van der Linden And Peter Sagan Jr.
                        {' '}<span className={styles.date}>21.07.2024 — 21.07.2024</span>
                    </h1>
                    <div className={styles.exhibitionCover}>
                    </div>
                    <div className={styles.upcomingWrapping}>
                        <h1 className={styles.upcomingContainer}>
                            <span className={styles.note}>{t('upcoming')}</span>
                            <span className={styles.title}>{' '}Always Over Titled Dreamers Safari</span>
                            {' '}by Julius Reichel an d Roel van der Linden
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