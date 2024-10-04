'use client'
import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'

interface FooterProps {
}

const Footer: FunctionComponent<FooterProps> = ({}) => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerGradient} />
            <div className={styles.footerContent}>
                Rybná 22, Praha 1, Czechia, Tue to Sun: 1 pm to 6 pm or by appointment, Instagram ↗︎ Facebook ↗︎ Newsletter ↗︎
            </div>
        </div>
    );
};

export default Footer;
