'use client'
import React, {FunctionComponent, useContext, useEffect} from "react";
import styles from './GalleryBlock.module.scss'
import {CursorContext, CursorSVG} from '@/components/CustomStyles';
import {useRouter} from 'next/router';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import {Pagination, Scrollbar} from 'swiper/modules';
import Figure from '@/utils/sanity/Figure';

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
    const {setCursorType} = useContext(CursorContext);
    return (
        <button className={styles.prevButton}
                onMouseEnter={() => setCursorType(CursorSVG.PREV)}
                onMouseLeave={() => setCursorType(undefined)}
            // ref={navigationPrevRef}
                onClick={() => swiper?.slidePrev()}
        />
    )
}

const NextButton: FunctionComponent = () => {
    const swiper = useSwiper();
    const {setCursorType} = useContext(CursorContext);
    const router = useRouter()

    useEffect(() => {
        if (swiper) {
            swiper.slideTo(0)
        }
    }, [swiper, router])
    return (
        <button className={styles.nextButton}
                onMouseEnter={() => setCursorType(CursorSVG.NEXT)}
                onMouseLeave={() => setCursorType(undefined)}
            // ref={navigationNextRef}
                onClick={() => swiper?.slideNext()}
        />
    )
}

