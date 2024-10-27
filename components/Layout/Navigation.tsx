'use client'
import React, {FunctionComponent, useCallback, useState} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import SearchIcon from '../../public/SearchIcon.svg'
import Image from 'next/image'
import Overlay from '@/components/Overlay';

interface NavigationProps {
    readonly handleSearch: () => void
}

const Navigation: FunctionComponent<NavigationProps> = ({handleSearch}) => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Navigation');

    const [showMenu, setShowMenu] = useState(false);
    const toggleOverlay = useCallback(() => setShowMenu(open => !open), [setShowMenu]);

    // todo onclose too fast

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
                       handleSearch()
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
                   <button onClick={() => toggleOverlay()}>
                       {t('menu')}
                   </button>
               </div>
           </div>

            <Overlay handleClose={() => toggleOverlay()}
                     isOpen={showMenu}
                     className={styles.menuContainer}>

                <div className={styles.linksContainer}>
                    <Link href={"/artists"} onClick={() => toggleOverlay()}>
                        {t('artists')}
                    </Link>
                    <Link href={"/exhibitions"} onClick={() => toggleOverlay()}>
                        {t('exhibitions')}
                    </Link>
                    <Link href={"/fairs"} onClick={() => toggleOverlay()}>
                        {t('fairs')}
                    </Link>
                    <Link href={"/about"} onClick={() => toggleOverlay()}>
                        {t('contact')}
                    </Link>

                    <button
                        onClick={() => {
                            handleSearch();
                            toggleOverlay();
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
            </Overlay>

        </>
    );
};

export default Navigation;

