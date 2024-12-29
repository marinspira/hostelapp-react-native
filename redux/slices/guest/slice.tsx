import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Guest, updateGuestFieldPayload } from "./interfaces";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import { BackendResponse } from "../guest/interfaces";

const initialState = {
    data: {
        guestPhotos: [],
        phoneNumber: null,
        birthday: null,
        country: '',
        passaportPhoto: null,
        interests: [],
        description: null,
        languages: [],
        digitalNomad: null,
        smoker: null,
        pets: null,
        instagram: null,
        linkedin: null,
        twitter: null,
        showProfileAuthorization: true,
    } as Guest,
    loading: false,
    error: null as string | null,
};

export const saveGuest = createAsyncThunk<BackendResponse, void, { state: RootState; rejectValue: string }>(
    'guest/save',
    async (_, { getState, rejectWithValue }) => {

        try {
            const state = getState() as RootState;
            const guestData = state.guest.data;

            console.log('slice', guestData)

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guest/saveGuest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ guestData }),
            });

            if (!response.ok) {
                throw new Error('Failed to save or update guest data.');
            }

            router.push('/guest/(tabs)');

            const result = await response.json();
            return result as BackendResponse

        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        setGuest(state, action: PayloadAction<Guest>) {
            return { ...state, ...action.payload };
        },
        updateGuestField(state, action: PayloadAction<updateGuestFieldPayload>) {
            const { key, value } = action.payload;
            (state.data[key] as any) = value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGuest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveGuest.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
                state.loading = false;
                if (action.payload.success) {
                    return { ...state, ...action.payload.data };
                } else {
                    state.error = action.payload.message || 'Failed to save guest data.';
                }
            })
            .addCase(saveGuest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while saving guest data.';
            });
    },
})

export const { setGuest, updateGuestField } = guestSlice.actions
export default guestSlice.reducer