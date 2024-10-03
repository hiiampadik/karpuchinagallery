'use client'
import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'
import {useRouter} from 'next/router';
import {usePathname} from 'next/navigation';
import {useTranslations} from 'next-intl';

interface SearchInputProps {
    readonly onClose: () => void
}

const SearchInput: FunctionComponent<SearchInputProps> = ({onClose}) => {
    const router = useRouter();

    const t = useTranslations('Search');

    return (
        <div className={styles.searchInputContainer}>
            <button className={styles.searchInputClose} onClick={() => onClose()}>
                {t('close')}
            </button>
        </div>
    );
};

export default SearchInput;
