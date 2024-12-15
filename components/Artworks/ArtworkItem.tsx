import styles from '../Layout/index.module.scss'
import React, {FunctionComponent} from 'react';
import {Artwork} from '@/api/classes';
import Figure from '@/components/Sanity/Figure';
import {classNames} from '@/components/utils/classNames';

interface ArtworkItemProps {
    readonly artwork: Artwork;
    readonly onOpenArtwork: () => void
}

const ArtworkItem: FunctionComponent<ArtworkItemProps> = ({artwork, onOpenArtwork}) => {
    return (
        <div className={classNames([styles.work])}
             onClick={() => onOpenArtwork()}>
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
    )
}

export default ArtworkItem