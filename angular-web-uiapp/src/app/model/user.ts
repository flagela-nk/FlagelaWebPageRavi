export class UserLoginRequest{
    email:string
    password:string
    [key: string]:any

    constructor(obj:any){
        this.email = obj['email'];
        this.password = obj['password']

    }
}


export class UserLoginResponse{
    userId:string
    email:string
    name:string
    token:string
    role:string
    [key: string]:any

    constructor(obj:any){
        this.userId = obj['_id'] || obj['userId']
        this.email = obj['email']
        this.name = obj['name']        
        this.token = obj['token']    
        this.role = obj['role'] || 'DEFAULT'
    }
}

export class UserRegistrationRequest{
    email:string
    name:string
    password:string
    role:string
    [key: string]:any

    constructor(obj:any){
        this.email = obj['email']
        this.name = obj['name']        
        this.password = obj['password']    
        this.role = obj['role'] || 'DEFAULT'
    }
}

export class UserRegistrationResponse{
    userId:string
    email:string
    name:string
    token:string
    role:string
    [key: string]:any

    constructor(obj:any){
        
        this.userId = obj['_id'] || obj['userId']
        this.email = obj['email']
        this.name = obj['name']        
        this.token = obj['token']    
        this.role = obj['role'] || 'DEFAULT'
    }
}

export class UserProfile{   
    userId:string 
    email:string
    name:string
    role:string
    [key: string]:any

    constructor(obj:any){
        this.userId = obj['_id']
        this.email = obj['email']
        this.name = obj['name']       
        this.role = obj['role'] || 'DEFAULT'
    }
}


