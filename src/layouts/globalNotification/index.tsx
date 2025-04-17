import {useDispatch, useSelector} from "react-redux";
import {closeNotification, getAppState} from "@/store/slices/appStateSlice.tsx";
import styles from "./index.module.scss";
import {GLOBAL_NOTIFICATION_TYPES} from "@/constants/auxiliar.ts";
import AlertIcon from '@/assets/icons/error.svg?react';


export const GlobalNotification = () => {
    const appState = useSelector(getAppState);
    const dispatch = useDispatch();

    const getClass = (notification) => {
        switch (notification?.type){
            case GLOBAL_NOTIFICATION_TYPES.INFO: return styles.info;
            case GLOBAL_NOTIFICATION_TYPES.ERROR: return styles.error;
            case GLOBAL_NOTIFICATION_TYPES.SUCCESS: return styles.success;
            default: return styles.default;
        }
    }

    if(!appState.showNotification || !appState.showNotification.some((n) => n.active))
        return null;
    else
        return (
            <div className={styles.container}>
                {
                    appState.showNotification?.filter((n) => n.active)?.map((notification) => {
                        return (
                            <div className={`${styles.card} ${getClass(notification)}`} onClick={() => dispatch(closeNotification(notification.id))}>
                                <AlertIcon className={styles.icon}/>
                                <div>
                                    <h5>{notification.title}</h5>
                                    <p>{notification.message}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
}
