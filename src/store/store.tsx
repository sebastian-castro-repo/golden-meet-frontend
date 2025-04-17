import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import globalConfigSlice from './slices/globalConfigSlice.tsx';
import {SESSION_SECRET, SESSION_NAME} from "@/constants/cookies.ts";
import appStateSlice from "./slices/appStateSlice.tsx";
import packageJson from '@/../package.json';

const encryptor = encryptTransform({
    secretKey: SESSION_SECRET,
    onError: (error) => console.error('Encryption error:', error),
});

const persistConfig = {
    key: `${SESSION_NAME}-${packageJson["cookie-version"]}`,
    storage,
    transforms: [encryptor],
    whitelist: ['globalConfig'],
};

const rootReducer = combineReducers({
    globalConfig: globalConfigSlice,
    appState: appStateSlice,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
