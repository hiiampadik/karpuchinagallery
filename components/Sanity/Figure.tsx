'use client'
import imageUrlBuilder from "@sanity/image-url";
import {FunctionComponent, useEffect, useMemo, useRef} from 'react';
import {getImageDimensions} from '@sanity/asset-utils';
import {classNames} from '@/components/utils/classNames';
import client from '@/sanity/client';

const builder = imageUrlBuilder(client);

interface FigureProps {
    readonly image: {_type: 'image', asset: {_ref: string, _type: "reference"}};
    readonly alt?: string | null
    readonly className?: string
    readonly onLoad?: () => void
    readonly onClick?: () => void
    readonly fullWidth?: boolean
    readonly galleryImage?: boolean
    readonly loading?: 'lazy' | 'eager'
    readonly sizes?: string
}


const Figure: FunctionComponent<FigureProps> = (
    {image,
        alt,
        className,
        fullWidth = false,
        galleryImage = false,
        sizes,
        onLoad,
        onClick,
        loading
    }) => {

    const [height, width] = useMemo(() => {
        const dimensions = getImageDimensions(image)
        return [dimensions.height, dimensions.width]
    }, [image])

    const resolvedSizes = useMemo(() => {
        if (sizes){
            return sizes
        } else if (fullWidth){
            return "100vw"
        } else if (galleryImage) {
            const ratio = width / height;
            // height 50vh
            return `calc(50vh * ${ratio})`
        } else {
            return "(max-width: 767px) 50vw, (max-width: 1199px) 30vw, 300px"
        }
    }, [image, fullWidth, galleryImage, width, height])

    const imgRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
        if (imgRef.current?.complete) {
            onLoad?.();
        }
    }, [onLoad]);

    return (
        <img
            ref={imgRef}
            loading={loading}
            onClick={onClick}
            onLoad={() => onLoad?.()}
            className={classNames([className])}
            alt={alt ?? 'Alt is missing'}

            sizes={resolvedSizes}
            width={width}
            height={height}
            srcSet={`
                      ${builder
                .image(image)
                .auto("format")
                .width(480)
                .url()} 480w,
                      ${builder
                .image(image)
                .auto("format")
                .width(800)
                .url()} 800w,
                      ${builder
                .image(image)
                .auto("format")
                .width(1300)
                .url()} 1300w,
                      ${builder
                .image(image)
                .auto("format")
                .width(1600)
                .url()} 1600w,
                      ${builder
                .image(image)
                .auto("format")
                .width(2000)
                .url()} 2000w,
                    `}

        />
    )
}

export default Figure
