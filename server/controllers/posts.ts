import WeeklyStatsMessage from '../models/weeklyStatsMessage';
import {Request, Response} from 'express'
export const getWeeklyStats = async (req: Request, res: Response) => {
    try {
        
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const messages = await WeeklyStatsMessage.find({'creation_date': {"$gte": oneWeekAgo}}).limit(2).sort({end_time:-1});
        res.status(200).json(messages);

    }  catch (error) {
        res.status(404).json( {error, message: "in weeklyStats.ts"})
    }  
}
