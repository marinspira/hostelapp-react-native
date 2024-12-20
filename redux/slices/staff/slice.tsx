import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setStaffPayload, StaffState } from './interfaces';

const initialState: StaffState = {
    skills: [],
    nextDesiredTrip: '',
    education: '',
    workExperience: '',
    travelExperience: '',
    interests: [],
    anyRestriction: '',
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        updateStaffFields(state, action: PayloadAction<setStaffPayload>) {
            const { key, value } = action.payload;
            (state[key] as any) = value;

        },
    },
});

export const { updateStaffFields } = staffSlice.actions;
export default staffSlice.reducer;