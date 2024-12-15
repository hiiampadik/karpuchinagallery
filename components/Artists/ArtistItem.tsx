import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import styles from '@/styles/artists.module.scss';
import Figure from '@/components/Sanity/Figure';
import {Artist} from '@/api/classes';

interface ArtistItemProps {
    readonly artist: Artist
    readonly firstNames?: string
    readonly lastName?: string
}
export const ArtistItem: FunctionComponent<ArtistItemProps> = ({artist, firstNames, lastName}) => {
    return (
        <Link href="/artist/[slug]"
              as={`/artist/${artist.Slug}`}
              className={styles.artistContainer}>
            <div className={styles.cover}>
                <Figure
                    image={artist.Cover}
                    alt={artist.Name.concat(" – Artist Cover Image")}
                />
            </div>
            <h2>{firstNames}<br/>{lastName}</h2>
        </Link>
    )
}
