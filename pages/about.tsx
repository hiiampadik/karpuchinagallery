import Layout from '../components/Layout';
import styles from '../styles/about.module.scss'
import {useRouter} from 'next/router';
import BlockContent from '@/components/Sanity/BlockContent';
import React from 'react';
import GallerySwiper from '@/components/Sanity/GallerySwiper';
import Figure from '@/components/Sanity/Figure';
import {cs} from '@/components/locales/cs';
import {en} from '@/components/locales/en';
import {About as AboutClass} from '@/api/classes'
import {sanityFetch} from '@/sanity/client';
import {QUERY_ABOUT} from '@/sanity/queries';

export default function About({data}: any) {
    const router = useRouter();
    const t = router.locale === "cs" ? cs.About : en.About;
    const about = AboutClass.fromPayload(data, router.locale ?? 'cs');

    return (
        <Layout loading={about === null} title={'About'}>
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
                        <p>
                            {t['support']}
                        </p>
                        <div className={styles.aboutLogosInner}>
                        {about.Logos.map((logo) => (
                            <figure key={logo.Id}>
                                <Figure image={logo.Image} alt={logo.Alt} />
                            </figure>
                        ))}
                        </div>
                    </section>
                }
            </article>
        </Layout>
    );
}

export async function getStaticProps() {
    const data = await sanityFetch({query: QUERY_ABOUT, useCdn: false});

    return {
        props: {
            data,
        },
        revalidate: 172800, // two days
    };
}
