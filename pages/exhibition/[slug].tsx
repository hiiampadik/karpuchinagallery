import Layout from "../../components/Layout";
import React from "react";
import {GetStaticPropsContext} from 'next';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useFetchEventDetail} from '@/api/useSanityData';
import {useTranslations} from 'next-intl';
import styles from './index.module.scss';
import BlockContent from '@/components/Sanity/BlockContent';
import ExhibitionTitle from '@/components/utils/ExhibitionTitle';
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import {Event as ExhibitionClass} from '@/api/classes';
import GallerySwiper from '@/components/Sanity/GallerySwiper';

export default function Exhibition() {
    const params = useParams()
    const router = useRouter();
    const {data: exhibition} = useFetchEventDetail(params?.slug as string, router.locale ?? 'cs', 'exhibitions')
    const t = useTranslations('Exhibition');

    const getOnDisplay = (exhibition: ExhibitionClass) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0)

        const start = new Date(exhibition.StartDate);
        start.setHours(0, 0, 0, 0)

        const end = exhibition.EndDate ? new Date(exhibition.EndDate) : start;
        end.setHours(0, 0, 0, 0)

        return today >= start && today <= end;
    };

    return (
        <Layout >
            {exhibition &&
                <div className={styles.exhibitionContainer}>
                    <div className={styles.exhibitionFold}>
                        <ExhibitionTitle exhibition={exhibition} fromHomepage={false} onDisplay={getOnDisplay(exhibition)}/>
                        {exhibition.Gallery &&
                            <div className={styles.exhibitionGallery}>
                                <GallerySwiper images={exhibition.Gallery}></GallerySwiper>
                            </div>
                        }
                    </div>

                    <div className={styles.curatorsTextContainer}>
                        <h2>
                            {t('curatorsText')}
                        </h2>
                        <BlockContent blocks={exhibition.CuratorsText}/>
                    </div>

                    {exhibition.Documents &&
                        <div className={styles.documentsContainer}>
                            <h2>
                                {t('documents')}
                            </h2>
                            <div className={styles.documents}>
                                {exhibition.Documents.map(document => (
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

                    {exhibition.Artworks && exhibition.Artworks.length > 0 &&
                    <div className={styles.selectedWorksContainer}>
                        <h2>
                            {t('selectedWorks')}
                        </h2>
                        <div className={styles.selectedWorks}>
                            {exhibition.Artworks.map(artwork => (
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

