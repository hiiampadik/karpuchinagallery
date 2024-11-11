import React, {FunctionComponent, useState} from 'react';
import Link from 'next/link';
import {classNames} from '@/components/utils/classNames';
import figureStyles from '@/components/Sanity/Figure.module.scss';
import styles from '@/styles/artists.module.scss';
import Figure from '@/components/Sanity/Figure';
import {Artist} from '@/api/classes';

interface ArtistItemProps {
    readonly artist: Artist
    readonly firstNames?: string
    readonly lastName?: string
}
export const ArtistItem: FunctionComponent<ArtistItemProps> = ({artist, firstNames, lastName}) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <Link href="/artist/[slug]"
              as={`/artist/${artist.Slug}`}
              className={classNames([loaded ? figureStyles.loaded : figureStyles.loading, styles.artistContainer])}>
            <div className={styles.cover}>
                <Figure
                    image={artist.Cover}
                    alt={artist.Name.concat(" – Artist Cover Image")}
                    onLoad={() => setLoaded(true)}
                />
            </div>
            <h2>{firstNames}<br/>{lastName}</h2>
        </Link>
    )
}
