import User from '../models/user';
import { MongoClient } from "mongodb";
import {Request, Response} from 'express';

export const getSignUps = async (req: Request, res: Response) => {
    try {
        
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        const signedUpUser = new User({
            username: req.body.userName,
            password: req.body.password,
            userID: req.body.userID
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

    //     signedUpUser.save().then(
    //         (data:any) => {
    //             res.json(data)
    //         }).catch ((error: Error) => res.json(error));

    }  catch (error) {
        res.status(404).json( {error, message: "in signUps.ts"})
    }  
}
