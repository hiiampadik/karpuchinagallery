'use client'
import {FunctionComponent, useMemo} from 'react';
import {useTranslations} from 'next-intl';
import styles from '@/components/common.module.scss';
import {replaceSpaces} from '@/components/utils/replaceSpaces';
import {classNames} from '@/components/utils/classNames';


interface FormatArtistsProps {
    readonly artists: string[] | null
    readonly max3Artists?: boolean
    readonly conjunctions?: boolean
}

const FormatArtists: FunctionComponent<FormatArtistsProps> = ({artists, max3Artists=false, conjunctions=true}) => {
    const t = useTranslations('Homepage');

    const formatedNames = useMemo(() => {
        if (!artists) {
            return null;
        }
        if (artists.length === 1) {
            return replaceSpaces(artists[0]);
        } else if (artists.length === 2) {
            return (
                <>
                {replaceSpaces(artists[0])} <span className={classNames([styles.opacity])}>{replaceSpaces(t('and') + ' ')}</span>{replaceSpaces(artists[1])}
                </>
            );
        } else {
            if (max3Artists){
                return (
                    <>
                        {artists.slice(0, 2).map((name, index) => (
                            <span key={index}>
                                {replaceSpaces(name)}
                                {index < artists.length - 2 ? ', ' : ' '}
                            </span>
                        ))}
                        <span className={classNames([styles.opacity])}>{replaceSpaces(t('and') + ' ')}</span>
                        {replaceSpaces(artists[2])}
                        <span className={styles.gradient}></span>
                    </>
                );
            } else {
                return (
                    <>
                        {artists.slice(0, -1).map((name, index) => (
                            <span key={index}>
                                {replaceSpaces(name)}
                                {index < artists.length - 2 ? ', ' : ' '}
                            </span>
                        ))}
                        <span className={classNames([styles.opacity])}>{replaceSpaces(t('and') + ' ')}</span>
                        {replaceSpaces(artists[artists.length - 1])}
                    </>
                );
            }
        }
    }, [artists, t]);

    if (!formatedNames) {return <></>}

    return (
        <>
            <span className={classNames([styles.opacity])}>{t('by')}</span>
            {' '}
            {formatedNames}
        </>
    )

}

export default FormatArtists