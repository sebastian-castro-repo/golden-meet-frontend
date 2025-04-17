import { useQuery, useMutation } from '@tanstack/react-query';
import {LoginRequest, UserSession} from "@/types/authTypes.tsx";
import {login, validate} from "@/api/users/authService.tsx";

export const useValidate = (token: string) => {
    return useQuery<UserSession, Error>({
        queryKey: ['validate', token],
        queryFn: () => validate(token),
        enabled: !!token,
        retry: false
    });
};

export const useLogin = () => {
    return useMutation<{token: string}, Error, LoginRequest>({
        mutationFn: login,
    });
};
