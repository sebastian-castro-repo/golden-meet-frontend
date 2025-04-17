import {AUTH_ROUTES} from "@/api/routes.tsx";
import axios from '../axiosConfig';
import {LoginRequest} from "@/types/authTypes.tsx";

export const validate = async (token: string) => {
    const url = AUTH_ROUTES.validate();
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const login = async (loginRequest: LoginRequest) => {
    const url = AUTH_ROUTES.login();
    const response = await axios.post(url, loginRequest);
    return response.data;
};