import {useDispatch, useSelector} from "react-redux";
import {closeNotification, getAppState, setShowNotification} from "@/store/slices/appStateSlice.tsx";
import {GlobalNotification} from "@/types/businessTypes.tsx";
import {GLOBAL_NOTIFICATION_DEFAULT_TIME, GLOBAL_NOTIFICATION_TYPES} from "@/constants/auxiliar.ts";

const useNotification = () => {
    const dispatch = useDispatch();
    const appState = useSelector(getAppState);
    const globalNotify = (message: string, type?: string, timeInSeconds?: number) => {
        const randomId = appState.showNotification && appState.showNotification.length > 0 ? appState.showNotification[appState.showNotification.length - 1].id + 1 : 1;
        const newNotification: GlobalNotification = {
            id: randomId,
            message,
            type: type ?? GLOBAL_NOTIFICATION_TYPES.ERROR,
            active: true,
            timeInSecond: timeInSeconds ?? GLOBAL_NOTIFICATION_DEFAULT_TIME
        }
        dispatch(setShowNotification(newNotification));
        setTimeout(() => dispatch(closeNotification(randomId)), newNotification.timeInSecond * 1000);
    };

    return {
        globalNotify,
    };
};
export default useNotification;
