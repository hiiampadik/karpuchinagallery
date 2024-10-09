import Layout from "../../components/Layout";
import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchExhibition} from '@/api/useSanityData';
import {useTranslations} from 'next-intl';
import styles from './index.module.scss';
import BlockContent from '@/components/Sanity/BlockContent';
import FormatArtists from '@/components/utils/FormatArtists';
import ExhibitionTitle from '@/components/utils/ExhibitionTitle';

export default function Exhibition() {
    const params = useParams()
    const router = useRouter();
    const {data: exhibition} = useFetchExhibition(params?.slug as string, router.locale ?? 'cs')
    const t = useTranslations('Exhibition');

    {/*todo current on display fetch*/}
    // todo disable color

    return (
        <Layout >
            {exhibition &&
                <div className={styles.exhibitionContainer}>
                    <ExhibitionTitle exhibition={exhibition} fromHomepage={false}/>
                    <div className={'gallery'}/>

                    <div className={styles.curatorsTextContainer}>
                        <h2>
                            {t('curatorsText')}
                        </h2>
                        <BlockContent blocks={exhibition.CuratorsText}/>
                        <br />
                        <p className={styles.curatorName}>{exhibition.Curator}</p>
                    </div>

                    <div className={styles.documentsContainer}>
                        <h2>
                            {t('documents')}
                        </h2>
                    </div>
                    <div className={styles.selectedWorksContainer}>
                        <h2>
                            {t('selectedWorks')}
                        </h2>
                    </div>

                    {/*todo all exhibition button*/}
                </div>
            }
                </Layout>
                )
}

Exhibition.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

