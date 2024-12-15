import React, {FunctionComponent, useEffect} from "react";
import {AppProps} from 'next/app';
import '../styles/globals.scss';
import {IntlErrorCode, NextIntlClientProvider} from 'next-intl';
import {OverlaysProvider} from '@blueprintjs/core';
import {Analytics} from '@vercel/analytics/next';
import Script from 'next/script';
import * as gtag from "../lib/gtag";


const MyApp: FunctionComponent<AppProps> = ({ Component, router, pageProps }) => {

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    const googleAnalyticsId = 'G-PZ09J30FR7'

    return (
        <>
            <Script
                id="ga"
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <Script strategy="lazyOnload" id="ga2">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                    page_path: window.location.pathname,
              });
          `}
            </Script>

            <NextIntlClientProvider
                locale={router.locale}
                timeZone="Europe/Vienna"
                messages={pageProps.messages}
                onError={(error) => {
                    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
                        console.warn('Missing translation:', error.name);
                    }
                }}
            >
                <OverlaysProvider>
                    <Analytics />
                    <Component key={router.route} {...pageProps} />
                </OverlaysProvider>
            </NextIntlClientProvider>
        </>
        )


};


export default MyApp