import axios from 'axios';
import {API_URL} from "@/api/routes.tsx";
import {store} from '@/store/store';
import {setEndLoading, setIsLoading} from "@/store/slices/appStateSlice.tsx";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    // 'Content-Type': 'application/json;charset=UTF-8',
    // 'Accept' : '*/*',
    // 'Accept-Encoding' : 'gzip, deflate, br',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    // 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    // 'Connection': 'keep-alive'
});
axiosInstance.interceptors.request.use((config) => {
    if(!config.headers || !config.headers["no-loader"])
        store.dispatch(setIsLoading(config.url));
    return config;
});
axiosInstance.interceptors.response.use(
    response => {
        setTimeout(() => {store.dispatch(setEndLoading(response.config.url))}, 500)
        return response;
    },
    (error) => {
        setTimeout(() => {store.dispatch(setEndLoading(error.config.url))}, 1500)
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'Error desconocido';
            return Promise.reject(new Error(message));
        }
        return Promise.reject(new Error('Error desconocido'));
    }
);

export default axiosInstance;
