'use client'
import styles from '@/styles/eventdetails.module.scss';
import React, {FunctionComponent, useState} from 'react';
import {EventDetail as EventDetailClass, EventType} from '@/api/classes';
import Layout from '@/components/Layout';
import GallerySwiper from '@/components/Sanity/GallerySwiper';
import BlockContent from '@/components/Sanity/BlockContent';
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import EventTitle, {TimeContext} from '@/components/Events/EventTitle';
import ArtworkItem from '@/components/Artworks/ArtworkItem';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import ArtworkDetail from '@/components/Artworks/ArtworkDetail';
import {getImageDimensions} from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import client from '@/sanity/client';
import {useRouter} from 'next/router';
import {cs} from '@/public/locales/cs';
import {en} from '@/public/locales/en';

const builder = imageUrlBuilder(client);

interface EventDetailProps {
    readonly event: EventDetailClass
    readonly type: EventType
}
const EventDetail: FunctionComponent<EventDetailProps> = ({event, type}) => {
    const [showArtwork, setArtwork] = useState<number | null>(null)
    useDisableScroll(showArtwork !== null)

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

    const coverDimensions = getImageDimensions(event.Cover)

    return (
        <>
            <Layout
                title={event?.Title}
                image={{
                    url: builder.image(event.Cover).auto("format").width(480).url(),
                    height: coverDimensions.height.toString(),
                    width: coverDimensions.width.toString(),
                }}
            >
                {event &&
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
                                    {event.Artworks.map((artwork, index) => (
                                        <ArtworkItem key={artwork.Id} artwork={artwork} onOpenArtwork={() => setArtwork(index)} />
                                    ))}
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
                }
            </Layout>

            {showArtwork !== null && event?.Artworks &&
                <ArtworkDetail handleClose={() => setArtwork(null)} defaultArtwork={showArtwork} artworks={event.Artworks} />
            }
        </>
    )
}

export default EventDetail