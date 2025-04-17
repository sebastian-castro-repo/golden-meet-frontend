import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {GlobalNotification} from "@/types/businessTypes.tsx";

interface AppState {
    loading: boolean;
    loadingList: string[];
    loadingLabel: string|undefined;
    showNotification: GlobalNotification[]|undefined;
    googleMapsLoaded: boolean;
}

const initialState: AppState = {
    loading: false,
    loadingList: [],
    loadingLabel: undefined,
    showNotification: undefined,
    googleMapsLoaded: false,
};

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setLoadingLabel: (state, action: PayloadAction<string>) => {
            state.loadingLabel = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.loadingList.push(action.payload);
        },
        forceSetIsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setEndLoading: (state, action: PayloadAction<string>) => {
            const index = state.loadingList.indexOf(action.payload);
            if (index > -1) {
                state.loadingList.splice(index, 1);
            }
            if(state.loadingList.length === 0){
                state.loading = false;
                state.loadingLabel = undefined;
            }
        },
        setGoogleMapsLoaded: (state) => {
            state.googleMapsLoaded = true;
        },
        setShowNotification: (state, action: PayloadAction<GlobalNotification>) => {
            if(state.showNotification)
                state.showNotification.push(action.payload);
            else
                state.showNotification = [action.payload];
        },
        closeNotification: (state, action: PayloadAction<number>) => {
            state.showNotification = state.showNotification.filter((n) => n.id !== action.payload);
        },
    },
});
export const getAppState = (state: { appState: AppState }) => {
    return state.appState;
};

export const {
    setIsLoading,
    forceSetIsLoading,
    setEndLoading,
    setLoadingLabel,
    setGoogleMapsLoaded,
    setShowNotification,
    closeNotification
} = appStateSlice.actions;

export default appStateSlice.reducer;
