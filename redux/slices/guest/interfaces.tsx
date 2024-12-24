export interface GuestState {
    guestPhotos: string[] | null,
    phoneNumber: string,
    // name: string,
    birthday: string | null,
    country: string,
    passaportPhoto: any,
    interests: string[],
    description: string,
    languages: string[],
    digitalNomad: boolean | null,
    smoker: boolean | null,
    pets: boolean | null,
    instagram: string,
    linkedin: string,
    twitter: string,
    reviews: [{}],
    likedBy: [],
    showProfileAuthorization: boolean | null
}

export interface UpdateFieldPayload {
    key: keyof GuestState,
    value: any
}