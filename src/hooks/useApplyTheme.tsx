import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {getActiveConfig} from "@/store/slices/globalConfigSlice.tsx";

export const useApplyTheme = () => {
    const activeConfig = useSelector(getActiveConfig);

    useEffect(() => {
        console.log(activeConfig)
        if(activeConfig){
            const isDark = activeConfig?.theme?.toLowerCase() === 'dark';
            document.documentElement.classList.toggle('dark', isDark);
        }
    }, [activeConfig]);
};