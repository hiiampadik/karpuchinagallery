import styles from '@/styles/eventdetails.module.scss';
import React, {FunctionComponent} from 'react';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import GallerySwiper from '@/components/Sanity/GallerySwiper';
import BlockContent from '@/components/Sanity/BlockContent';
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import EventTitle, {TimeContext} from '@/components/Events/EventTitle';
import {ArtworkDetailWrapper} from '@/components/Artworks/ArtworkDetail';
import {useRouter} from 'next/router';
import {cs} from '@/components/locales/cs';
import {en} from '@/components/locales/en';


interface EventDetailProps {
    readonly event: EventDetailClass
    readonly type: EventType
}
const EventDetail: FunctionComponent<EventDetailProps> = ({event, type}) => {

    const router = useRouter();
    const t = router.locale === "cs" ? cs.Event : en.Event;

    const getTimeContext = (event: EventDetailClass) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0)

        const start = new Date(event.FromDate);
        start.setHours(0, 0, 0, 0)

        const end = event.ToDate ? new Date(event.ToDate) : start;
        end.setHours(0, 0, 0, 0)

        if (today >= start && today <= end){
            return TimeContext.OnDisplay
        } else if (today < start) {
            return TimeContext.Upcoming
        }
        return null
    };


    return (
        <>
            <article className={styles.eventContainer}>
                <section className={styles.eventFold}>
                    <EventTitle event={event} timeContext={getTimeContext(event)} curators={event.Curators}/>
                    {event.Gallery &&
                        <div className={styles.eventGallery}>
                            <GallerySwiper images={event.Gallery}></GallerySwiper>
                        </div>
                    }
                </section>

                {event.Text &&
                    <section className={styles.curatorsTextContainer}>
                        <h2>
                            {event.AlternativeTextTitle ?? t['text']}
                        </h2>
                        <BlockContent blocks={event.Text}/>
                        {event.TextAuthor && <p>{'– '}{event.TextAuthor}</p>}
                    </section>
                }

                {event.Documents &&
                    <section className={styles.documentsContainer}>
                        <h2>
                            {t.documents}
                        </h2>
                        <div className={styles.documents}>
                            {event.Documents.map(document => (
                                <Link href={document.Url} download={true} key={document.Id}>
                                    <Figure
                                        image={document.Cover}
                                        alt={(document.Alt)}
                                    />
                                </Link>
                            ))}

                        </div>
                    </section>
                }

                {event.Artworks && event.Artworks.length > 0 &&
                    <section className={styles.selectedWorksContainer}>
                        <h2>
                            {t['works']}
                        </h2>
                        <div className={styles.selectedWorks}>
                            <ArtworkDetailWrapper artworks={event.Artworks} />
                        </div>
                    </section>
                }

                <section className={styles.allEvents}>
                    {type === EventType.Fairs &&
                        <Link href={"/fairs"}>
                            {t['allFairs']}
                        </Link>
                    }
                    {type === EventType.Exhibitions &&
                        <Link href={"/exhibitions"}>
                            {t['allExhibitions']}
                        </Link>
                    }
                </section>
            </article>
        </>
    )
}

export default EventDetail