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
import Link from 'next/link';
import FormatArtists from '@/components/utils/FormatArtists';

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
        return artworks.filter(artwork => artwork.ArtistsId === artist.Id && artwork.ShowInSelection)

        // todo year sort
    }, [artworks, artist])


    const artistExhibitions = useMemo(() => {
        if (exhibitions === undefined || exhibitions === null || artist === null){
            return []
        }
        return exhibitions.filter(exhibition => {
            if (exhibition.Artists){
                for (const exhibitionArtist of exhibition.Artists){
                    if (exhibitionArtist.Id === artist.Id){
                        return true
                    }
                }
            }
            return false
        })

        // todo year sort
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
                                        {artwork.Title}
                                      </h3>
                                  </div>
                              ))}
                          </div>
                      </div>
                  }

                  {/*todo schovat pokud prazde*/}
                  {artistExhibitions.length > 0 &&
                      <div className={styles.exhibitionsContainer}>
                          <h2>{t('exhibitions')}</h2>
                          <div className={styles.exhibitions}>
                              {artistExhibitions.map(exhibition => (
                                  <Link key={exhibition.Id}
                                        href="/exhibition/[slug]"
                                        as={`/exhibition/${exhibition.Slug}`}
                                        className={styles.exhibition}
                                  >
                                      <div className={styles.cover}>
                                          <Figure
                                              image={exhibition.Cover}
                                              alt={exhibition.Title.concat(" – Exhibition Cover")}
                                          />
                                      </div>
                                      <h3>
                                          <span>{exhibition.Title}</span>
                                          {' '}<FormatArtists artists={exhibition.Artists}/>
                                      </h3>
                                  </Link>
                              ))}
                          </div>
                      </div>
                  }
                  <div className={styles.artistDetailsContainer}>

                      <h2>{t('detailsSelectedGroupExhibitions')}</h2>
                      <h2>{t('detailsSelectedSoloExhibitions')}</h2>
                      <h2>{t('detailsEducation')}</h2>
                      <h2>{t('detailsAwards')}</h2>
                  </div>
                      </div>
                  }
              </Layout>
              )
          }

          Artist.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

