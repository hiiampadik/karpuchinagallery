'use client'
import styles from '@/styles/events.module.scss';
import React, {FunctionComponent, useMemo} from 'react';
import {Event} from '@/api/classes';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventsComponents/EventItem';

interface EventsProps {
    readonly events: Event[]
    readonly type: 'fairs' | 'exhibitions'
}
const Events: FunctionComponent<EventsProps> = ({events, type}) => {

    const groupedEventsByYear = useMemo(() => {
        if (!events){
            return []
        }
        const eventsByYear: { [key: number]: Event[] } = {};

        events.forEach(event => {
            const year = new Date(event.StartDate).getFullYear();
            if (!eventsByYear[year]) {
                eventsByYear[year] = [];
            }
            eventsByYear[year].push(event);
        });
        return Object.entries(eventsByYear)
            .map(([year, event]) => ({
                year: parseInt(year),
                events: event.sort((a, b) => {
                    const dateA = new Date(a.StartDate).getTime();
                    const dateB = new Date(b.StartDate).getTime();
                    return dateB - dateA;
                }),
            }))
            .sort((a, b) => b.year - a.year);
    }, [events])


    return (
        <Layout>
            {groupedEventsByYear.map((group) => (
                <div key={group.year} className={styles.eventYear}>
                    <h1>{group.year}</h1>
                    <div className={styles.eventContainer}>
                        {group.events.map((event => (
                                <EventItem event={event} key={event.Id} useH2={true} type={type} />
                            )
                        ))}
                    </div>
                </div>
            ))}
        </Layout>
    );
}

export default Events