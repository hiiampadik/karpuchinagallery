import React, {FunctionComponent} from "react";
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';
import {OverlaysProvider} from '@blueprintjs/core';
import { Analytics } from '@vercel/analytics/next';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
            <NextIntlClientProvider
                locale={router.locale}
                timeZone="Europe/Vienna"
                messages={pageProps.messages}
            >
                <OverlaysProvider>
                    <Analytics />
                    <Component key={router.route} {...pageProps} />
                </OverlaysProvider>
            </NextIntlClientProvider>
        )


};


export default MyApp