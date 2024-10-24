'use client'
import React, {FunctionComponent} from 'react';
import {useTranslations} from 'next-intl';
import FormatArtists from '@/components/utils/FormatArtists';
import {Event} from '@/api/classes';
import {useRouter} from 'next/router';
import LocalizedDate from '@/components/utils/LocalizeDate';
import styles from '../common.module.scss'
import {classNames} from '@/components/utils/classNames';
import {replaceSpaces} from '@/components/utils/replaceSpaces';


interface EventTitleProps {
    readonly event: Event
    readonly onDisplay: boolean
    readonly fromHomepage: boolean
}

const EventTitle: FunctionComponent<EventTitleProps> = ({event, onDisplay, fromHomepage}) => {
    const t = useTranslations('EventTitle');
    const router = useRouter();


    return (
        <h1 className={styles.eventTitle} style={{color: fromHomepage && event.Color ? event.Color : '#000000'}}>
            {onDisplay && <span className={styles.opacity}>{t('onDisplay')}{' '}</span>}
            <span className={styles.title}>{event.Title}</span>
            {event.Artists && event.Artists.length > 0 &&
                <>
                    {' '}<FormatArtists artists={event.Artists} opacity={true}/>
                </>
            }
            {' '}
            <span className={classNames([styles.date, !fromHomepage && styles.galleryNameInTitle])}>
                {replaceSpaces(LocalizedDate(event.StartDate, router.locale ?? 'cs'))}
                {event.EndDate &&
                    <>
                        {' - '}
                        {replaceSpaces(LocalizedDate(event.EndDate, router.locale ?? 'cs'))}
                    </>
                }
                {!fromHomepage &&
                    <span className={styles.galleryName}>{replaceSpaces("Karpuchina Gallery")}</span>
                }
            </span>
        </h1>
    )
}

export default EventTitle