import Layout from "../../components/Layout";
import React from "react";
import {GetStaticPropsContext} from 'next';
import {useFetchArtist} from '@/api/useSanityData';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import styles from './index.module.scss'
import {useTranslations} from 'next-intl';
import BlockContent from '@/components/Sanity/BlockContent';

export default function Artist() {
    const params = useParams()
    const router = useRouter();
    const {data: artist} = useFetchArtist(params?.slug as string, router.locale ?? 'cs')
    const t = useTranslations('Artist');

    return (
      <Layout >
          {artist &&
              <div className={styles.artistContainer}>
                  <h1>{artist.Name}</h1>
                  {/*todo schovat pokud prazde*/}
                  <div className={styles.bioContainer}>
                      <h2>{t('bio')}</h2>
                      <BlockContent blocks={artist.Bio}/>
                  </div>
                  {/*todo schovat pokud prazde*/}
                  <div className={styles.selectedWorks}>
                      <h2>{t('selectedWorks')}</h2>
                  </div>
                  {/*todo schovat pokud prazde*/}
                  <div className={styles.exhibitions}>
                      <h2>{t('exhibitions')}</h2>
                  </div>
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

