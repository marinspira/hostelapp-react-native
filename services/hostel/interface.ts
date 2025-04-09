interface Bed {
    bed_number: string;
    assigned_by: string | null;
}

export interface Hostel {
    name: string;
    street: string;
    city: string;
    country: string;
    zip?: string;
    phone: string;
    email: string;
    website: string;
    experience_with_volunteers: boolean | null;
}