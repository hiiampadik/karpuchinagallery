import styles from '../Layout/index.module.scss'
import React, {FunctionComponent, useState} from 'react';
import {Artwork} from '@/api/classes';
import Figure from '@/components/Sanity/Figure';
import {classNames} from '@/components/utils/classNames';
import figureStyles from '@/components/Sanity/Figure.module.scss';

interface ArtworkItemProps {
    readonly artwork: Artwork;
    readonly onOpenArtwork: (artwork: Artwork) => void
}

const ArtworkItem: FunctionComponent<ArtworkItemProps> = ({artwork, onOpenArtwork}) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className={classNames([styles.work, loaded ? figureStyles.loaded : figureStyles.loading, ])}
             onClick={() => onOpenArtwork(artwork)}>
            <div className={styles.cover}>
                <Figure
                    onLoad={() => setLoaded(true)}
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