type PhotoType = string | File;

export interface GuestState {
    guestPhotos: PhotoType[] | null,
    phoneNumber: string | null,
    birthday: string | null,
    country: string,
    passaportPhoto: PhotoType | null,
    interests: string[],
    description: string,
    languages: string[],
    digitalNomad: boolean | null,
    smoker: boolean | null,
    pets: boolean | null,
    instagram: string,
    linkedin: string,
    twitter: string,
    showProfileAuthorization: boolean | null
}

export interface updateGuestFieldPayload {
    key: keyof GuestState,
    value: any
}