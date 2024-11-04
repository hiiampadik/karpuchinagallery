'use client'
import {FunctionComponent, PropsWithChildren} from 'react';
import {useTranslations} from 'next-intl';
import {Overlay2} from '@blueprintjs/core';
import styles from './index.module.scss';

interface OverlayProps {
    readonly isOpen?: boolean
    readonly handleClose: () => void
    readonly className?: string;
}

const Overlay: FunctionComponent<PropsWithChildren<OverlayProps>> = ({isOpen = true, handleClose, children, className}) => {
    const t = useTranslations('Overlay');

    return (
        <>
            {isOpen &&
                <Overlay2
                    isOpen={true}
                    onClose={() => handleClose()}
                    hasBackdrop={true}
                >
                    <div className={styles.container}>
                        <button className={styles.closeButton} onClick={() => handleClose()}>
                            {t('close')}
                        </button>
                        <div className={className}>
                            {children}
                        </div>
                    </div>
                </Overlay2>
            }
        </>
    )

}

export default Overlay