'use client'
import React, {FunctionComponent, useMemo, useState} from 'react';
import styles from './index.module.scss'
import {useTranslations} from 'next-intl';
import {Artwork} from '@/api/classes';
import BlockContent from '@/components/Sanity/BlockContent';
import Figure from '@/components/Sanity/Figure';

interface ArtworkDetailProps {
    readonly handleArtworkChange: (value: null | Artwork) => void
    readonly artwork: Artwork
    readonly otherArtworks: Artwork[]
}

const ArtworkDetail: FunctionComponent<ArtworkDetailProps> = ({handleArtworkChange, artwork, otherArtworks}) => {
    const t = useTranslations('Artwork');

    const [index, setIndex] = useState(0)

    const filteredArtworks = useMemo(() => {
        return otherArtworks.filter((v) => v.Id !== artwork.Id)
    }, [artwork, otherArtworks])

    return (
        <div className={styles.artworkDetailContainer}>
            <div className={styles.artworkHeader}>
                <p>
                    <span className={artwork.Gallery.length >= 10 ? styles.numberWide : styles.number}>{index + 1}</span>{' '}{t('of')}{' '}{artwork.Gallery.length}
                </p>
                <button className={styles.artworkClose} onClick={() => handleArtworkChange(null)}>
                    {t('close')}
                </button>
            </div>

            {filteredArtworks.length > 0 &&
                <div className={styles.artworkOtherWorks}>
                    {filteredArtworks.map(artwork => (
                        <Figure
                            key={artwork.Id}
                            onClick={() => {
                                setIndex(0)
                                handleArtworkChange(artwork)
                            }}
                            className={styles.otherArtworkCover}
                            image={artwork.Cover}
                            alt={artwork.Title.concat(" – Artwork Cover")}
                            sizes={'300px'}
                        />
                    ))}
                </div>
            }

            <div className={styles.artworkGallery}>
                <button className={styles.prev} onClick={() => setIndex(index === 0 ? artwork.Gallery.length - 1 : index - 1)}/>
                <button className={styles.next} onClick={() => setIndex((index + 1) % artwork.Gallery.length)}/>
                <Figure
                    image={artwork.Gallery[index].Image}
                    alt={artwork.Gallery[index].Alt}
                    fullWidth={true}
                />
            </div>

            <div className={styles.artworkDescription}>
                <p>{artwork.Artist.Name}</p>
                <p className={styles.title}>{artwork.Title}</p>
                {artwork.Year && <p>{artwork.Year}</p>}
                <BlockContent blocks={artwork.Info}/>
            </div>
        </div>
    );
};

export default ArtworkDetail;

