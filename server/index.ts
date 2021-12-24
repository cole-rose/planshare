// import * as fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';
import * as dotenv from 'dotenv';

// import postRoutes from './routes/posts';

// const mdb_info:String[] = fs.readFileSync('mdb_pass.txt').toString().trim().split('\n');
// const username:String = mdb_info[0];
// const password:String = mdb_info[1];
dotenv.config({ path: '/.env' });
const app = express();
app.use('/app', postRoutes);
app.use(express.json({limit : "30mb"}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors());


const CONNECTION_URL = process.env.DATABASE_ACCESS as string;
console.log(CONNECTION_URL);
const PORT : Number = Number(process.env.PORT) || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);