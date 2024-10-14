'use client'
import {FunctionComponent, useMemo} from 'react';
import {useTranslations} from 'next-intl';


interface FormatArtistsProps {
    readonly artists?: {Name: string }[] | null
}

// todo unbreakable pre a

const FormatArtists: FunctionComponent<FormatArtistsProps> = ({artists}) => {
    const t = useTranslations('Homepage');

    const formatedNames = useMemo(() => {
        if (!artists){
            return null
        }

        const names = artists.map((artist) => artist.Name);

        if (names.length === 1) {
            return names[0];
        } else if (names.length === 2) {
            return names.join(` ${t('and')} `);
        } else {
            return names.slice(0, -1).join(', ') + ` ${t('and')} ` + names[names.length - 1];
        }
    }, [artists, t])


    if (!formatedNames) {
        return <></>
    }
    return <>{t('by')} {formatedNames}</>
}

export default FormatArtists