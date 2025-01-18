'use client'
import React, {FunctionComponent, useMemo, useRef, useState} from "react";
import styles from './GalleryBlock.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";

import {FreeMode, Scrollbar, Mousewheel} from 'swiper/modules';
import Figure from '@/components/Sanity/Figure';
import {Image} from '@/api/classes';
import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';

// @refresh reset

interface GalleryProps {
  readonly images: Image[]
}


const GallerySwiper: FunctionComponent<GalleryProps> = ({images}) => {

    const [overlayGallery, setOverlayGallery] = useState<number | null>(null)
    useDisableScroll(overlayGallery !== null)

    const isDragging = useRef(false);

    const handleTouchMove = () => {
        isDragging.current = true;
    };

    const handleTouchEnd = () => {
        setTimeout(() => {
            isDragging.current = false;
        }, 0);
    };

    const handleClick = (index: number) => {
        if (!isDragging.current) {
            setOverlayGallery(index)
        }
    };

    return (
        <>
            <Swiper
                // loop={true}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                mousewheel={{forceToAxis: true}}
                grabCursor={true}
                loopAdditionalSlides={2}
                freeMode={{enabled: true, momentum: true}}
                slidesPerView={'auto'}
                spaceBetween={'20'}
                className={styles.swiperWrapper}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image.Id} className={styles.swiperSlide} onClick={() => handleClick(index)}>
                        <GallerySlide image={image} galleryImage={true}/>
                    </SwiperSlide>
                ))}
            </Swiper>

            {overlayGallery !== null &&
                <OverlayGallery
                    images={images}
                    activeImage={overlayGallery}
                    handleImageChange={value => setOverlayGallery(value)}/>
            }
        </>
)}

export default GallerySwiper

interface OverlayGalleryProps {
    readonly images: Image[]
    readonly activeImage: number
    readonly handleImageChange: (value: number | null ) => void
}
const OverlayGallery: FunctionComponent<OverlayGalleryProps> = ({images, activeImage, handleImageChange}) => {

    const currentImage = useMemo(() => {
        return images[activeImage]
    }, [activeImage, images])

    return (
        <Overlay handleClose={() => handleImageChange(null)}
                 isOpen={true}
                 scrollable={false}
                 className={styles.overlayGallery}
        >
                <button className={styles.prev} onClick={() => handleImageChange(activeImage === 0 ? images.length - 1 : activeImage - 1)}/>
                <button className={styles.next} onClick={() => handleImageChange((activeImage + 1) % images.length)}/>
                <GallerySlide image={currentImage} fullWidth={true}/>
        </Overlay>
    )
}

interface GallerySlideProps {
    readonly image: Image
    readonly galleryImage?: boolean
    readonly fullWidth?: boolean
}

const GallerySlide: FunctionComponent<GallerySlideProps> = ({image, galleryImage, fullWidth}) => {
    return (
        <Figure
            image={image.Image}
            alt={image.Alt}
            galleryImage={galleryImage}
            fullWidth={fullWidth}
        />
    )
}
