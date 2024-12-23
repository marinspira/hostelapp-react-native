export interface User {
    id: string;
    role: string;
    name: string;
    email: string;
    picture?: string;
    googleId: string | null;
    appleId: string | null;
    [key: string]: any; // Para incluir propriedades adicionais do Google API
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