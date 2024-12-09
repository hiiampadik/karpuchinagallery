'use client'
import styles from '@/styles/eventdetails.module.scss';
import React, {FunctionComponent, useState} from 'react';
import {Artwork, EventDetail as EventDetailClass, EventType} from '@/api/classes';
import Layout from '@/components/Layout';
import GallerySwiper from '@/components/Sanity/GallerySwiper';
import BlockContent from '@/components/Sanity/BlockContent';
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import {useTranslations} from 'next-intl';
import EventTitle, {TimeContext} from '@/components/Events/EventTitle';
import ArtworkItem from '@/components/Artworks/ArtworkItem';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import ArtworkDetail from '@/components/Artworks/ArtworkDetail';


interface EventDetailProps {
    readonly event: EventDetailClass | null
    readonly type: EventType
}
const EventDetail: FunctionComponent<EventDetailProps> = ({event, type}) => {
    const [showArtwork, setArtwork] = useState<Artwork | null>(null)
    useDisableScroll(showArtwork !== null)

    const t = useTranslations('Event');
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
            <Layout >
                {event &&
                    <div className={styles.eventContainer}>
                        <div className={styles.eventFold}>
                            <EventTitle event={event} timeContext={getTimeContext(event)} gallerySpace={event.GallerySpace}/>
                            {event.Gallery &&
                                <div className={styles.eventGallery}>
                                    <GallerySwiper images={event.Gallery}></GallerySwiper>
                                </div>
                            }
                        </div>

                        <div className={styles.curatorsTextContainer}>
                            <h2>
                                {type === EventType.Fairs ? t('curatorsText') : t('text')}
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
                                    {t('works')}
                                </h2>
                                <div className={styles.selectedWorks}>
                                    {event.Artworks.map(artwork => (
                                        <ArtworkItem key={artwork.Id} artwork={artwork} onOpenArtwork={setArtwork} />
                                    ))}
                                </div>
                            </div>
                        }

                        <div className={styles.allEvents}>
                            {type === EventType.Fairs &&
                                <Link href={"/fairs"}>
                                    {t('allFairs')}
                                </Link>
                            }
                            {type === EventType.Exhibitions &&
                                <Link href={"/exhibitions"}>
                                    {t('allExhibitions')}
                                </Link>
                            }
                        </div>
                    </div>
                }
            </Layout>

            {showArtwork &&
                <ArtworkDetail handleArtworkChange={(value) => setArtwork(value)} artwork={showArtwork} otherArtworks={event?.Artworks ?? []} />
            }
        </>
    )
}

export default EventDetail