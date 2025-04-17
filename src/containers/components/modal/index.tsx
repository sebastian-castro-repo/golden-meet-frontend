import {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import styles from "./index.module.scss";
import {ClickAwayListener} from "@mui/material";

export const Modal = (props :{
    isOpen: boolean,
    onClose: any,
    children: any,
    modalWidthClass?: any,
    verticalOpen?: boolean,
    horizontalOpen?: boolean,
    crossNoScroll?: boolean,
    crossOutside?: boolean,
    crossWhite?: boolean
}) => {
    const [mounted, setMounted] = useState(false);
    const [extraClass, setExtraClass] = useState<any>(undefined);

    useEffect(() => {
        setMounted(true);
        if (props.isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [props.isOpen]);

    useEffect(() => {
        if(props.isOpen)
            setTimeout(()=>
                setExtraClass({
                    content: ` ${styles.modalContentExpanded} ${props.modalWidthClass && props.modalWidthClass}`,
                    overlay: styles.modalOverlayExpanded
                }), 2
            )
        else
            setExtraClass({})
    }, [props.isOpen]);

    const handleOnClose = () => {
        setExtraClass({
            content: `${styles.modalContentHidden} ${props.modalWidthClass && props.modalWidthClass}`,
            overlay: `${styles.modalOverlayHidden} ${styles.modalOverlayExpanded}`
        })
        if(props.verticalOpen || props.horizontalOpen)
            setTimeout(() => props.onClose(false), 600)
        else
            props.onClose(false);
    }

    if (!mounted || !props.isOpen) return null;

    return ReactDOM.createPortal(
        <div className={`${styles.modalOverlay} ${extraClass?.overlay}`}>
            <ClickAwayListener onClickAway={handleOnClose}>
                <div id="content"
                     className={`
                        ${styles.modalContent}
                        ${extraClass?.content}
                        ${props.verticalOpen && styles.verticalEffect}
                        ${props.horizontalOpen && styles.horizontalEffect}
                        `}>
                    <button
                        className={`
                        ${styles.modalClose} 
                        ${props.crossNoScroll && styles.modalCloseNoScroll}
                        ${props.crossOutside && styles.crossOutside}
                        ${props.crossWhite && styles.crossWhite}
                        `}
                        onClick={handleOnClose}
                    >
                        &times;
                    </button>
                    {props.children}
                </div>
            </ClickAwayListener>
        </div>,
        document.getElementById('modal-root')
    );
};
