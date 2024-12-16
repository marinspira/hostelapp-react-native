export interface UserState {
    userPhotos: string | string[] | null,
    name: string,
    birthday: number | null,
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
    likedBy: []
}

export interface UpdateFieldPayload {
    key: keyof UserState,
    value: any
}