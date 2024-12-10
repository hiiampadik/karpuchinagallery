'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchAbout} from '@/api/useSanityData';
import {useTranslations} from 'next-intl';
import styles from '../styles/about.module.scss'
import {useRouter} from 'next/router';
import BlockContent from '@/components/Sanity/BlockContent';
import React from 'react';
import GallerySwiper from '@/components/Sanity/GallerySwiper';
import Figure from '@/components/Sanity/Figure';

export default function About() {
    const router = useRouter();
    const {data: about} = useFetchAbout(router.locale ?? 'cs')
    const t = useTranslations('About');

    return (
        <Layout loading={about === null} title={'About'}>
            {about &&
                <article className={styles.aboutContainer}>
                    <section className={styles.aboutInfoContainer}>
                        <div>
                            <BlockContent blocks={about.LeftColumn}/>
                        </div>
                        <div>
                            <BlockContent blocks={about.RightColumn}/>
                        </div>
                    </section>

                    {about.Gallery &&
                        <section className={styles.aboutGallery}>
                            <GallerySwiper images={about.Gallery}></GallerySwiper>
                        </section>
                    }

                    <section className={styles.aboutBio}>
                        <BlockContent blocks={about.Bio}/>
                    </section>


                    {about.Logos &&
                        <section className={styles.aboutLogos}>
                            {about.Logos.map((logo) => (
                                <figure key={logo.Id}>
                                    <Figure image={logo.Image} alt={logo.Alt} />
                                </figure>
                            ))}
                        </section>
                    }
                </article>
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