export interface SearchVendorsRequest{
    location?: string
    name?: string
}

export interface SearchVendorsResponse{
    id: string
    name: string
    rating: number
    address: string
    city: string
    state: string
    zipcode: string
    previousClient: string
    experience: number
    noOfMealsServed: number
    logo_url: string
    images?: string[]
}
