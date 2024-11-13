'use client'
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import {FunctionComponent, useMemo} from 'react';
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
    readonly galleryImage?: boolean
    readonly loading?: 'lazy' | 'eager'
}


const Figure: FunctionComponent<FigureProps> = (
    {image,
        alt,
        className,
        placeholderBlur = false,
        fullWidth = false,
        galleryImage = false,
        onLoad,
        loading
    }) => {

    const { innerWidth, innerHeight } = window;

    const [height, width] = useMemo(() => {
        const dimensions = getImageDimensions(image)
        return [dimensions.height, dimensions.width]
    }, [image])

    const sizes = useMemo(() => {
        if (fullWidth){
            return "100vw"
        } else if (galleryImage) {
            const ratio = width / height;
            if (innerWidth <= 767) {
                // height 70vh
                return `${innerHeight * 0.7 * ratio}px`
            } else {
                // height 50vh
                return `${innerHeight * 0.5 * ratio}px`
            }
        } else {
            return "(max-width: 767px) 50vw, (max-width: 1199px) 30vw, 300px"
        }
    }, [fullWidth, galleryImage, width, height, innerWidth, innerHeight])


    return (
        <Image
            loading={loading}
            onLoad={() => onLoad?.()}
            className={classNames([className])}
            sizes={sizes}
            width={width}
            height={height}
            src={builder.image(image).auto("format").url()}
            alt={alt ?? 'Alt is missing'}
            placeholder={placeholderBlur ? 'blur' : 'empty'}
            blurDataURL={builder.image(image).width(1).blur(50).url()}
        />
    )
}

export default Figure
