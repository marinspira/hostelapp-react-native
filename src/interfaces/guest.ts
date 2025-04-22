export interface Guest {
    guestPhotos: string[] | null,
    phoneNumber: string | null,
    birthday: string | null,
    country: string,
    passaportPhoto: string | null,
    interests: string[],
    description: string | null,
    languages: string[],
    digitalNomad: boolean | null,
    smoker: boolean | null,
    pets: boolean | null,
    instagram: string | null,
    linkedin: string | null,
    twitter: string | null,
    showProfileAuthorization: boolean | null
}

export interface updateGuestFieldPayload {
    key: keyof Guest,
    value: any
}

export interface GuestState {
    data: Guest | null;
    loading: boolean;
    error: string | null;
}

