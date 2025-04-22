import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '@/src/redux/globalActions';

export interface HostelGuests {
    firstPhoto: string;
    name: string;
    userId: string;
}

const initialState = {
    data: [] as HostelGuests[],
    loading: false,
    error: null as string | null,
};

export const getAllGuests = createAsyncThunk<HostelGuests[], void, { rejectValue: string }>(
    'getAllGuests/hostel',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostel/getAllGuests`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const result = await response.json();
            const guests = result.data;

            if (!response.ok) {
                throw new Error(result.message || 'Error getting guests');
            }

            return guests as HostelGuests[];
        } catch (error: any) {
            console.error('Error in fetchHostelGuests:', error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

const hostelGuestsSlice = createSlice({
    name: 'hostelGuests',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetAppState, () => initialState)
            .addCase(getAllGuests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllGuests.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllGuests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch guests.';
            });
    },
});

export default hostelGuestsSlice.reducer;
