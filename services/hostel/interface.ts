interface Bed {
    bed_number: string;
    assigned_by: string | null;
}

interface Room {
    number: string;
    beds: Bed[];
}

export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zip?: string;
}

export interface Hostel {
    name: string;
    address: Address;
    phone: string;
    email: string;
    website: string;
    experience_with_volunteers: boolean;
    rooms: Room[];
}