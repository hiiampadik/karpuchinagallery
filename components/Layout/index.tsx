'use client'
import React, {FunctionComponent, PropsWithChildren} from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import Footer from '@/components/Layout/Footer';
import styles from './index.module.scss'
import Fish from '@/components/Fish';
import {classNames} from '@/components/utils/classNames';
import {useRouter} from 'next/router';

interface LayoutProps {
    readonly title?: string
    readonly loading?: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title,
        loading = undefined
    }) => {

    const router = useRouter();  // Get current locale from router
    const getLocale = () => {
        switch (router.locale) {
            case 'en':
                return 'en_US';  // English locale
            case 'cs':
                return 'cs_CZ';  // Czech locale
            default:
                return 'en_US';  // Default to English
        }
    };

    const currentUrl = `https://karpuchina.gallery${router.asPath}`;

    //
    // canonical
    // alternate
    // icon
    // apple-touch-icon
    // manifest

    return (
        <>
            <Head>
                <title>{title ? title + ' | Karpuchina Gallery' : 'Karpuchina Gallery'}</title>

                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords" content="Karpuchina Gallery, contemporary art, art gallery Prague, modern art exhibitions, contemporary photography, art events Prague, Karpuchina exhibitions, art space Prague, současné umění, galerie Praha, moderní umění, výstavy Praha, současní umělci, umělecká scéna Praha, současná malba, moderní sochařství, současná fotografie, umělecké akce Praha, galerie současného umění"/>
                <meta name="description" content="We are a progressive gallery of contemporary art."/>
                <meta name="robots" content="index, follow"/>
                <meta charSet="utf-8"/>

                <meta property="og:site_name" content="Karpuchina Gallery"/>
                <meta property="og:locale" content={getLocale()}/>
                <meta property="og:title" content={title ?? "Karpuchina Gallery"}/>
                <meta property="og:description" content="We are a progressive gallery of contemporary art."/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={currentUrl}/>

                <meta property="og:image" content={''}/>
                <meta property="og:image:type" content="image/jpg"/>
                <meta property="og:image:width" content="1440"/>
                <meta property="og:image:height" content="960"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={title ?? "Karpuchina Gallery"}/>
                <meta name="twitter:description" content="We are a progressive gallery of contemporary art."/>

                <meta name="twitter:image" content={''}/>
                <meta name="twitter:image:type" content="image/jpg"/>
                <meta name="twitter:image:width" content="1440"/>
                <meta name="twitter:image:height" content="960"/>
            </Head>

            <main>
                <Navigation/>
                <div className={classNames([styles.content, loading ? styles.loading : styles.loaded])}>
                    {children}
                </div>
                <Footer/>
            </main>

            <div className={styles.fishContainer}>
                <Fish/>
            </div>

        </>
    );
};

export default Layout