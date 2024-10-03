'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useFetchAbout} from '@/components/utils/useSanityData';
import {useTranslations} from 'next-intl';
import styles from '../styles/about.module.scss'

export default function About() {
    const {data: about} = useFetchAbout()
    const t = useTranslations('About');

    // todo class about

    return (
        <Layout>
            <div className={styles.aboutInfo}>

            </div>

            oteviracka

            Gallery todo

            bio

            loga




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