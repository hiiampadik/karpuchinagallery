'use client'

import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import {FunctionComponent, useState} from 'react';
import { getImageDimensions } from '@sanity/asset-utils';
import styles from './Figure.module.scss';
import {classNames} from '@/components/utils/classNames';

const builder = imageUrlBuilder(client);

interface FigureProps {
    readonly image: any;
    readonly alt?: string
    readonly className?: string
    readonly placeholderBlur?: boolean
}


const Figure: FunctionComponent<FigureProps> = ({image, alt, className, placeholderBlur = false}) => {
    const WIDTH = 10
    const getHeight = () => {
        const multiply = getImageDimensions(image).width / WIDTH;
        return getImageDimensions(image).height / multiply
    }

    const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <Image
      onLoad={() => setLoaded(true)}
      className={classNames([loaded ? styles.loaded : styles.loading, className])}
      sizes="(max-width: 1024px) 110vw, 55vw"
      width={WIDTH}
      height={getHeight()}
      src={builder.image(image).auto("format").url()}
      alt={alt ?? ''}
      placeholder={placeholderBlur ? 'blur' : 'empty'}
      blurDataURL={builder.image(image).width(1).blur(50).url()}


    />
  )
}

export default Figure