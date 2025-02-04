import React, {useMemo} from "react";
import styles from './index.module.scss'
import BlockContent from '@/components/Sanity/BlockContent';
import EventItem from '@/components/Events/EventItem';
import Link from 'next/link';
import {ArtistDetail as ArtistClass, Artwork, Event, EventType} from '@/api/classes';
import {ArtworkDetailWrapper} from '@/components/Artworks/ArtworkDetail';
import {useTranslations} from 'next-intl';

interface ArtistProps {
    readonly artist: ArtistClass;
    readonly artworks: Artwork[]
}

export default function ArtistDetail(props: ArtistProps) {
    const {artist, artworks} = props;

    const t = useTranslations('Artist');
    const sortEvents = (events: Event[]) => {
        return events.sort((a, b) => {
            const dateA = new Date(a.FromDate).getTime();
            const dateB = new Date(b.FromDate).getTime();
            return dateB - dateA;
        });
    }

    const events = useMemo(() => {
        if (artist === null || artist.Events === null){
            return []
        }
        return sortEvents(artist.Events)
    }, [artist])

    return (
        <>
            <article className={styles.artistContainer}>
                <h1>{artist.Name}</h1>
                <section className={styles.bioContainer}>
                    <h2>{t('bio')}</h2>
                    <div className={styles.bioContainerParagraphs}>
                        <BlockContent blocks={artist.Bio}/>
                    </div>
                </section>

                {artworks.length > 0 &&
                    <section className={styles.selectedWorksContainer}>
                        <h2>{t('selectedWorks')}</h2>
                        <div className={styles.selectedWorks}>
                            <ArtworkDetailWrapper artworks={artworks} />
                        </div>
                    </section>
                }

                {events.length > 0 &&
                    <section className={styles.exhibitionsContainer}>
                        <h2>{t('exhibitions')}</h2>
                        <div className={styles.exhibitions}>
                            {events.map(event => (
                                <EventItem event={event} key={event.Id} useH2={false} type={EventType.ArtistsEvents}/>
                            ))}
                        </div>
                    </section>
                }

                {(artist.SoloExhibitions || artist.GroupExhibitions ||  artist.Education || artist.Awards || artist.ArtFairs) &&
                    <section className={styles.artistDetailsContainer}>
                        {artist.SoloExhibitions && artist.SoloExhibitions.length > 0 &&
                            <div className={styles.itemsWrapper}>
                                <h2>{t('detailsSelectedSoloExhibitions')}</h2>
                                <div className={styles.itemsContainer}>
                                    {artist.SoloExhibitions.map(exhibition => (
                                        <div key={exhibition.Id} className={styles.item}>
                                            <div className={styles.year}>{exhibition.Year}</div>
                                            <div className={styles.title}><BlockContent blocks={exhibition.Title}/></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                        {artist.GroupExhibitions && artist.GroupExhibitions.length > 0 &&
                            <div className={styles.itemsWrapper}>
                                <h2>{t('detailsSelectedGroupExhibitions')}</h2>
                                <div className={styles.itemsContainer}>
                                    {artist.GroupExhibitions.map(exhibition => (
                                        <div key={exhibition.Id} className={styles.item}>
                                            <div className={styles.year}>{exhibition.Year}</div>
                                            <div className={styles.title}><BlockContent blocks={exhibition.Title}/></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                        {((artist.Education && artist.Education.length > 0) || (artist.Awards && artist.Awards.length > 0) || (artist.ArtFairs && artist.ArtFairs.length > 0)) &&
                            <div className={styles.itemsFlexWrapper}>
                                {artist.Education && artist.Education.length > 0 &&
                                    <div className={styles.itemsWrapper}>
                                        <h2>{t('detailsEducation')}</h2>
                                        <div className={styles.itemsContainer}>
                                            {artist.Education.map(education => (
                                                <div key={education.Id} className={education.Year.length > 4 ? styles.itemEducation : styles.item}>
                                                    <div className={styles.year}>{education.Year}</div>
                                                    <div className={styles.title}><BlockContent blocks={education.Title}/></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {artist.Awards && artist.Awards.length > 0 &&
                                    <div className={styles.itemsWrapper}>
                                        <h2>{t('detailsAwards')}</h2>
                                        <div className={styles.itemsContainer}>
                                            {artist.Awards.map(award => (
                                                <div key={award.Id} className={styles.item}>
                                                    <div className={styles.year}>{award.Year}</div>
                                                    <div className={styles.title}><BlockContent blocks={award.Title}/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {artist.ArtFairs && artist.ArtFairs.length > 0 &&
                                    <div className={styles.itemsWrapper}>
                                        <h2>{t('detailsFairs')}</h2>
                                        <div className={styles.itemsContainer}>
                                            {artist.ArtFairs.map(award => (
                                                <div key={award.Id} className={styles.item}>
                                                    <div className={styles.year}>{award.Year}</div>
                                                    <div className={styles.title}><BlockContent blocks={award.Title}/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </section>
                }

                <section className={styles.allArtists}>
                    <Link href={"/artists"} prefetch={false}>
                        {t('allArtists')}
                    </Link>
                </section>
            </article>
        </>
    )
}