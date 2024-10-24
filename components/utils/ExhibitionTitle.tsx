'use client'
import React, {FunctionComponent} from 'react';
import {useTranslations} from 'next-intl';
import FormatArtists from '@/components/utils/FormatArtists';
import {Exhibition} from '@/api/classes';
import {useRouter} from 'next/router';
import LocalizedDate from '@/components/utils/LocalizeDate';
import styles from '../common.module.scss'
import {classNames} from '@/components/utils/classNames';
import {replaceSpaces} from '@/components/utils/replaceSpaces';


interface ExhibitionTitleProps {
    readonly exhibition: Exhibition
    readonly onDisplay?: boolean // todo automaticky podle data
    readonly fromHomepage: boolean
}

const ExhibitionTitle: FunctionComponent<ExhibitionTitleProps> = ({exhibition, onDisplay = false, fromHomepage}) => {
    const t = useTranslations('ExhibitionTitle');
    const router = useRouter();


    return (
        <h1 className={styles.exhibitionTitle} style={{color: fromHomepage && exhibition.Color ? exhibition.Color : '#000000'}}>
            {onDisplay && <>{t('onDisplay')}{' '}</>}
            <span className={styles.title}>{exhibition.Title}</span>
            {exhibition.Artists && exhibition.Artists.length > 0 &&
                <>
                    {' '}<FormatArtists artists={exhibition.Artists} />
                </>
            }
            {' '}
            <span className={classNames([styles.date, !fromHomepage && styles.galleryNameInTitle])}>
                {replaceSpaces(LocalizedDate(exhibition.StartDate, router.locale ?? 'cs'))}
                {exhibition.EndDate &&
                    <>
                        {' - '}
                        {replaceSpaces(LocalizedDate(exhibition.EndDate, router.locale ?? 'cs'))}
                    </>
                }
                {!fromHomepage &&
                    <span className={styles.galleryName}>{replaceSpaces("Karpuchina Gallery")}</span>
                }
            </span>
        </h1>
    )
}

export default ExhibitionTitle