'use client'
import React, {FunctionComponent, PropsWithChildren} from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import {usePathname} from 'next/navigation';
import Footer from '@/components/Layout/Footer';
import styles from './index.module.scss'

interface LayoutProps {
    readonly title?: string
    readonly loading?: boolean;
    // todo loading
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title = 'Karpuchina Gallery',
        loading = false
    }) => {
    const pathname = usePathname()
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                  name="keywords"
                  content=""
                />
                <meta
                  name="description"
                  content=""
                />
            </Head>
                <main>
                    <Navigation />
                    <div className={styles.content}>
                        {children}
                    </div>
                    <Footer />
                </main>
        </>
    );
};

export default Layout