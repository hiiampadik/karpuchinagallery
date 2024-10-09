import Layout from "../../components/Layout";
import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchExhibition} from '@/api/useSanityData';
import {useTranslations} from 'next-intl';
import styles from './index.module.scss';
import BlockContent from '@/components/Sanity/BlockContent';
import ExhibitionTitle from '@/components/utils/ExhibitionTitle';
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';

export default function Exhibition() {
    const params = useParams()
    const router = useRouter();
    const {data: exhibition} = useFetchExhibition(params?.slug as string, router.locale ?? 'cs')
    const t = useTranslations('Exhibition');

    {/*todo current on display fetch*/}

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
                        <p className={styles.curatorName}>{exhibition.Curator}</p>
                    </div>

                    {exhibition.Document &&
                        <div className={styles.documentsContainer}>
                            <h2>
                                {t('documents')}
                            </h2>
                            <div className={styles.documents}>
                                <Link href={exhibition.Document.asset.url} download={true}>
                                    <Figure
                                        image={exhibition.Document.documentCover}
                                        alt={("Document Cover")}
                                    />
                                </Link>
                            </div>
                        </div>
                    }

                    <div className={styles.selectedWorksContainer}>
                        <h2>
                            {t('selectedWorks')}
                        </h2>
                        {/*todo*/}
                    </div>

                    <div className={styles.allExhibitions}>
                        <Link href={"/exhibitions"}>
                            {t('allExhibitions')}
                        </Link>
                    </div>
                </div>
            }
        </Layout>
    )
}

Exhibition.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

