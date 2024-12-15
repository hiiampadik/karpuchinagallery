'use client'
import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'
import {useRouter} from 'next/router';

const Footer: FunctionComponent = () => {
    const router = useRouter();

    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerGradient} />
            <div className={styles.footerContent}>
                {router.locale === 'en' ?
                    <p>Rybná 22, Prague 1, Czechia, Tue to Sun: 1 pm to 6 pm or by appointment,
                        {' '}<a href="https://www.instagram.com/karpuchinagallery">Instagram ↗︎</a>
                        {' '}<a href="https://www.facebook.com/karpuchinagallery/">Facebook ↗︎</a>
                        {' '}<a href="http://eepurl.com/hdmZGf">Newsletter ↗︎</a></p>
                    :
                    <p>Rybná 22, Praha 1, Czechia, Út – Ne: 13 – 18 h nebo podle domluvy,
                        {' '}<a href="https://www.instagram.com/karpuchinagallery">Instagram ↗︎</a>
                        {' '}<a href="https://www.facebook.com/karpuchinagallery/">Facebook ↗︎</a>
                        {' '}<a href="http://eepurl.com/hdmZGf">Newsletter ↗︎</a></p>
                }
            </div>
        </div>
    );
};

export default Footer;
