import styles from '../Layout/index.module.scss'
import Link from 'next/link';
import React, {FunctionComponent, useState} from 'react';
import {Event, EventType} from '@/api/classes';
import FormatArtists from '@/components/utils/FormatArtists';
import Figure from '@/components/Sanity/Figure';
import figureStyles from '@/components/Sanity/Figure.module.scss';
import {classNames} from '@/components/utils/classNames';

interface EventItemProps {
    readonly event: Event;
    readonly useH2: boolean
    readonly type: EventType
}

const EventItem: FunctionComponent<EventItemProps> = ({event, useH2, type}) => {
    const [loaded, setLoaded] = useState(false)
    const hrefType = type === EventType.Exhibitions ? 'exhibition' : 'fair'

    return (
        <Link href={`/${hrefType}/[slug]`}
              as={`/${hrefType}/${event.Slug}`}
              key={event.Slug}
              className={classNames([loaded ? figureStyles.loaded : figureStyles.loading, styles.eventContainer])}>
            <div className={styles.cover}>
                <Figure
                    image={event.Cover}
                    alt={event.Title.concat(" – Cover Image")}
                    onLoad={() => setLoaded(true)}
                />
            </div>
            {useH2 ?
                <h2>
                    <span className={styles.italic}>{event.Title}</span>
                    {type === EventType.Exhibitions ? ' ' : <br />}<FormatArtists artists={event.Artists} showBy={type === 'exhibitions'}/>
                </h2>
                :
                <h3>
                    <span className={styles.italic}>{event.Title}</span>
                    {type === EventType.Exhibitions ? ' ' : <br />}<FormatArtists artists={event.Artists} showBy={type === 'exhibitions'}/>
                </h3>
            }
        </Link>
    )
}

export default EventItem