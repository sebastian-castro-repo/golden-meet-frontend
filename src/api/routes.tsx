export const API_URL = import.meta.env.VITE_API_URL;

export const AUTH_ROUTES = {
    login: () => `${API_URL}/auth/login`,
    validate: () => `${API_URL}/auth/validate`
}