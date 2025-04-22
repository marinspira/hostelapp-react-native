import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '@/src/redux/globalActions';

export interface Hostel {
    firstPhoto: string;
    name: string;
    userId: string;
}

const initialState = {
    data: [] as Hostel[],
    loading: false,
    error: null as string | null,
};

export const createHostel = createAsyncThunk<Hostel[], void, { rejectValue: string }>(
    'createHostel/hostel',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostel/create`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const result = await response.json();
            const guests = result.data;

            if (!response.ok) {
                throw new Error(result.message || 'Error getting guests');
            }

            return guests as Hostel[];
        } catch (error: any) {
            console.error('Error in fetchHostel:', error);
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
                state.data = action.payload;
            })
            .addCase(createHostel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch guests.';
            });
    },
});

export default hostelSlice.reducer;
