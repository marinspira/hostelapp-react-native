export interface User {
    role: string;
    name: string;
    email: string;
    isNewUser: string;
}

export interface UserState {
    data: User | null;
    loading: boolean;
    error: string | null;
}

// Parâmetros para o Thunk
export interface ThunkArgs {
    user: User;
    token: any;
    role: string;
}

// Resposta esperada do backend
export interface BackendResponse {
    success: boolean;
    data: User;
    message: string;
}