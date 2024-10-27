'use client'
import React, {FunctionComponent, PropsWithChildren, useCallback, useState} from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import Footer from '@/components/Layout/Footer';
import styles from './index.module.scss'
import Fish from '@/components/Fish';
import {OverlaysProvider} from '@blueprintjs/core';
import Overlay from '@/components/Overlay';

interface LayoutProps {
    readonly title?: string
    readonly loading?: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title = 'Karpuchina Gallery',
        loading = false
    }) => {
    const [showSearch, setShowSearch] = useState(false);
    const toggleOverlay = useCallback(() => setShowSearch(open => !open), [setShowSearch]);

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

                <Navigation handleSearch={() => toggleOverlay()}/>
                <div className={styles.content}>
                    {children}
                </div>
                <Footer/>

                <Overlay handleClose={() => toggleOverlay()} isOpen={showSearch}>
                    Search
                </Overlay>

            </main>

            <div className={styles.fishContainer}>
                <Fish/>
            </div>

        </>
    );
};

export default Layout