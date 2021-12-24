import User from '../models/user';
import {Request, Response} from 'express'
export const getSignUps = async (req: Request, res: Response) => {
    try {
        
        // res.setHeader("Access-Control-Allow-Origin", "*")
        // res.setHeader("Access-Control-Allow-Credentials", "true");
        // res.setHeader("Access-Control-Max-Age", "1800");
        // res.setHeader("Access-Control-Allow-Headers", "content-type");
        // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        const signedUpUser = new User({
            username: req.body.userName,
            password: req.body.password,
            userID: req.body.userID
        })
        signedUpUser.save().then(
            (data:any) => {
                res.json(data)
            }).catch ((error: Error) => res.json(error));

    }  catch (error) {
        res.status(404).json( {error, message: "in signUps.ts"})
    }  
}
