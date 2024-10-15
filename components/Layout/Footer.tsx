'use client'
import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'
import {useFetchAbout} from '@/api/useSanityData';
import {useRouter} from 'next/router';
import BlockContent from '@/components/Sanity/BlockContent';

const Footer: FunctionComponent = () => {
    const router = useRouter();
    const {data: about} = useFetchAbout(router.locale ?? 'cs')

    // todo gradient do ztracena za koncem stranky
    return (
        <>
            <div className={styles.footerContainer}>
                <div className={styles.footerGradient}/>
                <div className={styles.footerContent}>
                    {about &&
                        <BlockContent blocks={about.Footer}/>
                    }
                </div>
            </div>
        </>
    );
};

export default Footer;
