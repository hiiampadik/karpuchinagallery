import {useCallback, useEffect, useState} from 'react';
import {debounce} from './debounce';

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    const updateSize = useCallback(
        debounce(
            () => setSize([window.innerWidth, window.innerHeight]),
            200,
        ),
        [],
    );

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

export const enum Breakpoint {
    XS_MAX = 575,
    SM_MIN = 576,
    SM_MAX = 767,
    MD_MIN = 768,
    MD_MAX = 991,
    LG_MIN = 992,
    LG_MAX = 1199,
    XL_MIN = 1200,
    XL_MAX = 1399,
    XXL_MIN = 1400,

    PATIENT_LIST_DOSES_MAX = 1499,
}
