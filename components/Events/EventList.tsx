'use client'
import styles from '@/styles/events.module.scss';
import React, {FunctionComponent, useMemo} from 'react';
import {Event, EventType} from '@/api/classes';
import Layout from '@/components/Layout';
import EventItem from '@/components/Events/EventItem';

interface EventsProps {
    readonly events: Event[]
    readonly type: EventType
}
const EventList: FunctionComponent<EventsProps> = ({events, type}) => {

    // todo lazy loading
    const groupedEventsByYear = useMemo(() => {
        if (!events){
            return []
        }
        const eventsByYear: { [key: number]: Event[] } = {};

        events.forEach(event => {
            const year = new Date(event.FromDate).getFullYear();
            if (!eventsByYear[year]) {
                eventsByYear[year] = [];
            }
            eventsByYear[year].push(event);
        });
        return Object.entries(eventsByYear)
            .map(([year, event]) => ({
                year: parseInt(year),
                events: event.sort((a, b) => {
                    const dateA = new Date(a.FromDate).getTime();
                    const dateB = new Date(b.FromDate).getTime();
                    return dateB - dateA;
                }),
            }))
            .sort((a, b) => b.year - a.year);
    }, [events])


    return (
        <Layout title={type === EventType.Fairs ? 'Fairs | Karpuchina Gallery' : 'Exhibitions | Karpuchina Gallery'}>
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

export default EventList