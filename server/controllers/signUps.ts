import User from '../models/user';
import {getClient} from '../utils/getClient'
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
export const getSignUps = async (req: Request, res: Response) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        const client = await getClient();
        const db = client.db("planshare");
        const users = db.collection("users");
        const email = req.body.email;
        const query = {email: email};
        const saltPassword = await bcrypt.genSalt(10);
        const securePassword= await bcrypt.hash(req.body.password, saltPassword);
        const items = await users.find(query).toArray();
        var message = {notDuplicateUser: false};
        if (items.length == 0) {
                const signedUpUser = new User({
                    email: req.body.email,
                    password: securePassword,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    friends: req.body.friends,
                    createdPlans: req.body.createdPlans,
                    invitedPlans: req.body.invitedPlans

                })
                
                     const result = await users.insertOne(signedUpUser).then((result) => {
                        console.log(
                          `${result.insertedCount} documents were inserted into with the _id:`,
                          `${result.insertedId}`
                        );
                        });
            message = {notDuplicateUser:true};
                   
        }else{
            console.log('Duplicate users exist');
        }
        const closeClient = await client.close();
        res.status(200).json(message);

    }  catch (error) {
        res.status(404).json( {error, message: "in signUps.ts"})
    }  
}
