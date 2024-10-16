'use client'
import React, {FunctionComponent, useEffect} from "react";
import styles from './GalleryBlock.module.scss'
import {useRouter} from 'next/router';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import {Pagination, Scrollbar} from 'swiper/modules';
import Figure from '@/components/Sanity/Figure';

// @refresh reset

interface GalleryProps {
  readonly images: any[]
}


const GallerySwiper: FunctionComponent<GalleryProps> = ({images}) => {
    return (
        <>
            <Swiper
                loop={true}
                // modules={[Pagination, Scrollbar]}
                grabCursor={true}
                loopAdditionalSlides={2}
                freeMode={{enabled: true, momentum: false}}
                className={styles.swiperNavigation}
            >
                {images.map((el) => {
                    return (
                        <SwiperSlide key={el._key} className={styles.swiperSlide}>
                            <Figure
                                image={el.asset}
                                alt={el.caption}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
)}

export default GallerySwiper
