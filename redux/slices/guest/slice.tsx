import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuestState, UpdateFieldPayload } from "./interfaces";

const initialState: GuestState = {
    guestPhotos: null,
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

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        updateField(state, action: PayloadAction<UpdateFieldPayload>) {
            const { key, value } = action.payload;
            (state[key] as any) = value;

        },
        setGuest(state, action: PayloadAction<GuestState>) {
            return { ...state, ...action.payload };
        },
    },
})

export const { setGuest, updateField } = guestSlice.actions
export default guestSlice.reducer