'use client'
import {useTranslations} from 'next-intl';
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchHomepage} from '@/api/useSanityData';
import styles from '@/styles/homepage.module.scss';
import Link from 'next/link';
import React from 'react';
import {useRouter} from 'next/router';
import FormatArtists from '@/components/utils/FormatArtists';

export default function Home() {
    const router = useRouter();
    const {data: homepage} = useFetchHomepage(router.locale ?? 'cs')
    const t = useTranslations('Homepage');

    const LocalizedDate = (dateString: string) => {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat(router.locale ?? 'cs', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        return formatter.format(date);
    };

    return (
        <Layout>
            {homepage &&
                <div className={styles.homepageContainer}>
                    <Link href="/exhibition/[slug]"
                          as={`/exhibition/${homepage.Upcoming.Slug}`}
                          key={homepage.Upcoming.Slug}
                          className={styles.onDisplayContainer}
                    >
                        <h1 className={styles.onDisplayTitle} style={{color: homepage.OnDisplay.Color ?? '#000000'}}>
                            {t('onDisplay')}
                            {' '}<span className={styles.title}>{homepage.OnDisplay.Title}</span>
                            {homepage.OnDisplay.Artists !== undefined && homepage.OnDisplay.Artists.length > 0 &&
                                <>
                                    {' '}<FormatArtists artists={homepage.OnDisplay.Artists} />
                                </>
                            }
                            {' '}
                            <span className={styles.date}>
                                {LocalizedDate(homepage.OnDisplay.StartDate)}
                                {!homepage.OnDisplay.EndDate ? '' : ' — ' + LocalizedDate(homepage.OnDisplay.EndDate)}
                            </span>
                        </h1>
                        <div className={styles.onDisplayCover}>
                        </div>
                    </Link>
                    <div className={styles.upcomingContainer}>
                        <Link href="/exhibition/[slug]"
                              as={`/exhibition/${homepage.Upcoming.Slug}`}
                              key={homepage.Upcoming.Slug}
                        >
                            <h1>
                                <span className={styles.note}>{t('upcoming')}</span>
                                {' '}<span className={styles.title}>{homepage.Upcoming.Title}</span>
                                {homepage.Upcoming.Artists !== undefined && homepage.Upcoming.Artists.length > 0 &&
                                    <>
                                        {' '}<FormatArtists artists={homepage.Upcoming.Artists} />
                                    </>
                                }
                                {' '}
                                <span className={styles.note}>
                                    {homepage.Upcoming.EndDate && <>{t('from')}{' '}</>}
                                    {LocalizedDate(homepage.Upcoming.StartDate)}
                                </span>
                            </h1>
                        </Link>
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