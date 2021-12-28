import axios, { AxiosResponse } from 'axios';
import {LoginInfo, User} from '../types/types'

const site = 'http://localhost:5000'
const signUpEndPoint = `${site}/app/signup`
const loginEndPoint = `${site}/app/login`
export const createNewUser = (user: User) => axios.post(signUpEndPoint, user)
    .then((response: AxiosResponse<any, any>) => response.data)
    .catch((error:Error) => console.log(Error));

export const getUser = (loginInfo: LoginInfo) => axios.get(loginEndPoint, 
    //{params:loginInfo}
    ).then((response: AxiosResponse<any, any>) => response.data)
    .catch((error:Error) => console.log(Error))