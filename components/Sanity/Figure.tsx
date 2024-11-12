'use client'
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import {FunctionComponent} from 'react';
import {getImageDimensions} from '@sanity/asset-utils';
import {classNames} from '@/components/utils/classNames';

const builder = imageUrlBuilder(client);

interface FigureProps {
    readonly image: any;
    readonly alt?: string | null
    readonly className?: string
    readonly placeholderBlur?: boolean
    readonly onLoad?: () => void
    readonly fullWidth?: boolean
    readonly loading?: 'lazy' | 'eager'
}


const Figure: FunctionComponent<FigureProps> = (
    {image,
        alt,
        className,
        placeholderBlur = false,
        fullWidth = false,
        onLoad,
        loading
    }) => {

    const WIDTH = 10
    const getHeight = () => {
        const multiply = getImageDimensions(image).width / WIDTH;
        return getImageDimensions(image).height / multiply
    }

    return (
        <Image
            loading={loading}
            onLoad={() => onLoad?.()}
            className={classNames([className])}
            sizes={fullWidth ? "100vw" : "(max-width: 767px) 50vw, (max-width: 1199px) 30vw, 300px"}
            width={WIDTH}
            height={getHeight()}
            src={builder.image(image).auto("format").url()}
            alt={alt ?? 'Alt is missing'}
            placeholder={placeholderBlur ? 'blur' : 'empty'}
            blurDataURL={builder.image(image).width(1).blur(50).url()}
        />
    )
}

export default Figure