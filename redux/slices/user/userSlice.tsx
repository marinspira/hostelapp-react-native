import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    name: string,
    birthday: number | null,
    country: string,
    passportPhoto: any,
    interests: string[],
    description: string,
    languages: string[],
    digitalNomad: boolean | null,
    smoker: boolean | null,
    pets: boolean | null,
    socialMedia: {
        instagram: string,
        linkedin: string,
        twitter: string,
    },
}

interface UpdateFieldPayload {
    key: keyof UserState,
    value: any
}

const initialState: UserState = {
    name: '',
    birthday: null,
    country: '',
    passportPhoto: '',
    interests: [''],
    description: '',
    languages: [''],
    digitalNomad: null,
    smoker: null,
    pets: null,
    socialMedia: {
        instagram: '',
        linkedin: '',
        twitter: '',
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateField(state, action: PayloadAction<UpdateFieldPayload>) {
            const { key, value } = action.payload;
            

            // Garante que o campo dinâmico seja atualizado corretamente
            (state[key] as any) = value; // `as any` necessário para suportar propriedades complexas
            
        },
        setUser(state, action: PayloadAction<UserState>) {
            return { ...state, ...action.payload }; // Substitui todo o estado do usuário
        },
    },
})

export const { setUser, updateField } = userSlice.actions
export default userSlice.reducer