'use client'
import imageUrlBuilder from "@sanity/image-url";
import {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {getImageDimensions} from '@sanity/asset-utils';
import {classNames} from '@/components/utils/classNames';
import client from '@/sanity/client';
import styles from './Figure.module.scss'

const builder = imageUrlBuilder(client);

interface FigureProps {
    readonly image: {_type: 'image', asset: {_ref: string, _type: "reference"}};
    readonly alt?: string | null
    readonly className?: string
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
        onClick,
        loading
    }) => {

    const [loaded, setLoaded] = useState(false)
    const [ref, setRef] = useState(image.asset._ref)

    const [height, width] = useMemo(() => {
        if (image.asset._ref !== ref){
            setRef(image.asset._ref)
            setLoaded(false)
        }
        const dimensions = getImageDimensions(image)
        return [dimensions.height, dimensions.width]
    }, [image, ref])

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
    }, [sizes, fullWidth, galleryImage, width, height])

    const imgRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
        if (imgRef.current?.complete) {
            setLoaded(true)
        }
    }, []);


    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            ref={imgRef}
            loading={loading}
            onClick={onClick}
            onLoad={() => setLoaded(true)}
            className={classNames([className, loaded ? styles.loaded : styles.loading])}
            alt={alt ?? 'Alt is missing'}

            sizes={resolvedSizes}
            width={width}
            height={height}
            srcSet={`
                      ${builder
                .image(image)
                .auto("format")
                .width(480)
                .quality(70)
                .url()} 480w,
                      ${builder
                .image(image)
                .auto("format")
                .width(800)
                .quality(70)
                .url()} 800w,
                      ${builder
                .image(image)
                .auto("format")
                .width(1300)
                .quality(70)
                .url()} 1300w,
                      ${builder
                .image(image)
                .auto("format")
                .width(1600)
                .quality(70)
                .url()} 1600w,
                      ${builder
                .image(image)
                .auto("format")
                .width(2000)
                .quality(70)
                .url()} 2000w,
                    `}

        />
    )
}

export default Figure
