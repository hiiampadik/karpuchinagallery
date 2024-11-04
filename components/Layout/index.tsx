'use client'
import React, {FunctionComponent, PropsWithChildren, useCallback, useState} from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import Footer from '@/components/Layout/Footer';
import styles from './index.module.scss'
import Fish from '@/components/Fish';

interface LayoutProps {
    readonly title?: string
    readonly loading?: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title = 'Karpuchina Gallery',
        loading = false
    }) => {

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
                <Navigation/>
                <div className={styles.content}>
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