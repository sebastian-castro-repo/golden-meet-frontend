import {CSSProperties, useEffect, useRef, useState} from 'react'
import styles from "./index.module.scss";
import {ClickAwayListener} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import useStringUtils from "@/hooks/useStringUtils.tsx";
import {createPortal} from "react-dom";


const displayToTypes = {
    TOP: "TOP",
    BOTTOM_LEFT: "BOTTOM_LEFT",
    RIGHT_TOP: "RIGHT_TOP",
    BOTTOM: "BOTTOM",
}
// const DropdownPortal = ({ children, isOpen, buttonRef, displayTo, customContentClass }) => {
//     const [position, setPosition] = useState({ top: 0, left: 0, width: "auto" });
//     const dropdownRef = useRef(null);
//
//     useEffect(() => {
//         if (isOpen && buttonRef.current) {
//             const rect = buttonRef.current.getBoundingClientRect();
//             let newTop = rect.bottom + window.scrollY;
//             let newLeft = rect.left + window.scrollX;
//
//             switch (displayTo) {
//                 case "TOP":
//                     newTop = rect.top + window.scrollY - (dropdownRef.current?.offsetHeight || 0);
//                     break;
//                 case "BOTTOM_LEFT":
//                     newLeft = rect.left + window.scrollX;
//                     break;
//                 case "RIGHT_TOP":
//                     newLeft = rect.right + window.scrollX;
//                     newTop = rect.top + window.scrollY - (dropdownRef.current?.offsetHeight - buttonRef.current?.offsetHeight || 0);
//                     break;
//                 default:
//                     break;
//             }
//
//             setPosition({
//                 top: newTop,
//                 left: newLeft,
//                 width: `${rect.width}px`
//             });
//         }
//     }, [isOpen, buttonRef, displayTo, dropdownRef]);
//
//     const getContentClass = () => {
//         switch (displayTo){
//             case displayToTypes.TOP:
//                 return styles.contentContainerTop;
//             case displayToTypes.BOTTOM_LEFT:
//                 return styles.contentContainerBottomLeft;
//             case displayToTypes.RIGHT_TOP:
//                 return styles.contentContainerRightTop;
//             default:
//                 return styles.contentContainer;
//         }
//     }
//
//     if (!isOpen) return null;
//
//     return createPortal(
//         <div
//             ref={dropdownRef}
//             className={`${getContentClass()} ${styles.dropdownPortal} ${customContentClass}`}
//             style={{
//                 top: position.top,
//                 left: position.left,
//                 minWidth: position.width,
//                 width: "max-content"
//             }}
//         >
//             {children}
//         </div>,
//         document.body
//     );
// };
const DropdownPortal = ({ children, isOpen, buttonRef, displayTo, customContentClass, onClose }) => {
    const [position, setPosition] = useState({ top: 0, left: 0, width: "auto" });
    const dropdownRef = useRef(null);
    const initialized = useRef(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const updatePosition = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        let newTop = rect.bottom + window.scrollY;
        let newLeft = rect.left + window.scrollX;

        switch (displayTo) {
            case "TOP":
                newTop = rect.top + window.scrollY - (dropdownRef.current?.offsetHeight || 0);
                break;
            case "BOTTOM_LEFT":
                newLeft = rect.left + window.scrollX;
                break;
            case "RIGHT_TOP":
                newLeft = rect.right + window.scrollX;
                newTop = rect.top + window.scrollY - (dropdownRef.current?.offsetHeight - buttonRef.current?.offsetHeight || 0);
                break;
            default:
                break;
        }

        setPosition({
            top: newTop,
            left: newLeft,
            width: `${rect.width}px`
        });

        if (initialized.current) {
            checkIfInsideScrollContainer();
        }
    };

    const checkIfInsideScrollContainer = () => {
        if (!dropdownRef.current || !buttonRef.current) return;

        const scrollableParent = buttonRef.current.closest('[data-scroll-container]') || window;
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const parentRect = scrollableParent === window
            ? { top: 0, bottom: window.innerHeight }
            : scrollableParent.getBoundingClientRect();

        if (dropdownRect.bottom > parentRect.bottom || dropdownRect.top < parentRect.top) {
            if (hasScrolled)
                onClose();
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        updatePosition();

        setTimeout(() => {
            initialized.current = true;
        }, 50);

        const handleScroll = () => {
            setHasScrolled(true);
            updatePosition();
        };
        const scrollableParent = buttonRef.current?.closest('[data-scroll-container]') || window;
        scrollableParent.addEventListener('scroll', handleScroll);

        return () => {
            scrollableParent.removeEventListener('scroll', updatePosition);
        };
    }, [isOpen, buttonRef, displayTo]);

    const getContentClass = () => {
        switch (displayTo){
            case displayToTypes.TOP:
                return styles.contentContainerTop;
            case displayToTypes.BOTTOM_LEFT:
                return styles.contentContainerBottomLeft;
            case displayToTypes.RIGHT_TOP:
                return styles.contentContainerRightTop;
            default:
                return styles.contentContainer;
        }
    }

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={dropdownRef}
            className={`${getContentClass()} ${styles.dropdownPortal} ${customContentClass}`}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                minWidth: position.width,
                width: "max-content",
                zIndex: 1000
            }}
        >
            {children}
        </div>,
        document.body
    );
};

export const DropDownCustom = (props:{
    value: any|undefined,
    onSelect: any,
    text?: string,
    lightText?: string,
    itemList: any,
    getName: any,
    getId: any,
    width?: string,
    danger?: boolean,
    defaultText?: any,
    unsavedChanges?: boolean,
    displayToBottomLeft?: boolean
    displayToRightTop?: boolean
    displayToTop?: boolean
    hideArrow?: boolean,
    textToLeft?: boolean,
    actionOpen?: any,
    backgroundContent?: any,
    small?: boolean,
    soft?: boolean,
    smallArrow?: boolean,
    customBtnClass?: any,
    searcher?: boolean,
    maxWidthClass?: any,
    itemCompleteAtSelect?: boolean
    customLabelClass?: any,
    customContentClass?: any,
    customPlaceHolderClass?: any,
    disabled?:boolean,
    normalizeText?: boolean
}) => {

    const [open, setOpen] = useState<boolean>(false);
    const [findText, setFindText] = useState<string|undefined>(undefined);
    const {firstCapitalLetter} = useStringUtils();
    const buttonRef = useRef(null);

    const handleSelect = (id) => {
        props.onSelect(id);
        setOpen(false);
    }

    useEffect(() => {
        if(props.actionOpen)
            props.actionOpen(open)
    }, [open]);

    const getDisplayToType = () => {
        if(props.displayToTop)
            return displayToTypes.TOP;
        if(props.displayToBottomLeft)
            return displayToTypes.BOTTOM_LEFT;
        if(props.displayToRightTop)
            return displayToTypes.RIGHT_TOP;
        return displayToTypes.BOTTOM;
    }
    const handleClick = () => {
        if (!open) {
            setTimeout(() => {
                setOpen(true);
            }, 10); // 🔥 Pequeño delay para asegurar que updatePosition se ejecuta antes
        } else {
            setOpen(false);
        }
    };
    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className={styles.container} style={props.width ? {width: `${props.width}`} : undefined}>
                {
                    props.text &&
                    <p className={`
                        ${styles.topLabel}
                        titleGrayGlobal
                        ${props.danger && styles.dangerTitle}
                        `}>
                        {props.text}
                    </p>}
                <button
                    ref={buttonRef}
                    className={`
                    ${styles.btn}
                    ${open && styles.btnOpen}
                    ${props.disabled && styles.btnDisabled}
                    ${props.unsavedChanges && styles.btnUnsavedChanges}
                    ${props.small && styles.btnSmall}
                    ${props.soft && styles.btnSoft}
                    ${props.customBtnClass && props.customBtnClass}
                    
                    `}
                    onClick={() => !props.disabled && handleClick()}
                    style={{
                        background: `${props.itemList?.find((b) => props.getId(b) === props.value)?.color ?? ""}`,
                        color: `${props.itemList?.find((b) => props.getId(b) === props.value)?.textColor ?? ""}`,
                        width: `${props.width ?? "max-content"}`,
                        textAlign: `${props.textToLeft ? "left" : "center"}`
                } as CSSProperties}
                >
                    {props.lightText && <span className={styles.lightText}>{props.lightText}</span>}
                    <p className={`
                    ${props.maxWidthClass && props.maxWidthClass}
                    ${props.customLabelClass && props.customLabelClass}
                    ${props.customPlaceHolderClass && !props.value && props.value !== 0 && props.customPlaceHolderClass}
                    `}>
                        {
                            props.itemList?.find((item) => props.getId(item) === props.value) ?
                                (
                                    props.normalizeText ?
                                        firstCapitalLetter(props.getName(props.itemList?.find((item) => props.getId(item) === props.value))) :
                                        props.getName(props.itemList?.find((item) => props.getId(item) === props.value))
                                ) :
                                (props.defaultText ? props.defaultText : "Seleccione una opción")}
                    </p>
                    <KeyboardArrowDownOutlinedIcon
                        style={{
                            color: `${props.itemList?.find((b) => props.getId(b) === props.value)?.textColor}`
                        }}
                        className={`
                        ${styles.btnArrow}
                        ${props.smallArrow && styles.btnArrowSmall}
                        ${props.displayToRightTop && styles.btnArrowToRight}
                        ${open && (props.displayToRightTop ? styles.btnArrowActiveRight : styles.btnArrowActive)}
                        ${props.hideArrow && styles.hide}
                        `}
                    />
                </button>
                <DropdownPortal isOpen={open} buttonRef={buttonRef} displayTo={getDisplayToType()} customContentClass={props.customContentClass} onClose={() => setOpen(false)}>
                    {/*<div*/}
                    {/*    className={`*/}
                    {/*    ${!open && styles.contentContainerHidden}*/}
                    {/*    ${props.customContentClass && props.customContentClass}*/}
                    {/*    `}*/}
                    {/*    style={{*/}
                    {/*        width: `${props.width ? props.width : "max-content"}`,*/}
                    {/*        background: `${props.backgroundContent ? props.backgroundContent : "white"}`*/}
                    {/*    }}*/}
                    {/*>*/}
                        {
                            props.searcher &&
                            <input
                                id={"searchInput"}
                                className={styles.searcher}
                                value={findText}
                                placeholder={"Buscar..."}
                                onChange={(e) => setFindText(e?.target?.value?.toString().toLowerCase())}
                            />
                        }
                        {
                            props.itemList?.filter((i) => !findText || props.getName(i).toString().toLowerCase().trim().includes(findText.trim()))?.length > 0 ?
                            props.itemList?.filter((i) => !findText || props.getName(i).toString().toLowerCase().trim().includes(findText.trim()))?.map((item, i) => {
                                return(
                                    <div
                                        key={`ddl-${props.getName(item)}-${i}`}
                                    >
                                        <p
                                            className={`${styles.item}`}
                                            onClick={() => {
                                                handleSelect(props.itemCompleteAtSelect ? item : props.getId(item));
                                                setFindText(undefined);
                                                const refSearch = document.getElementById("searchInput") as HTMLInputElement;
                                                if(refSearch)
                                                    refSearch.value = "";
                                            }}
                                        >{props.normalizeText ? firstCapitalLetter(props.getName(item)) : props.getName(item)}</p>
                                        <div className={`${styles.itemDivider}`} hidden={i === props.itemList?.length - 1}/>
                                    </div>
                                    )
                            }) :
                                <>
                                    <p
                                        className={`${styles.noResults}`}
                                    >Sin resultados</p>
                                </>
                        }
                    {/*</div>*/}
                </DropdownPortal>
                {/*<button className={`${styles.btnArrow} ${open && styles.btnArrowActive}`}><KeyboardArrowDownOutlinedIcon /></button>*/}
            </div>
        </ClickAwayListener>
    )
}