import React, {FunctionComponent} from "react";
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
            <NextIntlClientProvider
                locale={router.locale}
                timeZone="Europe/Vienna"
                messages={pageProps.messages}
            >
                <Component key={router.route} {...pageProps} />
            </NextIntlClientProvider>
        )


};


export default MyApp