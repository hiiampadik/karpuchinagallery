'use client'
import React, {FunctionComponent, PropsWithChildren, useState} from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import {usePathname} from 'next/navigation';
import Footer from '@/components/Layout/Footer';
import styles from './index.module.scss'
import SearchInput from '@/components/Search';

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
    const [showSearch, setShowSearch] = useState(false);

    // todo disable scroll

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
                    <Navigation handleSearch={() => setShowSearch(true)} />
                    <div className={styles.content}>
                        {children}
                    </div>
                    <Footer />
                    {showSearch &&
                        <SearchInput onClose={() => setShowSearch(false)} />
                    }
                </main>
        </>
    );
};

export default Layout