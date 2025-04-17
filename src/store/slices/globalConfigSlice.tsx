import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserSession} from "@/types/authTypes.tsx";
import {GUEST_USER_LABEL} from "@/constants/auxiliar.ts";

export interface Config {
    theme: string,
    lang: string,
}

interface GlobalConfigState {
    loggedUser: Partial<UserSession> & { id: number };
    configs: { [key: string]: Config };
}

export const initialConfigState: Config = {
    theme: "DARK",
    lang: "es"
};

const initialState: GlobalConfigState = {
    loggedUser: {id: GUEST_USER_LABEL},
    configs: {
        [GUEST_USER_LABEL]: initialConfigState,
    },
};

const globalConfigSlice = createSlice({
    name: 'globalConfig',
    initialState,
    reducers: {
        setConfig: (state, action: PayloadAction<Partial<Config>>) => {
            const updatedConfig = action.payload;
            state.configs[state.loggedUser?.id] = {
                ...state.configs[state.loggedUser?.id],
                ...updatedConfig,
            };
        },
        setLoggedUser: (state, action: PayloadAction<UserSession>) => {
            const user = action.payload;

            if (!state.configs[user?.id]) {
                state.configs[user?.id] = initialConfigState;
            }

            state.loggedUser = user;
        },
        setLoggedUserPartial: (state, action: PayloadAction<Partial<UserSession>>) => {
            if (!state.loggedUser) return;

            Object.assign(state.loggedUser, action.payload);
        },
        doLogout: (state) => {
            state.loggedUser = {id: GUEST_USER_LABEL};
        },
    },
});

export const getLoggedUser = (state: { globalConfig: GlobalConfigState }) => {
    return state.globalConfig.loggedUser;
};

export const getActiveConfig = (state: { globalConfig: GlobalConfigState }) => {
    return state.globalConfig.configs[state.globalConfig.loggedUser?.id];
};

export const {
    setConfig,
    setLoggedUser,
    doLogout,
    setLoggedUserPartial,
} = globalConfigSlice.actions;

export default globalConfigSlice.reducer;
