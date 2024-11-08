'use client'
import {FunctionComponent, useMemo} from 'react';
import {useTranslations} from 'next-intl';
import styles from '@/components/common.module.scss';
import {replaceSpaces} from '@/components/utils/replaceSpaces';
import {classNames} from '@/components/utils/classNames';


interface FormatArtistsProps {
    readonly artists: string[] | null
    readonly opacity?: boolean
    readonly fromHomepage?: boolean
}

const FormatArtists: FunctionComponent<FormatArtistsProps> = ({artists, opacity=false, fromHomepage=false}) => {
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
                {replaceSpaces(artists[0])} <span className={classNames([opacity && styles.opacity])}>{replaceSpaces(t('and') + ' ' + artists[1])}</span>
                </>
            );
        } else {
            return (
                <>
                    {artists.slice(0, 2).map((name, index) => (
                        <span key={index}>
                            {replaceSpaces(name)}
                            {index < artists.length - 2 ? ', ' : ' '}
                        </span>
                    ))}
                    <span className={classNames([opacity && styles.opacity])}>{replaceSpaces(t('and') + ' ' + artists[2])}</span>
                    {fromHomepage && <span className={styles.gradient}></span>}
                </>
            );
        }
    }, [artists, t]);


    if (!formatedNames) {
        return <></>
    }

    return (
        <>
            <span className={classNames([opacity && styles.opacity])}>{t('by')}</span>
            {' '}
            {formatedNames}
        </>
    )

}

export default FormatArtists