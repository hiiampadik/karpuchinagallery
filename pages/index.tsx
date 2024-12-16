import {useTranslations} from 'next-intl';
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import styles from '@/styles/homepage.module.scss';
import Link from 'next/link';
import React from 'react';
import {useRouter} from 'next/router';
import FormatArtists from '@/components/utils/FormatArtists';
import LocalizedDate from '@/components/utils/LocalizeDate';
import Figure from '@/components/Sanity/Figure';
import {replaceSpaces} from '@/components/utils/replaceSpaces';
import EventTitle, {TimeContext} from '@/components/Events/EventTitle';
import {EventType, Homepage} from '@/api/classes';
import client from '@/sanity/client';
import {QUERY_HOMEPAGE} from '@/sanity/queries';


interface HomepageProps {
    readonly data: any
}
export default function Home({data}: HomepageProps) {
    const router = useRouter();
    const homepage = Homepage.fromPayload(data, router.locale ?? 'cs')

    const t = useTranslations('Homepage');

    return (
        <Layout>
            {homepage &&
                <section className={styles.homepageContainer}>
                    <Link href="/exhibition/[slug]"
                          as={`/exhibition/${homepage.OnDisplay.Slug}`}
                          key={homepage.OnDisplay.Slug}
                          className={styles.onDisplayContainer}
                    >
                        <EventTitle event={homepage.OnDisplay} timeContext={TimeContext.OnDisplay} fromHomepage={true}/>

                        <div className={styles.onDisplayImageContainer}>
                            <Figure
                                className={styles.onDisplayCover}
                                image={homepage.OnDisplay.Cover}
                                alt={homepage.OnDisplay.Title.concat(" – Exhibition Cover Image")}
                                fullWidth={true}
                            />
                        </div>
                    </Link>
                    <div className={styles.upcomingContainer}>
                        {homepage.Upcoming &&
                            <Link href="/exhibition/[slug]"
                                  as={`/exhibition/${homepage.Upcoming.Slug}`}
                                  key={homepage.Upcoming.Slug}
                            >
                                <h1>
                                    <span className={styles.opacity}>{t('upcoming')}:</span>
                                    {' '}<span className={styles.title}>{homepage.Upcoming.Title}</span>
                                    {homepage.Upcoming.Artists && homepage.Upcoming.Artists.length > 0 &&
                                        <>
                                            {homepage.Upcoming.Type !== EventType.Fairs ? ' ' : <br />}<FormatArtists artists={homepage.Upcoming.Artists} showBy={homepage.Upcoming.Type !== EventType.Fairs}/>
                                        </>
                                    }
                                    {' '}
                                    <span className={styles.note}>
                                        {homepage.Upcoming.ToDate && <>{t('from')}{replaceSpaces(' ')}</>}
                                        {replaceSpaces(LocalizedDate(homepage.Upcoming.FromDate, router.locale ?? 'cs'))}

                                    </span>
                                </h1>
                            </Link>
                        }
                    </div>
                    <div className={styles.olderExhibitions}>
                        <Link href={"/exhibitions"}>
                            {t('olderExhibition')}
                        </Link>
                    </div>
                </section>
            }
        </Layout>
);
}


export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await client.fetch(QUERY_HOMEPAGE);

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
            revalidate: 60,
        },
    };
}
