import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StaffState {
    skills:  string[];
    education: string;
    workExperience: string,
    travelExperience: string,
    interests: string[],
    anyRestriction: string,
}

const initialState: StaffState = {
    skills: [],
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
        setStaff(state, action: PayloadAction<StaffState>) {
            return { ...state, ...action.payload };
        },
        resetStaff() {
            return initialState;
        },
    },
});

export const { setStaff, resetStaff } = staffSlice.actions;
export default staffSlice.reducer;
