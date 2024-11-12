'use client'
import React, {FunctionComponent, useEffect} from "react";
import styles from './GalleryBlock.module.scss'
import {useRouter} from 'next/router';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import {Pagination, Scrollbar, FreeMode} from 'swiper/modules';
import Figure from '@/components/Sanity/Figure';
import {Image} from '@/api/classes';

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
                {images.map((image) => {
                    return (
                        <SwiperSlide key={image.Id} className={styles.swiperSlide} >
                            <Figure
                                image={image.Image}
                                alt={image.Alt}
                                fullWidth={true}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
)}

export default GallerySwiper
