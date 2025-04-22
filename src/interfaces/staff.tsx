export interface StaffState {
    skills:  string[];
    nextDesiredTrip: string;
    education: string;
    workExperience: string,
    travelExperience: string,
    interests: string[],
    anyRestriction: string,
}

export interface setStaffPayload {
    key: keyof StaffState,
    value: any
}