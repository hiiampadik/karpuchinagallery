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
import LocalizedDate from '@/components/utils/LocalizeDate';
import ExhibitionTitle from '@/components/utils/ExhibitionTitle';
import Figure from '@/components/Sanity/Figure';

export default function Home() {
    const router = useRouter();
    const {data: homepage} = useFetchHomepage(router.locale ?? 'cs')
    const t = useTranslations('Homepage');

    // todo svetle onDisplay, carky a and
    // todo podtrhnute na mobinu

    return (
        <Layout>
            {homepage &&
                <div className={styles.homepageContainer}>
                    <Link href="/exhibition/[slug]"
                          as={`/exhibition/${homepage.Upcoming.Slug}`}
                          key={homepage.Upcoming.Slug}
                          className={styles.onDisplayContainer}
                    >
                        <ExhibitionTitle exhibition={homepage.Upcoming} onDisplay={true} fromHomepage={true}/>
                        <div className={styles.onDisplayCover}>
                            <Figure
                                image={homepage.Upcoming.Cover}
                                alt={homepage.Upcoming.Title.concat(" – Exhibition Cover Image")}
                            />
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
                                {homepage.Upcoming.Artists && homepage.Upcoming.Artists.length > 0 &&
                                    <>
                                        {' '}<FormatArtists artists={homepage.Upcoming.Artists} />
                                    </>
                                }
                                {' '}
                                <span className={styles.note}>
                                    {homepage.Upcoming.EndDate && <>{t('from')}{' '}</>}
                                    {LocalizedDate(homepage.Upcoming.StartDate, router.locale ?? 'cs')}
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