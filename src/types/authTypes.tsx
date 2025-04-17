export interface LoginRequest {
    username: string,
    password: string,
}

export interface UserSession {
    valid: true,
    role: string,
    permissions: string[],
    exp: string,
    username: string,
    id: number,
}
