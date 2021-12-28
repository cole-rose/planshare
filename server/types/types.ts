export type User = {
    email: string, 
    password: string,
    firstName: string,
    lastName:string,
    friends: string[],
    createdPlans: string[],
    invitedPlans: string[]
}

export type LoginInfo = {
    email: string,
    password: string
}
export type LoginResponse =  {
    emailExists: Boolean,
    correctPassword:Boolean
}