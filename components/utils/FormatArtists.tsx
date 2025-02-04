import {FunctionComponent, useMemo} from 'react';
import styles from '@/components/common.module.scss';
import {replaceSpaces} from '@/components/utils/replaceSpaces';
import {classNames} from '@/components/utils/classNames';
import {useTranslations} from 'next-intl';


interface FormatArtistsProps {
    readonly artists: string[] | null
    readonly max3Artists?: boolean
    readonly showBy?: boolean
}

const FormatArtists: FunctionComponent<FormatArtistsProps> = ({artists, max3Artists=false, showBy=true}) => {
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
                // if total length === 3 , we add "and" before last name
                // otherwise we add comma
                return (
                    <>
                        {artists.slice(0, 2).map((name, index) => (
                            <span key={index}>
                            {replaceSpaces(name)}
                                {(artists.length > 3 || index < artists.length - 2) ? ', ' : ' '}
                        </span>
                        ))}
                        {artists.length === 3 &&
                            <span className={classNames([styles.opacity])}>{replaceSpaces(t('and') + ' ')}</span>
                        }
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
    }, [artists, max3Artists, t]);

    if (!formatedNames) {return <></>}

    return (
        <>
            {showBy &&
                <><span className={classNames([styles.opacity])}>{t('by')}</span>{' '}</>
            }
            {formatedNames}
        </>
    )

}

export default FormatArtists