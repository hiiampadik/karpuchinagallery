'use client'
import React, {FunctionComponent} from 'react';
import {useTranslations} from 'next-intl';
import FormatArtists from '@/components/utils/FormatArtists';
import {Event} from '@/api/classes';
import {useRouter} from 'next/router';
import LocalizedDate from '@/components/utils/LocalizeDate';
import styles from '../common.module.scss'
import {replaceSpaces} from '@/components/utils/replaceSpaces';


interface EventTitleProps {
    readonly event: Event
    readonly onDisplay: boolean
    readonly fromHomepage?: boolean
    readonly gallerySpace?: string | null;
}

const EventTitle: FunctionComponent<EventTitleProps> = ({event, onDisplay, fromHomepage = false, gallerySpace}) => {
    const t = useTranslations('EventTitle');
    const router = useRouter();

    return (
        <h1 className={styles.eventTitle} style={{color: fromHomepage && event.Color ? event.Color : '#000000'}}>
            {onDisplay && <span className={styles.opacity}>{t('onDisplay')}{' '}</span>}
            <span className={styles.title}>{event.Title}</span>
            {event.Artists && event.Artists.length > 0 &&
                <>
                    {' '}<FormatArtists artists={event.Artists} max3Artists={fromHomepage}/>
                </>
            }
            {' '}
            <span className={styles.date}>
                <span className={styles.dateInner}>
                    {replaceSpaces(LocalizedDate(event.OpeningDate, router.locale ?? 'cs'))}
                    {event.ToDate &&
                        <>
                            {' - '}
                            {replaceSpaces(LocalizedDate(event.ToDate, router.locale ?? 'cs'))}
                        </>
                    }
                </span>
                {gallerySpace &&
                    <span className={styles.spaceName}>{replaceSpaces(gallerySpace)}</span>
                }
            </span>
        </h1>
    )
}

export default EventTitle