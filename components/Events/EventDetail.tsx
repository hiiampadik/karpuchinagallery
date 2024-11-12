'use client'
import styles from '@/styles/eventdetails.module.scss';
import React, {FunctionComponent} from 'react';
import {EventDetail as EventDetailClass} from '@/api/classes';
import Layout from '@/components/Layout';
import GallerySwiper from '@/components/Sanity/GallerySwiper';
import BlockContent from '@/components/Sanity/BlockContent';
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import {useTranslations} from 'next-intl';
import EventTitle from '@/components/Events/EventTitle';


interface EventDetailProps {
    readonly event: EventDetailClass | null
    readonly type: 'fairs' | 'exhibitions'
}
const EventDetail: FunctionComponent<EventDetailProps> = ({event, type}) => {
    
    const t = useTranslations('Event');
    const getOnDisplay = (event: EventDetailClass) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0)

        const start = new Date(event.OpeningDate);
        start.setHours(0, 0, 0, 0)

        const end = event.ToDate ? new Date(event.ToDate) : start;
        end.setHours(0, 0, 0, 0)

        return today >= start && today <= end;
    };


    return (
        <Layout >
            {event &&
                <div className={styles.eventContainer}>
                    <div className={styles.eventFold}>
                        <EventTitle event={event} onDisplay={getOnDisplay(event)} gallerySpace={event.GallerySpace}/>
                        {event.Gallery &&
                            <div className={styles.eventGallery}>
                                <GallerySwiper images={event.Gallery}></GallerySwiper>
                            </div>
                        }
                    </div>

                    <div className={styles.curatorsTextContainer}>
                        <h2>
                            {type === 'fairs' ? t('curatorsText') : t('text')}
                        </h2>
                        <BlockContent blocks={event.Text}/>
                    </div>

                    {event.Documents &&
                        <div className={styles.documentsContainer}>
                            <h2>
                                {t('documents')}
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
                        </div>
                    }

                    {event.Artworks && event.Artworks.length > 0 &&
                        <div className={styles.selectedWorksContainer}>
                            <h2>
                                {t('selectedWorks')}
                            </h2>
                            <div className={styles.selectedWorks}>
                                {event.Artworks.map(artwork => (
                                    <div key={artwork.Id} className={styles.work}>
                                        <div className={styles.cover}>
                                            <Figure
                                                image={artwork.Cover}
                                                alt={artwork.Title.concat(" – Artwork Cover")}
                                            />
                                        </div>
                                        <h3>
                                            {artwork.Title} {artwork.Year && `(${artwork.Year})`}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                    <div className={styles.allEvents}>
                        {type === 'fairs' ?
                            <Link href={"/fairs"}>
                                {t('allFairs')}
                            </Link>
                            :
                            <Link href={"/exhibitions"}>
                                {t('allExhibitions')}
                            </Link>
                        }
                    </div>


                </div>
            }
        </Layout>
    )
}

export default EventDetail