import axios, { AxiosResponse } from 'axios';
import {User} from '../types/user'

const signUpEndPoint = 'http://localhost:5000/app/signup'
export const createNewUser = (user: User) => axios.post(signUpEndPoint, user)
    .then((response: AxiosResponse<any, any>) => response.data)
    .catch((error:Error) => console.log(Error));