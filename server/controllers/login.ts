import {getClient} from '../utils/getClient';
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {User} from '../types/user';
export const getUser = async (req: Request, res: Response) => {
    try {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

    const client = await getClient()
    const db = client.db("planshare");
    const users = db.collection("users");
    const email = req.body.email;
    const password = req.body.password;

    const query = {email: email};

    const queryResult = await users.find(query).toArray();
    
    type LoginResponse =  {
        emailExists: Boolean,
        correctPassword:Boolean
    }
    const loginResponse:LoginResponse = {
        emailExists:false,
        correctPassword:false    
    }
    if (queryResult.length == 1) {
        loginResponse.emailExists = true;

        const user:User = queryResult[0];
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (correctPassword) {
            loginResponse.correctPassword = true;

        }
        res.status(200).json(loginResponse);
    } }
    catch(error) {
        res.status(404).json( {error, message: "in controllers/login.ts"})
    }


}