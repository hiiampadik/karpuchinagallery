'use client'
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import SearchIcon from '../../public/SearchIcon.svg'
import Image from 'next/image'
import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';

import {fetchEvents} from '@/api/search';
import {EventType, Event} from '@/api/classes';
import {debounce} from '@/components/utils/debounce';
import EventItem from '@/components/Events/EventItem';


const Navigation: FunctionComponent = () => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Navigation');

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
        <div className={styles.searchContainer}>
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

            <button onClick={() => handleShowSearch()} className={styles.searchButton}>
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
    const t = useTranslations('Search');
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('')

    const [exhibitions, setExhibitions] = useState<null | Event[]>(null)
    const [fairs, setFairs] = useState<null | Event[]>(null)

    const handleSearch = useCallback(
        debounce(
            (searchTerm: string) => {
                if (searchTerm.length === 0){
                    setExhibitions(null)
                    setFairs(null)
                    return
                }
                fetchEvents(searchTerm, EventType.Exhibitions, router.locale ?? 'cs').then(
                    (events) => {
                        setExhibitions(events)
                    })
                fetchEvents(searchTerm, EventType.Fairs, router.locale ?? 'cs').then(
                    (events) => {
                        setFairs(events)
                    })

                // todo
            },
            1000,
        ),
        [],
    );

    return (
        <div className={styles.searchContainer}>
            <input type="text" value={searchQuery}
                   autoFocus={true}
                   onChange={(e) => {
                       const searchTerm = e.target.value;
                       if (searchTerm.length < 40) {
                           setSearchQuery(searchTerm)
                           handleSearch(searchTerm);
                       }
                   }}
                   placeholder={t('placeholder')}
            />
            {exhibitions !== null && fairs !== null &&
                <>
                    {exhibitions.length === 0 && fairs.length === 0 ?
                        <>
                            {t('noResults')}
                        </>
                        :
                        <div className={styles.eventsContainer}>
                            {exhibitions.concat(fairs).map(event => (
                                <EventItem event={event} key={event.Id} useH2={true} type={event.Type} />
                            ))}
                        </div>
                    }
                </>
            }
        </div>
    )
}
