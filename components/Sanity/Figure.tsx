'use client'
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import {FunctionComponent, useMemo} from 'react';
import {getImageDimensions} from '@sanity/asset-utils';
import {classNames} from '@/components/utils/classNames';
import {useWindowSize} from '@/components/utils/useWindowSize';

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


    return (
        <Image
            loading={loading}
            onClick={onClick}
            onLoad={() => onLoad?.()}
            className={classNames([className])}
            sizes={resolvedSizes}
            width={width}
            height={height}
            src={builder.image(image).auto("format").quality(80).url()}
            alt={alt ?? 'Alt is missing'}
        />
    )
}

export default Figure
