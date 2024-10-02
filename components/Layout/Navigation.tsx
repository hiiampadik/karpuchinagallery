'use client'
import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';

interface NavigationProps {
}

const Navigation: FunctionComponent<NavigationProps> = ({}) => {
    const router = useRouter();
    const languageButton = router.locale === "cs" ? "EN" : "CZ";


    return (
       <div className={styles.navigationContainer}>
           <div>
               <Link href="/">
                   Karpuchina<br />Gallery
               </Link>
           </div>

           <div className={styles.navigationLinksContainer}>
               <Link href={"/artists"}>
                   Artists
               </Link>
               <Link href={"/exhibitions"}>
                   Exhibitions
               </Link>
               <Link href={"/fairs"}>
                   Fairs
               </Link>
               <Link href={"/about"}>
                   Contact+About
               </Link>

               Search

               <Link
                   href={router.asPath}
                   locale={languageButton == "EN" ? "en" : "cs"}
                   className={styles.languageButton}
               >
                   {languageButton}
               </Link>


           </div>
       </div>
    );
};

export default Navigation;
