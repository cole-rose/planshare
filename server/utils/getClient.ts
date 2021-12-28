
import { MongoClient } from "mongodb";
export const getClient = async () => {
    const CONNECTION_STRING = process.env.DATABASE_ACCESS as string;
    const client = new MongoClient(CONNECTION_STRING, { useUnifiedTopology: true });
    await client.connect();
    return client;
}
