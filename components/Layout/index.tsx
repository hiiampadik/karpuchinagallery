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
    readonly image?: {
        url: string,
        width: string,
        height: string,
    }
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title,
        loading = undefined,
        image
    }) => {

    const pageTitle = title ? title + ' | Karpuchina Gallery' : 'Karpuchina Gallery'
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

    const baseURL = 'https://karpuchinagallery.vercel.app/'
    const currentUrl = baseURL + router.asPath;

    const jsonLd = {
        '@context': 'https://schema.org',
        "@graph":[
            {
                "@type":"Organization",
                "@id":"https://karpuchina.gallery#organization",
                "name":"Karpuchina Gallery",
                "url":"https://karpuchina.gallery",
                "sameAs":["https://www.facebook.com/whitepearlgallery/","https://www.instagram.com/whitepearlgallery/"]
            },
            {
                "@type":"WebSite",
                "@id":"https://www.karpuchina.gallery#website",
                "url":"https://www.karpuchina.gallery",
                "name":"Karpuchina Gallery",
                "publisher":{"@id":"https://karpuchina.gallery#organization"},
                'description': "We are a progressive gallery of contemporary art."
            },
            {
                '@type': 'WebPage',
                "@id": currentUrl + "#website",
                "url": currentUrl,
                'name': pageTitle,
                'description': "We are a progressive gallery of contemporary art."
            }
        ]
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>

                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords"
                      content="Karpuchina Gallery, contemporary art, art gallery Prague, modern art exhibitions, contemporary photography, art events Prague, Karpuchina exhibitions, art space Prague, současné umění, galerie Praha, moderní umění, výstavy Praha, současní umělci, umělecká scéna Praha, současná malba, moderní sochařství, současná fotografie, umělecké akce Praha, galerie současného umění"/>
                <meta name="description" content="We are a progressive gallery of contemporary art."/>
                <meta name="robots" content="index, follow"/>
                <meta charSet="utf-8"/>

                <meta property="og:site_name" content="Karpuchina Gallery"/>
                <meta property="og:locale" content={getLocale()}/>
                <meta property="og:title" content={title ?? "Karpuchina Gallery"}/>
                <meta property="og:description" content="We are a progressive gallery of contemporary art."/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={currentUrl}/>

                {image ?
                    <>
                        <meta property="og:image" content={image.url}/>
                        <meta property="og:image:type" content="image/jpg"/>
                        <meta property="og:image:width" content={image.width}/>
                        <meta property="og:image:height" content={image.height}/>

                        <meta name="twitter:image" content={image.url}/>
                        <meta name="twitter:image:type" content="image/jpg"/>
                        <meta name="twitter:image:width" content={image.width}/>
                        <meta name="twitter:image:height" content={image.height}/>
                    </>
                    :
                    <>
                        <meta property="og:image" content={baseURL + 'favicon/web-app-manifest-512x512.png'}/>
                        <meta property="og:image:type" content="image/png"/>
                        <meta property="og:image:width" content={'512'}/>
                        <meta property="og:image:height" content={'512'}/>

                        <meta name="twitter:image" content={baseURL + 'favicon/web-app-manifest-512x512.png'}/>
                        <meta name="twitter:image:type" content="image/png"/>
                        <meta name="twitter:image:width" content={'512'}/>
                        <meta name="twitter:image:height" content={'512'}/>
                    </>

                }

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={title ? title + " | Karpuchina Gallery" : "Karpuchina Gallery"}/>
                <meta name="twitter:description" content="We are a progressive gallery of contemporary art."/>

                <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96"/>
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg"/>
                <link rel="shortcut icon" href="/favicon/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
                <meta name="apple-mobile-web-app-title" content="Karpuchina Gallery"/>
            </Head>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />

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