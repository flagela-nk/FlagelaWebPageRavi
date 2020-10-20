export interface FactsheetService{
    required:string,
    provided?:string
    category?:string,
}

export interface Factsheet{
    _id?:string,
    name:string,
    hospitalId?:string,
    hospital?:any,
    services:FactsheetService[]
}
