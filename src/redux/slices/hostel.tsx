import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '@/src/redux/globalActions';
import { BackendResponse } from '@/src/interfaces/backendResponse';
import { Hostel } from '@/src/interfaces/hostel';
import useAddMainDomain from '@/src/hooks/useAddMainDomain';

const initialState = {
    data: {} as Hostel,
    loading: false,
    error: null as string | null,
};

export const getHostel = createAsyncThunk<BackendResponse, void, { rejectValue: string }>(
    'getHostel/hostel',
    async (_, { rejectWithValue }) => {
        try {
            const result = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostels/get`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!result.ok) {
                const errorDetails = await result.json();
                console.error("Error:", errorDetails.error);
                throw new Error('Failed to get guest data');
            }

            const response = await result.json()

            let logo

            if (response.data.logo) {
                logo = `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${response.data.logo}`
            }

            return {
                success: response.success,
                message: response.message,
                data: {
                    ...response.data,
                    logo
                },
            } as BackendResponse

        } catch (error: any) {
            console.error('Error in getHostel Slice:', error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
)

export const createHostel = createAsyncThunk<BackendResponse, { data: Hostel, image: any }, { rejectValue: string }>(
    'createHostel/hostel',
    async ({ data, image }, { rejectWithValue }) => {
        const formData = new FormData();

        const appendToFormData = (data: Record<string, any>, prefix: string) => {
            for (const [key, value] of Object.entries(data)) {
                if (value === null || value === undefined) continue;

                const formattedKey = `${prefix}[${key}]`;

                if (typeof value === "boolean" || typeof value === "number") {
                    formData.append(formattedKey, value.toString());
                } else if (value instanceof Date) {
                    formData.append(formattedKey, value.toISOString());
                } else if (Array.isArray(value)) {
                    value.forEach((v) => formData.append(`${formattedKey}[]`, v));
                } else {
                    formData.append(formattedKey, value);
                }
            }
        };
        appendToFormData(data, 'hostel');

        if (image instanceof FormData) {
            for (const [key, value] of image.entries()) {
                formData.append(key, value);
            }
        }

        try {
            const result = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostels/create`, {
                method: 'POST',
                headers: {},
                credentials: 'include',
                body: formData
            });

            const response = await result.json();

            if (!result.ok) {
                throw new Error(response.message || 'Error creating hostel');
            }

            return response as BackendResponse

        } catch (error: any) {
            console.error('Error in create hostel slice:', error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

const hostelSlice = createSlice({
    name: 'hostel',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetAppState, () => initialState)
            .addCase(createHostel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createHostel.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data as Hostel;
            })
            .addCase(createHostel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Creation failed';
            })
            // get hostel
            .addCase(getHostel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHostel.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data as Hostel;
            })
            .addCase(getHostel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Get hostel data failed';
            });
    },
});

export default hostelSlice.reducer;
