import User from '../models/user';
import { MongoClient } from "mongodb";
import {NextFunction, Request, Response} from 'express';

export const getSignUps = async (req: Request, res: Response, next:NextFunction) => {
    try {
        
        // res.setHeader("Access-Control-Allow-Origin", "*")
        // res.setHeader("Access-Control-Allow-Credentials", "true");
        // res.setHeader("Access-Control-Max-Age", "1800");
        // res.setHeader("Access-Control-Allow-Headers", "content-type");
        // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        console.log('req body: ', req.body);
        const signedUpUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            friends: req.body.friends,
            createdPlans: req.body.createdPlans,
            invitedPlans: req.body.invitedPlans

        })
        const CONNECTION_STRING = process.env.DATABASE_ACCESS as string;
        const client = new MongoClient(CONNECTION_STRING, { useUnifiedTopology: true });
        await client.connect();
        const db = client.db("planshare");
        const users = db.collection("users");

        const result = await users.insertOne(signedUpUser).then((result) => {
          console.log(
            `${result.insertedCount} documents were inserted into with the _id:`,
            `${result.insertedId}`
          );
          }).then(async () => await client.close());
          res.status(200).json({message:'success'});
    //     signedUpUser.save().then(
    //         (data:any) => {
    //             res.json(data)
    //         }).catch ((error: Error) => res.json(error));

    }  catch (error) {
        res.status(404).json( {error, message: "in signUps.ts"})
    }  
}
