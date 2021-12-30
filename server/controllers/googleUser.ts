import {getClient} from '../utils/getClient';
import { Request, Response} from 'express';
import {OAuth2Client} from 'google-auth-library';
export const getUser = async (req: Request, res: Response) => {
    console.log('in get User');
    try {
   
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    const authClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const {token} = req.body;
    const client = await getClient()
    const db = client.db("planshare");
    const users = db.collection("users");
    const ticket = await authClient.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID
    });
    const {givenName, familyName, email} = ticket.getPayload();
    
   
 }
    catch(error) {
        console.log('caught error in login.ts')
        res.status(404).json( {error, message: "in controllers/login.ts"})
    }


}