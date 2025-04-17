import styles from "./snackbar.module.scss";
import {SNACK_BAR_TYPES} from "@/constants/auxiliar.ts";
import AlertIcon from "@assets/icons/alert.svg?react";

export const Snackbar = (props: {content: any, type: string, icon?: any}) => {

    const getClass = () => {
        switch (props.type){
            case SNACK_BAR_TYPES.INFO: return styles.info;
            case SNACK_BAR_TYPES.ERROR: return styles.error;
            case SNACK_BAR_TYPES.SUCCESS: return styles.success;
            default: return styles.default;
        }
    }

    return (
        <div className={`${styles.container} ${getClass()}`}>
            {
                props.icon ?
                <img src={props.icon}/> : <AlertIcon className={styles.icon} />
            }
            {props.content}
        </div>
    );
};
