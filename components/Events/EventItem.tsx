import styles from '../Layout/index.module.scss'
import Link from 'next/link';
import React, {FunctionComponent, useState} from 'react';
import {Event} from '@/api/classes';
import FormatArtists from '@/components/utils/FormatArtists';
import Figure from '@/components/Sanity/Figure';
import figureStyles from '@/components/Sanity/Figure.module.scss';
import {classNames} from '@/components/utils/classNames';

interface EventItemProps {
    readonly event: Event;
    readonly useH2: boolean
    readonly type: 'fairs' | 'exhibitions'
}

const EventItem: FunctionComponent<EventItemProps> = ({event, useH2, type}) => {
    const [loaded, setLoaded] = useState(false)
    const hrefType = type === 'exhibitions' ? 'exhibition' : 'fair'

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
                    <span>{event.Title}</span>
                    {' '}<FormatArtists artists={event.Artists}/>
                </h2>
                :
                <h3>
                    <span>{event.Title}</span>
                    {' '}<FormatArtists artists={event.Artists}/>
                </h3>
            }
        </Link>
    )
}

export default EventItem