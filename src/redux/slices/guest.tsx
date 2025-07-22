import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Guest, updateGuestFieldPayload } from "../../interfaces/guest";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import useAddMainDomain from "@/src/hooks/useAddMainDomain";
import { resetAppState } from "@/src/redux/globalActions";
import { BackendResponse } from "@/src/interfaces/backendResponse";

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

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guests/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ guestData }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Failed to login:", errorDetails);
                throw new Error('Failed to send user data');
            }

            const result = await response.json();
            return result as BackendResponse

        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
)

export const getGuest = createAsyncThunk<BackendResponse, void, { state: RootState; rejectValue: string }>(
    'guest/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guest/getGuest`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error:", errorDetails.error);
                throw new Error('Failed to get guest data');
            }

            const result = await response.json()
            const guestPhotosUpdated = useAddMainDomain(result.data.guestPhotos || []);

            return {
                success: result.success,
                message: result.message,
                data: {
                    ...result.data,
                    guestPhotos: guestPhotosUpdated,
                },
            } as BackendResponse;

        } catch (error: any) {
            console.error(error.message)
            return rejectWithValue(error)
        }
    }
)

export const updateGuest = createAsyncThunk<BackendResponse, void, { state: RootState; rejectValue: string }>(
    'guest/update',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const guestDataDefault = state.guest.data;

            const guestData = Object.fromEntries(
                Object.entries(guestDataDefault).filter(([key]) => key !== 'guestPhotos')
            );

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guest/updateGuest`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ guestData }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Failed to login:", errorDetails);
                throw new Error('Failed to send user data');
            }

            const result = await response.json()
            return result as BackendResponse

        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
)

export const uploadGuestImage = createAsyncThunk<BackendResponse, { file: any }, { state: RootState; rejectValue: string }>(
    'guest/uploadImages',
    async ({ file }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guests/save-images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file,
            });

            if (!response.ok) {
                throw new Error('Erro no upload');
            }

            const data = await response.json();
            return data as BackendResponse

        } catch (error: any) {
            console.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const deleteGuestImage = createAsyncThunk<BackendResponse, { id: string, endpoint: string }, { state: RootState, rejectWithValue: string }>(
    'guest/deleteImage',
    async ({ id, endpoint }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageId: id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete image');
            }

            const result = await response.json()
            return result as BackendResponse

        } catch (error: any) {
            console.error(error.message)
            return rejectWithValue(error.message)
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
            // resetAppState
            .addCase(resetAppState, () => initialState)
            // saveGuest
            .addCase(saveGuest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveGuest.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
                state.loading = false;
                if (action.payload.success) {
                    state.data = action.payload.data as Guest;
                } else {
                    state.error = action.payload.message || 'Failed to save guest data.';
                }
            })
            .addCase(saveGuest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while saving guest data.';
            })
            // getGuest
            .addCase(getGuest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGuest.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
                state.loading = false;
                if (action.payload.success) {
                    state.data = action.payload.data as Guest;
                } else {
                    state.error = action.payload.message || 'Failed to fetch guest data.';
                }
            })
            .addCase(getGuest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while getting the guest data'
            })
            // upload image
            .addCase(uploadGuestImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadGuestImage.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
                state.loading = false;
                if (action.payload.success) {
                    const uploadedPhoto = action.payload.data.imagePath;
                    if (state.data.guestPhotos) {
                        state.data.guestPhotos = [...state.data.guestPhotos, uploadedPhoto];
                    } else {
                        state.data.guestPhotos = [uploadedPhoto];
                    }
                } else {
                    state.error = action.payload.message || 'Failed to upload image.';
                }
            })
            .addCase(uploadGuestImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while uploading the image.';
            })
            // delete image
            .addCase(deleteGuestImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGuestImage.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
                state.loading = false;
                if (action.payload.success) {
                    const deletedImageId = action.payload.data.imageId;
                    if (state.data.guestPhotos) {
                        state.data.guestPhotos = state.data.guestPhotos.filter(
                            (photo, index) => index !== deletedImageId
                        );
                    }
                } else {
                    state.error = action.payload.message || 'Failed to delete image.';
                }
            })
            .addCase(deleteGuestImage.rejected, (state, action) => {
                state.loading = false;
                state.error = 'An error occurred while deleting the image.';
            });
    },
})

export const { setGuest, updateGuestField } = guestSlice.actions
export default guestSlice.reducer