import styles from './index.module.scss'
import Link from 'next/link';
import React, {FunctionComponent} from 'react';
import {Event, EventType} from '@/api/classes';
import FormatArtists from '@/components/utils/FormatArtists';
import Figure from '@/components/Sanity/Figure';
import {classNames} from '@/components/utils/classNames';

interface EventItemProps {
    readonly event: Event;
    readonly useH2: boolean
    readonly type: EventType
}

const EventItem: FunctionComponent<EventItemProps> = ({event, useH2, type}) => {
    const getHref = () => {
        switch (type){
            case EventType.Exhibitions:
                return 'exhibition'
            case EventType.ArtistsEvents:
                return 'artists-event'
            case EventType.Fairs:
                return 'fair'
        }
    }

    return (
        <Link href={`/${getHref()}/[slug]`}
              as={`/${getHref()}/${event.Slug}`}
              key={event.Slug}
              className={classNames([styles.eventContainer])}>
            <div className={styles.cover}>
                <Figure
                    image={event.Cover}
                    alt={event.Title.concat(" – Cover Image")}
                />
            </div>
            {useH2 ?
                <h2>
                    <span className={styles.italic}>{event.Title}</span>
                    {type !== EventType.Fairs ? ' ' : <br />}<FormatArtists artists={event.Artists} showBy={type !== EventType.Fairs}/>
                </h2>
                :
                <h3>
                    <span className={styles.italic}>{event.Title}</span>
                    {type !== EventType.Fairs ? ' ' : <br />}<FormatArtists artists={event.Artists} showBy={type !== EventType.Fairs}/>
                </h3>
            }
        </Link>
    )
}

export default EventItem