'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {usePathname} from 'next/navigation';
import SearchIcon from '../../public/SearchIcon.svg'
import Image from 'next/image'
import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import {cs} from '@/components/locales/cs';
import {en} from '@/components/locales/en';
import {SearchOverlay} from '@/components/Layout/SearchOverlay';


const Navigation: FunctionComponent = () => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = router.locale === "cs" ? cs.Navigation : en.Navigation;

    const [showOverlay, setShowOverlay] = useState<'menu' | 'search' | null>(null);

    useEffect(() => {
        const handleRouteChange = () => {
            setShowOverlay(null);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => router.events.off('routeChangeComplete', handleRouteChange);
    }, [router.events]);

    useDisableScroll(showOverlay !== null)

    return (
        <>
           <div className={styles.navigationContainer}>
               <div className={styles.galleryTitle} >
                   <Link href="/" prefetch={false}>
                       Karpuchina<br />Gallery
                   </Link>
               </div>
               <div className={styles.navigationLinksContainer}>
                   <Link href={"/artists"} className={currentPath?.startsWith('/artist') ? styles.activeRoute : ''} prefetch={false}>
                       {t['artists']}
                   </Link>
                   <Link href={"/exhibitions"} className={currentPath?.startsWith('/exhibition') ? styles.activeRoute : ''} prefetch={false}>
                       {t['exhibitions']}
                   </Link>
                   <Link href={"/fairs"} className={currentPath?.startsWith('/fair') ? styles.activeRoute : ''} prefetch={false}>
                       {t['fairs']}
                   </Link>
                   <Link href={"/about"} className={currentPath === '/about' ? styles.activeRoute : ''} prefetch={false}>
                       {t['contact']}
                   </Link>

                   <button onClick={() => {
                       setShowOverlay('search')
                   }}>
                       {t['search']}
                   </button>

                   <Link
                       href={router.asPath}
                       locale={router.locale === "cs" ? "en" : "cs"}
                       className={styles.languageButton}
                       prefetch={false}
                   >
                       {router.locale === "cs" ? "EN" : "CZ"}
                   </Link>
               </div>
               <div className={styles.navigationMenuContainer}>
                   <button onClick={() => setShowOverlay('menu')}>
                       {t['menu']}
                   </button>
               </div>
           </div>

            <Overlay handleClose={() => setShowOverlay(null)} isOpen={showOverlay !== null} scrollable={showOverlay === 'search'}>
                {showOverlay === 'menu' &&
                    <NavigationOverlay handleShowSearch={() => setShowOverlay('search')} />
                }
                {showOverlay === 'search' &&
                    <SearchOverlay />
                }
            </Overlay>

        </>
    );
};

export default Navigation;

interface NavigationOverlayProps {
    readonly handleShowSearch: () => void
}
const NavigationOverlay: FunctionComponent<NavigationOverlayProps> = ({handleShowSearch}) => {
    const router = useRouter();
    const t = router.locale === "cs" ? cs.Navigation : en.Navigation;

    return (
        <div className={styles.menuContainer}>
            <Link href={"/artists"} prefetch={false}>
                {t['artists']}
            </Link>
            <Link href={"/exhibitions"} prefetch={false}>
                {t['exhibitions']}
            </Link>
            <Link href={"/fairs"} prefetch={false}>
                {t['fairs']}
            </Link>
            <Link href={"/about"} prefetch={false}>
                {t['contact']}
            </Link>

            <button onClick={() => handleShowSearch()} className={styles.searchButton}>
                {t['search']}
                <Image src={SearchIcon} alt={'s'} width="30" height="30"/>
            </button>

            <Link href={router.asPath}
                  locale={router.locale === "cs" ? "en" : "cs"}
                  className={styles.languageButton}
                  prefetch={false}>
                <span className={router.locale === "cs" ? styles.activeLocale : ''}>CZ</span>
                {'/'}
                <span className={router.locale === "en" ? styles.activeLocale : ''}>EN</span>
            </Link>
        </div>
    )
}

