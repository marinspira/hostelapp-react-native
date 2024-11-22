import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    name: string,
    age: any,
    country: string,
    passportPhoto: any,
    interests: string[],
    description: string,
    languages: string[],
    digitalNomad: boolean,
    smoker: boolean,
    pets: boolean,
    socialMedia: {
        instagram: string,
        linkedin: string,
        twitter: string,
    },
}

const initialState: UserState = {
    name: '',
    age: null,
    country: '',
    passportPhoto: '',
    interests: [''],
    description: '',
    languages: [''],
    digitalNomad: false,
    smoker: false,
    pets: false,
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
        setUser(state, action: PayloadAction<UserState>) {
            return { ...state, ...action.payload }
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer