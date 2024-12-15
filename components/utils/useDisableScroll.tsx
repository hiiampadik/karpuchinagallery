'use client'
import {useEffect} from 'react';

export const useDisableScroll = (disable: boolean) => {
    useEffect(() => {
        if (!disable){
            const scrollY = document.body.style.top
            document.body.style.position = ''
            document.body.style.top = ''
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        } else {
            document.body.style.top = `-${window.scrollY}px`
            document.body.style.position = 'fixed'
        }
    }, [disable])
}
