'use client'
import Layout from "../../components/Layout";
import React, {useMemo} from "react";
import {GetStaticPropsContext} from 'next';
import {useFetchArtist, useFetchArtworks, useFetchExhibitions} from '@/api/useSanityData';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import styles from './index.module.scss'
import {useTranslations} from 'next-intl';
import BlockContent from '@/components/Sanity/BlockContent';
import Figure from '@/components/Sanity/Figure';
import ExhibitionItem from '@/components/Layout/ExhibitionItem';
import Link from 'next/link';

export default function Artist() {
    const params = useParams()
    const router = useRouter();
    const {data: artist} = useFetchArtist(params?.slug as string, router.locale ?? 'cs')
    const {data: artworks} = useFetchArtworks(router.locale ?? 'cs')
    const {data: exhibitions} = useFetchExhibitions(router.locale ?? 'cs')
    const t = useTranslations('Artist');


    const artistArtworks = useMemo(() => {
        if (artworks === null || artist === null){
            return []
        }
        return artworks.filter(artwork => artwork.Artist.Id === artist.Id && artwork.ShowInSelection)
    }, [artworks, artist])


    const artistExhibitions = useMemo(() => {
        if (exhibitions === undefined || exhibitions === null || artist === null){
            return []
        }
        const filtered = exhibitions.filter(exhibition => {
            if (exhibition.Artists){
                for (const exhibitionArtist of exhibition.Artists){
                    if (exhibitionArtist.Id === artist.Id){
                        return true
                    }
                }
            }
            return false
        })

        return filtered.sort((a, b) => {
            const dateA = new Date(a.StartDate).getTime();
            const dateB = new Date(b.StartDate).getTime();
            return dateB - dateA;
        });
    }, [exhibitions, artist])
    return (
      <Layout >
          {artist &&
              <div className={styles.artistContainer}>
                  <h1>{artist.Name}</h1>
                  <div className={styles.bioContainer}>
                      <h2>{t('bio')}</h2>
                      <BlockContent blocks={artist.Bio}/>
                  </div>

                  {artistArtworks.length > 0 &&
                      <div className={styles.selectedWorksContainer}>
                          <h2>{t('selectedWorks')}</h2>
                          <div className={styles.selectedWorks}>
                              {artistArtworks.map(artwork => (
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

                  {artistExhibitions.length > 0 &&
                      <div className={styles.exhibitionsContainer}>
                          <h2>{t('exhibitions')}</h2>
                          <div className={styles.exhibitions}>
                              {artistExhibitions.map(exhibition => (
                                  <ExhibitionItem exhibition={exhibition} key={exhibition.Id} useH2={false}/>
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
    )
}

Artist.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

