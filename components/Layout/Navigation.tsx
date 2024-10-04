'use client'
import React, {FunctionComponent, useState} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {GetStaticPropsContext} from 'next';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';

interface NavigationProps {
    readonly handleSearch: () => void
}

const Navigation: FunctionComponent<NavigationProps> = ({handleSearch}) => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Navigation');

    const [showMenu, setShowMenu] = useState(true);

    return (
        <>
           <div className={styles.navigationContainer}>
               <div>
                   <Link href="/">
                       Karpuchina<br />Gallery
                   </Link>
               </div>
               <div className={styles.navigationLinksContainer}>
                   <Link href={"/artists"} className={currentPath === '/artists' ? styles.active : ''}>
                       {t('artists')}
                   </Link>
                   <Link href={"/exhibitions"} className={currentPath === '/exhibitions' ? styles.active : ''}>
                       {t('exhibitions')}
                   </Link>
                   <Link href={"/fairs"} className={currentPath === '/fairs' ? styles.active : ''}>
                       {t('fairs')}
                   </Link>
                   <Link href={"/about"} className={currentPath === '/about' ? styles.active : ''}>
                       {t('contact')}
                   </Link>

                   <button onClick={handleSearch}>
                       {t('search')}
                   </button>

                   <Link
                       href={router.asPath}
                       locale={router.locale === "cs" ? "en" : "cs"}
                       className={styles.languageButton}
                   >
                       {t('language')}
                   </Link>


               </div>
           </div>
            {showMenu &&
                <div className={styles.menuContainer}>
                    <button className={styles.menuClose} onClick={() => setShowMenu(false)}>
                        {t('close')}
                    </button>


                    <div className={styles.linksContainer}>
                        <Link href={"/artists"} className={currentPath === '/artists' ? styles.active : ''}>
                            {t('artists')}
                        </Link>
                        <Link href={"/exhibitions"} className={currentPath === '/exhibitions' ? styles.active : ''}>
                            {t('exhibitions')}
                        </Link>
                        <Link href={"/fairs"} className={currentPath === '/fairs' ? styles.active : ''}>
                            {t('fairs')}
                        </Link>
                        <Link href={"/about"} className={currentPath === '/about' ? styles.active : ''}>
                            {t('contact')}
                        </Link>

                        {/*todo zavrit menu*/}
                        {/*todo icon */}
                        <div className={styles.searchButtonContainer}>
                            <button onClick={handleSearch}>
                                {t('search')}
                            </button>
                        </div>

                        {/*todo zavrit na switch?*/}
                        <div className={styles.languageContainer}>
                            <Link
                                href={router.asPath}
                                locale={'cs'}
                                className={router.locale === "en" ? styles.black : ''}
                            >CZ</Link>
                            {'/'}
                            <Link
                                href={router.asPath}
                                locale={'en'}
                                className={router.locale === "cs" ? styles.black : ''}
                            >EN</Link>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Navigation;


export async function getStaticProps(context: GetStaticPropsContext) {
    return {
        props: {
            // You can get the messages from anywhere you like. The recommended
            // pattern is to put them in JSON files separated by locale and read
            // the desired one based on the `locale` received from Next.js.
            messages: (await import(`../../public/locales/${context.locale}.json`)).default
        }
    };
}