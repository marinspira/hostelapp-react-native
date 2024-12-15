import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, UpdateFieldPayload } from "@/interfaces/user/user";

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
    reviews: [{}],
    likedBy: []
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