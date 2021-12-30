export type User = {
    email: string, 
    password: string,
    firstName: string,
    lastName:string,
    friends: {type: string[],
        default: []
    }
    createdPlans: {type: string[],
        default: []
    }, 
    invitedPlans: {type: string[],
        default: []
    }
}

export type LoginInfo = {
    email: string,
    password: string
}
export type LoginResponse =  {
    emailExists: Boolean,
    correctPassword:Boolean
}