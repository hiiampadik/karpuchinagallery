'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchAbout} from '@/api/useSanityData';
import {useTranslations} from 'next-intl';
import styles from '../styles/about.module.scss'
import {useRouter} from 'next/router';
import BlockContent from '@/components/Sanity/BlockContent';

export default function About() {
    const router = useRouter();
    const {data: about} = useFetchAbout(router.locale ?? 'cs')
    const t = useTranslations('About');

    return (
        <Layout>
            {about &&
                <>
                    <div className={styles.aboutInfoContainer}>
                        <div>
                            <h1>{t('contact')}</h1>
                            <BlockContent blocks={about.Contact} />
                        </div>
                        <div>
                            <h1>{t('address')}</h1>
                            <BlockContent blocks={about.Address}/>
                        </div>
                        <div>
                            <h1>{t('open')}</h1>
                            <BlockContent blocks={about.Open}/>
                        </div>
                        <div>
                            <h1>{t('connect')}</h1>
                            <BlockContent blocks={about.Connect}/>
                        </div>
                    </div>
                    <div className={styles.aboutGallery}>Gallery todo</div>
                    <div className={styles.aboutBio}>
                        <BlockContent blocks={about.Bio}/>
                    </div>
                    <div className={styles.aboutLogos}>
                        <BlockContent blocks={about.logos}/>
                    </div>
                </>
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