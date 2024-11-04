'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import SearchIcon from '../../public/SearchIcon.svg'
import Image from 'next/image'
import Overlay from '@/components/Overlay';

const Navigation: FunctionComponent = () => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Navigation');

    const [showOverlay, setShowOverlay] = useState<'menu' | 'search' | null>(null);

    useEffect(() => {
        router.events.on('routeChangeComplete', () => setShowOverlay(null));

        return () => router.events.off('routeChangeComplete', () => setShowOverlay(null));
    }, [router.events]);


    return (
        <>
           <div className={styles.navigationContainer}>
               <div className={styles.galleryTitle} >
                   <Link href="/" >
                       Karpuchina<br />Gallery
                   </Link>
               </div>
               <div className={styles.navigationLinksContainer}>
                   <Link href={"/artists"} className={currentPath === '/artists' ? styles.activeRoute : ''}>
                       {t('artists')}
                   </Link>
                   <Link href={"/exhibitions"} className={currentPath === '/exhibitions' ? styles.activeRoute : ''}>
                       {t('exhibitions')}
                   </Link>
                   <Link href={"/fairs"} className={currentPath === '/fairs' ? styles.activeRoute : ''}>
                       {t('fairs')}
                   </Link>
                   <Link href={"/about"} className={currentPath === '/about' ? styles.activeRoute : ''}>
                       {t('contact')}
                   </Link>

                   <button onClick={() => {
                       setShowOverlay('search')
                   }}>
                       {t('search')}
                   </button>

                   <Link
                       href={router.asPath}
                       locale={router.locale === "cs" ? "en" : "cs"}
                       className={styles.languageButton}
                   >
                       {router.locale === "cs" ? "EN" : "CZ"}
                   </Link>
               </div>
               <div className={styles.navigationMenuContainer}>
                   <button onClick={() => setShowOverlay('menu')}>
                       {t('menu')}
                   </button>
               </div>
           </div>

            <Overlay handleClose={() => setShowOverlay(null)} isOpen={showOverlay !== null} className={styles.menuContainer}>
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
    const t = useTranslations('Navigation');
    const router = useRouter();

    return (
        <div className={styles.linksContainer}>
            <Link href={"/artists"}>
                {t('artists')}
            </Link>
            <Link href={"/exhibitions"}>
                {t('exhibitions')}
            </Link>
            <Link href={"/fairs"}>
                {t('fairs')}
            </Link>
            <Link href={"/about"}>
                {t('contact')}
            </Link>

            <button
                onClick={() => {
                    handleShowSearch();
                }}
            >
                {t('search')}
                <Image src={SearchIcon} alt={'s'} width="30" height="30"/>
            </button>

            <Link href={router.asPath} locale={router.locale === "cs" ? "en" : "cs"}
                  className={styles.languageButton}>
                <span className={router.locale === "cs" ? styles.activeLocale : ''}>CZ</span>
                {'/'}
                <span className={router.locale === "en" ? styles.activeLocale : ''}>EN</span>
            </Link>
        </div>
    )
}


const SearchOverlay: FunctionComponent = () => {

    return (
        <div className={styles.linksContainer}>
            Search
        </div>
    )
}
