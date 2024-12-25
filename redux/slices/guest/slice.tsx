import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuestState, updateGuestFieldPayload } from "./interfaces";
import { RootState } from "@/redux/store";

const initialState: GuestState = {
    guestPhotos: [],
    phoneNumber: null,
    birthday: null,
    country: '',
    passaportPhoto: null,
    interests: [],
    description: '',
    languages: [],
    digitalNomad: null,
    smoker: null,
    pets: null,
    instagram: '',
    linkedin: '',
    twitter: '',
    showProfileAuthorization: true
}

export const saveGuest = createAsyncThunk<any, void, { state: RootState }>(
    'guest/save',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const guestData = state.guest;

            console.log(guestData)

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guest/saveGuest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({guestData}),
            });

            if (!response.ok) {
                throw new Error('Failed to save or update guest data.');
            }

            const result = await response.json();
            return result;

        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        setGuest(state, action: PayloadAction<GuestState>) {
            return { ...state, ...action.payload };
        },
        updateGuestField(state, action: PayloadAction<updateGuestFieldPayload>) {
            const { key, value } = action.payload;
            (state[key] as any) = value;
        },
    },
})

export const { setGuest, updateGuestField } = guestSlice.actions
export default guestSlice.reducer