'use client'
import React, {FunctionComponent, useState} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import SearchIcon from '../../public/SearchIcon.svg'
import Image from 'next/image'

interface NavigationProps {
    readonly handleSearch: () => void
    readonly handleDisableScroll: (disable: boolean) => void
}

const Navigation: FunctionComponent<NavigationProps> = ({handleSearch, handleDisableScroll}) => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Navigation');

    const [showMenu, setShowMenu] = useState(false);

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
                       handleDisableScroll(true)
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
                   <button onClick={() => {
                       setShowMenu(true)
                       handleDisableScroll(true)
                   }}>
                       {t('menu')}
                   </button>
               </div>
           </div>
            {showMenu &&
                <div className={styles.menuContainer}>
                    <button
                        className={styles.menuClose}
                        onClick={() => {
                            handleDisableScroll(false)
                            setShowMenu(false)
                    }}>
                        {t('close')}
                    </button>

                    <div className={styles.linksContainer}>
                        <Link href={"/artists"} onClick={() => {
                            handleDisableScroll(false)
                            setShowMenu(false)}
                        }>
                            {t('artists')}
                        </Link>
                        <Link href={"/exhibitions"} onClick={() => {
                            handleDisableScroll(false)
                            setShowMenu(false)}
                        }>
                            {t('exhibitions')}
                        </Link>
                        <Link href={"/fairs"} onClick={() => {
                            handleDisableScroll(false)
                            setShowMenu(false)}
                        }>
                            {t('fairs')}
                        </Link>
                        <Link href={"/about"} onClick={() => {
                            handleDisableScroll(false)
                            setShowMenu(false)}
                        }>
                            {t('contact')}
                        </Link>

                        <button
                            onClick={() => {
                                handleSearch();
                                setShowMenu(false)}}
                        >
                            {t('search')}
                            <Image  src={SearchIcon} alt={'s'} width="30" height="30" />
                        </button>

                        <Link href={router.asPath} locale={router.locale === "cs" ? "en" : "cs"} className={styles.languageButton}>
                            <span className={router.locale === "cs" ? styles.activeLocale : ''}>CZ</span>
                            {'/'}
                            <span className={router.locale === "en" ? styles.activeLocale : ''}>EN</span>
                        </Link>
                    </div>
                </div>
            }
        </>
    );
};

export default Navigation;

