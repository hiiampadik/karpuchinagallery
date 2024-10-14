import styles from './index.module.scss'
import Link from 'next/link';
import React, {FunctionComponent} from 'react';
import {Exhibition} from '@/api/classes';
import FormatArtists from '@/components/utils/FormatArtists';
import Figure from '@/components/Sanity/Figure';

interface ExhibitionItemProps {
    readonly exhibition: Exhibition;
    readonly useH2: boolean
}

const ExhibitionItem: FunctionComponent<ExhibitionItemProps> = ({exhibition, useH2}) => {
    return (
        <Link href="/exhibition/[slug]"
              as={`/exhibition/${exhibition.Slug}`}
              key={exhibition.Slug}
              className={styles.exhibitionContainer}>
            <div className={styles.cover}>
                <Figure
                    image={exhibition.Cover}
                    alt={exhibition.Title.concat(" – Exhibition Cover Image")}
                />
            </div>
            {useH2 ?
                <h2>
                    <span>{exhibition.Title}</span>
                    {' '}<FormatArtists artists={exhibition.Artists}/>
                </h2>
                :
                <h3>
                    <span>{exhibition.Title}</span>
                    {' '}<FormatArtists artists={exhibition.Artists}/>
                </h3>
            }
        </Link>
    )
}

export default ExhibitionItem