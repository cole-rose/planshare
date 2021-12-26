import axios, { AxiosResponse } from 'axios';
import {User} from '../types/user'

const signUpEndPoint = '/app/users'
export const createNewUser = (user: User) => axios.post(signUpEndPoint, user)
    .then((response: AxiosResponse<any, any>) => console.log(response))
    .catch((error:Error) => console.log(Error));