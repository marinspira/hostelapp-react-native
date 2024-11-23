import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    userPhotos: string | string[] | null,
    name: string,
    birthday: number | null,
    country: string,
    passaportPhoto: any,
    interests: string[],
    description: string,
    languages: string[],
    digitalNomad: boolean | null,
    smoker: boolean | null,
    pets: boolean | null,
    instagram: string,
    linkedin: string,
    twitter: string,
}

interface UpdateFieldPayload {
    key: keyof UserState,
    value: any
}

const initialState: UserState = {
    userPhotos: null,
    name: '',
    birthday: null,
    country: '',
    passaportPhoto: '',
    interests: [],
    description: '',
    languages: [],
    digitalNomad: null,
    smoker: null,
    pets: null,
    instagram: '',
    linkedin: '',
    twitter: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateField(state, action: PayloadAction<UpdateFieldPayload>) {
            const { key, value } = action.payload;
            (state[key] as any) = value;

        },
        setUser(state, action: PayloadAction<UserState>) {
            return { ...state, ...action.payload };
        },
    },
})

export const { setUser, updateField } = userSlice.actions
export default userSlice.reducer