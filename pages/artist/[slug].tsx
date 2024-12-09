'use client'
import Layout from "../../components/Layout";
import React, {useMemo, useState} from "react";
import {GetStaticPropsContext} from 'next';
import {useFetchArtist, useFetchArtworks} from '@/api';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import styles from './index.module.scss'
import {useTranslations} from 'next-intl';
import BlockContent from '@/components/Sanity/BlockContent';
import EventItem from '@/components/Events/EventItem';
import Link from 'next/link';
import {Artwork, Event, EventType} from '@/api/classes';
import ArtworkDetail from '@/components/Artworks/ArtworkDetail';
import ArtworkItem from '@/components/Artworks/ArtworkItem';
import {useDisableScroll} from '@/components/utils/useDisableScroll';

export default function Artist() {
    const params = useParams()
    const router = useRouter();
    const {data: artist} = useFetchArtist(params?.slug as string, router.locale ?? 'cs')
    const {data: artworks} = useFetchArtworks(router.locale ?? 'cs')

    const t = useTranslations('Artist');

    const [showArtwork, setArtwork] = useState<number | null>(null)
    useDisableScroll(showArtwork !== null)

    const artistArtworks = useMemo(() => {
        if (artworks === null || artist === null){
            return []
        }
        return artworks.filter(artwork => artwork.Artist.Id === artist.Id && artwork.ShowInSelection)
    }, [artworks, artist])

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
            <Layout >
                  {artist &&
                      <div className={styles.artistContainer}>
                          <h1>{artist.Name}</h1>
                          <div className={styles.bioContainer}>
                              <h2>{t('bio')}</h2>
                              <div className={styles.bioContainerParagraphs}>
                                <BlockContent blocks={artist.Bio}/>
                              </div>
                          </div>

                          {artistArtworks.length > 0 &&
                              <div className={styles.selectedWorksContainer}>
                                  <h2>{t('selectedWorks')}</h2>
                                  <div className={styles.selectedWorks}>
                                      {artistArtworks.map((artwork, index) => (
                                          <ArtworkItem key={artwork.Id} artwork={artwork} onOpenArtwork={() => setArtwork(index)} />
                                      ))}
                                  </div>
                              </div>
                          }

                          {events.length > 0 &&
                              <div className={styles.exhibitionsContainer}>
                                  <h2>{t('exhibitions')}</h2>
                                  <div className={styles.exhibitions}>
                                      {events.map(event => (
                                          <EventItem event={event} key={event.Id} useH2={false} type={EventType.ArtistsEvents}/>
                                      ))}
                                  </div>
                              </div>
                          }

                          {(artist.SoloExhibitions || artist.GroupExhibitions ||  artist.Education || artist.Awards) &&
                              <div className={styles.artistDetailsContainer}>
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

                                  {((artist.Education && artist.Education.length > 0) || (artist.Awards && artist.Awards.length > 0)) &&
                                      <div className={styles.itemsFlexWrapper}>
                                          {artist.Education && artist.Education.length > 0 &&
                                              <div className={styles.itemsWrapper}>
                                                  <h2>{t('detailsEducation')}</h2>
                                                  <div className={styles.itemsContainer}>
                                                      {artist.Education.map(education => (
                                                          <div key={education.Id} className={styles.item}>
                                                              <div className={styles.year}>{education.Year}</div>
                                                              <div className={styles.title}><BlockContent blocks={education.Title}/>
                                                              </div>
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
                                      </div>
                                  }
                              </div>
                          }

                          <div className={styles.allArtists}>
                              <Link href={"/artists"}>
                                  {t('allArtists')}
                              </Link>
                          </div>
                      </div>
                  }
              </Layout>

            {showArtwork !== null &&
                <ArtworkDetail handleClose={() => setArtwork(null)} defaultArtwork={showArtwork} artworks={artistArtworks}/>
            }
        </>
    )
}

Artist.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

