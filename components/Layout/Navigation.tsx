'use client'
import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {GetStaticPropsContext} from 'next';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';

interface NavigationProps {
}

const Navigation: FunctionComponent<NavigationProps> = ({}) => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Navigation');

    return (
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

               {t('search')}


               <Link
                   href={router.asPath}
                   locale={router.locale === "cs" ? "en" : "cs"}
                   className={styles.languageButton}
               >
                   {t('language')}
               </Link>


           </div>
       </div>
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