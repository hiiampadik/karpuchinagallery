'use client'
import React, {FunctionComponent, PropsWithChildren} from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import Footer from '@/components/Layout/Footer';
import styles from './index.module.scss'
import Fish from '@/components/Fish';
import {classNames} from '@/components/utils/classNames';

interface LayoutProps {
    readonly title?: string
    readonly loading?: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title = 'Karpuchina Gallery',
        loading = undefined
    }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                  name="keywords"
                  content="Karpuchina Gallery, Karpuchina, Gallery, Prague, Praha, Contemporary, Art"
                />
                <meta
                  name="description"
                  content="We are a progressive gallery of contemporary art."
                />
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