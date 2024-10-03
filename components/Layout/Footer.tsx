'use client'
import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'
import {usePathname} from 'next/navigation';

interface FooterProps {
}

const Footer: FunctionComponent<FooterProps> = ({}) => {
    const currentPath = usePathname();

    return (
        <div className={styles.footerContainer}>
            <div className={currentPath !== '/' ? styles.footerGradient : styles.footerNoGradient} />
            <div className={styles.footerContent}>
                Rybná 22, Praha 1, Czechia, Tue to Sun: 1 pm to 6 pm or by appointment, Instagram ↗︎ Facebook ↗︎ Newsletter ↗︎
            </div>
        </div>
    );
};

export default Footer;
