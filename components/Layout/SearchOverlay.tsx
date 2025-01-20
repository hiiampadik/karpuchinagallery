'use client'
import React, {FunctionComponent, useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {cs} from '@/components/locales/cs';
import {en} from '@/components/locales/en';
import {Event} from '@/api/classes';
import {debounce} from '@/components/utils/debounce';
import {fetchEvents} from '@/api/search';
import styles from '@/components/Layout/index.module.scss';
import EventItem from '@/components/Events/EventItem';

export const SearchOverlay: FunctionComponent = () => {
    const router = useRouter();
    const t = router.locale === "cs" ? cs.Search : en.Search;

    const [searchQuery, setSearchQuery] = useState('')

    const [events, setEvents] = useState<null | Event[]>(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce(
            (searchTerm: string) => {
                if (searchTerm.length === 0){
                    setEvents(null)
                    return
                }
                fetchEvents(searchTerm,  router.locale ?? 'cs').then(
                    (events) => {
                        setEvents(events)
                    })

                // todo
            },
            1000,
        ),
        [],
    );

    return (
        <div className={styles.searchContainer}>
            <input type="text" value={searchQuery}
                   autoFocus={true}
                   onChange={(e) => {
                       const searchTerm = e.target.value;
                       if (searchTerm.length < 40) {
                           setSearchQuery(searchTerm)
                           handleSearch(searchTerm);
                       }
                   }}
                   placeholder={t['placeholder']}
            />
            {events !== null&&
                <>
                    {events.length === 0 ?
                        <>
                            {t['noResults']}
                        </>
                        :
                        <div className={styles.eventsContainer}>
                            {events.map(event => (
                                <EventItem event={event} key={event.Id} useH2={true} type={event.Type} />
                            ))}
                        </div>
                    }
                </>
            }
        </div>
    )
}
