export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
    [key: string]: any; // Para incluir propriedades adicionais do Google API
}

export interface UserState {
    user: User | null;
    role: string | null;
    loading: boolean;
    error: string | null;
}

// Parâmetros para o Thunk
export interface ThunkArgs {
    user: User;
    role: string;
}

// Resposta esperada do backend
export interface BackendResponse {
    success: boolean;
    data: User;
    message: string;
}