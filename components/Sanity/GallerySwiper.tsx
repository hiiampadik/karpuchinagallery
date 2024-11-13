'use client'
import React, {FunctionComponent, useState} from "react";
import styles from './GalleryBlock.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import {FreeMode, Scrollbar} from 'swiper/modules';
import Figure from '@/components/Sanity/Figure';
import {Image} from '@/api/classes';
import figureStyles from '@/components/Sanity/Figure.module.scss';

// @refresh reset

interface GalleryProps {
  readonly images: Image[]
}


const GallerySwiper: FunctionComponent<GalleryProps> = ({images}) => {
    return (
        <>
            <Swiper
                // loop={true}
                modules={[FreeMode, Scrollbar]}
                grabCursor={true}
                // loopAdditionalSlides={2}
                freeMode={{enabled: true, momentum: false}}
                slidesPerView={'auto'}
                spaceBetween={'20'}
                className={styles.swiperWrapper}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image.Id} className={styles.swiperSlide}>
                        <GallerySlide image={image}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
)}

export default GallerySwiper


interface GallerySlideProps {
    readonly image: Image
}
const GallerySlide: FunctionComponent<GallerySlideProps> = ({image}) => {

    const [loaded, setLoaded] = useState(false)

    return (
        <Figure
            image={image.Image}
            alt={image.Alt}
            fullWidth={true}
            onLoad={() => setLoaded(true)}
            className={loaded ? figureStyles.loaded : figureStyles.loading}
        />
    )
}