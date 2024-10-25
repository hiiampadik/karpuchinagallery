'use client'
import React, {FunctionComponent, useState} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import {Artwork} from '@/api/classes';

interface ArtworkDetailProps {
    readonly handleClose: () => void
    readonly artwork: Artwork
}

const ArtworkDetail: FunctionComponent<ArtworkDetailProps> = ({handleClose, artwork}) => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Artwork');

    return (
        <div className={styles.artworkDetailContainer}>
            <button className={styles.artworkClose} onClick={() => handleClose()}>
                {t('close')}
            </button>


        </div>
    );
};

export default ArtworkDetail;

