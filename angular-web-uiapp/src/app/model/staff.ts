export interface CreateStaffRequest{
    kitchen_id: string
    first_name: string
    last_name: string
    email?:string
    phone?:string
    role:string
}

export interface CreateStaffResponse{
    id: string
    first_name: string
    last_name: string
    email?:string
    phone?:string
    role:string
}