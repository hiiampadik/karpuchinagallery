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
                pagination={{
                    type: "fraction",
                }}
                loop={true}
                effect="fade"
                speed={300}
                modules={[Pagination, Scrollbar]}
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

                <PrevButton />
                <NextButton />

            </Swiper>
        </>
)}

export default GallerySwiper

const PrevButton: FunctionComponent = () => {
    const swiper = useSwiper();
    return (
        <button className={styles.prevButton}
                onClick={() => swiper?.slidePrev()}
        />
    )
}

const NextButton: FunctionComponent = () => {
    const swiper = useSwiper();
    const router = useRouter()

    useEffect(() => {
        if (swiper) {
            swiper.slideTo(0)
        }
    }, [swiper, router])
    return (
        <button className={styles.nextButton}
                onClick={() => swiper?.slideNext()}
        />
    )
}

