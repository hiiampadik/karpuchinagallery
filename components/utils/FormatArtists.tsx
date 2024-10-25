'use client'
import {FunctionComponent, useMemo} from 'react';
import {useTranslations} from 'next-intl';
import styles from '@/components/common.module.scss';
import {replaceSpaces} from '@/components/utils/replaceSpaces';
import {classNames} from '@/components/utils/classNames';


interface FormatArtistsProps {
    readonly artists?: {Name: string }[] | null
    readonly opacity?: boolean
    readonly fromHomepage?: boolean
}

const FormatArtists: FunctionComponent<FormatArtistsProps> = ({artists, opacity=false, fromHomepage=false}) => {
    const t = useTranslations('Homepage');

    const formatedNames = useMemo(() => {
        if (!artists) {
            return null;
        }

        const names = artists.map(artist => artist.Name);

        if (names.length === 1) {
            return replaceSpaces(names[0]);
        } else if (names.length === 2) {
            return (
                <>
                {replaceSpaces(names[0])} <span className={classNames([opacity && styles.opacity])}>{replaceSpaces(t('and'))}</span>{' '}{replaceSpaces(names[1])}
                </>
            );
        } else {
            return (
                <>
                    {names.slice(0, 2).map((name, index) => (
                        <span key={index}>
                            {replaceSpaces(name)}
                            {index < names.length - 2 ?  ', ' : ' '}
                        </span>
                    ))}
                    <span className={classNames([opacity && styles.opacity])}>{replaceSpaces(t('and'))}</span>{' '}{replaceSpaces(names[2])}
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