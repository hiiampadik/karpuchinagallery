import React, {FunctionComponent} from 'react';
import FormatArtists from '@/components/utils/FormatArtists';
import {Event, EventDetail, EventType} from '@/api/classes';
import {useRouter} from 'next/router';
import LocalizedDate from '@/components/utils/LocalizeDate';
import styles from '../common.module.scss'
import {replaceSpaces} from '@/components/utils/replaceSpaces';
import {useTranslations} from 'next-intl';


export enum TimeContext {
    OnDisplay = 'OnDisplay',
    Upcoming = 'Upcoming',
}

interface EventTitleProps {
    readonly event: Event | EventDetail
    readonly timeContext: TimeContext | null
    readonly fromHomepage?: boolean
    readonly curators?: string[] | null;
}

const EventTitle: FunctionComponent<EventTitleProps> = ({event, timeContext, fromHomepage = false, curators}) => {
    const router = useRouter();
    const t = useTranslations('EventTitle');

    return (
        <h1 className={styles.eventTitle} style={{color: fromHomepage && event.Color ? event.Color : '#000000'}}>
            {timeContext === TimeContext.OnDisplay && <span className={styles.opacity}>{t('onDisplay')}{' '}</span>}
            {timeContext === TimeContext.Upcoming && <span className={styles.opacity}>{t('upcoming')}{' '}</span>}
            <span className={styles.title}>{event.Title}</span>
            {event.Artists && event.Artists.length > 0 &&
                <>
                    {event.Type !== EventType.Fairs ? ' ' : <br />}<FormatArtists artists={event.Artists} max3Artists={fromHomepage} showBy={event.Type !== EventType.Fairs}/>
                </>
            }
            {' '}
            <span className={styles.date}>
                <span className={styles.dateInner}>
                    {replaceSpaces(LocalizedDate(event.FromDate, router.locale ?? 'cs'))}
                    {event.ToDate &&
                        <>
                            {' - '}
                            {replaceSpaces(LocalizedDate(event.ToDate, router.locale ?? 'cs'))}
                        </>
                    }
                </span>
                {curators && curators.length > 0 &&
                    <span className={styles.spaceName}>
                        {curators.length === 1 ? t('curator') : t('curators')}{" "}
                        <FormatArtists artists={curators} max3Artists={false} showBy={false}/>
                    </span>
                }
            </span>
        </h1>
    )
}

export default EventTitle