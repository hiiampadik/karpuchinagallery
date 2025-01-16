'use client'
import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import styles from './index.module.scss'
import {Artwork} from '@/api/classes';
import BlockContent from '@/components/Sanity/BlockContent';
import Figure from '@/components/Sanity/Figure';
import {classNames} from '@/components/utils/classNames';
import {useRouter} from 'next/router';
import {cs} from '@/public/locales/cs';
import {en} from '@/public/locales/en';

interface ArtworkDetailProps {
    readonly handleClose: () => void
    readonly defaultArtwork: number
    readonly artworks: Artwork[]
}

const ArtworkDetail: FunctionComponent<ArtworkDetailProps> = ({handleClose, defaultArtwork, artworks}) => {
    const router = useRouter();
    const t = router.locale === "cs" ? cs.Artwork : en.Artwork;

    const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(defaultArtwork)

    const selectedArtwork = useMemo(() => {
        return artworks[selectedArtworkIndex]
    }, [artworks, selectedArtworkIndex])

    const [selectedArtworkFigure, setSelectedArtworkFigure] = useState(0)

    const [zoom, setZoom] = useState(false);

    useEffect(() => {
        setSelectedArtworkFigure(0)
    }, [selectedArtwork]);



    return (
        <section className={styles.artworkDetailContainer}>
            <div className={styles.artworkHeader}>
                <p>
                    {selectedArtwork.Gallery.length > 1 &&
                        <><span className={selectedArtwork.Gallery.length >= 10 ? styles.numberWide : styles.number}>{selectedArtworkFigure + 1}</span>{' '}{t.of}{' '}{selectedArtwork.Gallery.length}</>
                    }
                </p>
                <button className={styles.artworkClose} onClick={() => handleClose()}>
                    {t.close}
                </button>
            </div>

            {selectedArtwork.Gallery.length > 1 &&
                <div className={styles.artworkOtherWorks}>
                    {selectedArtwork.Gallery.map((image, index) => (
                        <Figure
                            key={image.Id}
                            onClick={() => setSelectedArtworkFigure(index)}
                            className={styles.otherArtworkCover}
                            image={image.Image}
                            alt={image.Alt?.concat(" – Artwork Cover")}
                            sizes={'300px'}
                        />
                    ))}
                </div>
            }

            <div className={classNames([styles.artworkGallery, selectedArtwork.Gallery.length === 1 && styles.artworkWithoutGallery, zoom && styles.artworkGalleryZoom])}>
                <button className={styles.prev}
                        onClick={() => {
                            setSelectedArtworkFigure(0)
                            setSelectedArtworkIndex(selectedArtworkIndex === 0 ? artworks.length - 1 : selectedArtworkIndex - 1)
                        }}/>
                <button className={styles.next}
                        onClick={() => {
                            setSelectedArtworkFigure(0)
                            setSelectedArtworkIndex((selectedArtworkIndex + 1) % artworks.length)
                        }}/>
                <button className={classNames([!zoom ? styles.zoomIn : styles.zoomOut])}
                        onClick={() => setZoom(e => !e)}
                />
                <div className={classNames([styles.imageContainer])}>
                    <Figure
                        image={selectedArtwork.Gallery[selectedArtworkFigure].Image}
                        alt={selectedArtwork.Gallery[selectedArtworkFigure].Alt}
                        fullWidth={true}
                    />

                    {!zoom &&
                        <div className={styles.artworkDescription}>
                            <p>{selectedArtwork.Artist.Name}</p>
                            <p className={styles.title}>{selectedArtwork.Title}</p>
                            {selectedArtwork.Year && <p>{selectedArtwork.Year}</p>}
                            <BlockContent blocks={selectedArtwork.Info}/>
                        </div>
                    }
                </div>


            </div>


        </section>
    );
};

export default ArtworkDetail;

