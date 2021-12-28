// import * as fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const corsOptions = {
  origin: true,
  credentials: true
};



app.use(express.json({limit : "30mb"}));
app.use(express.urlencoded({limit:"30mb", extended: true}));



app.use(cors(corsOptions));
var corsMiddleware = function(req:any, res:any, next:any) {
  res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

  next();
}

app.use(corsMiddleware);
app.use('/app', postRoutes);
const PORT : Number = Number(process.env.PORT) || 5000;

mongoose.connect(process.env.DATABASE_ACCESS as string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);