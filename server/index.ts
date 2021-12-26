// import * as fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';
import * as dotenv from 'dotenv';
import {createProxyMiddleware }from 'http-proxy-middleware';
// import postRoutes from './routes/posts';

// const mdb_info:String[] = fs.readFileSync('mdb_pass.txt').toString().trim().split('\n');
// const username:String = mdb_info[0];
// const password:String = mdb_info[1];
dotenv.config();
const app = express();
const corsOptions = {
  origin: true,
  credentials: true
};

let options = {
  target: "localhost", //api.example.com 
  changeOrigin: true,
  logLevel: 'debug',
  onError: function onError(err:Error, req:Request, res:Response) {
  console.log("Something went wrong with the proxy middleware.", err)

  }
 };

// app.use(cors(corsOptions));
app.use(express.json({limit : "30mb"}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
// app.use('/app', createProxyMiddleware({
//   changeOrigin:true,
//   target:"http:localhost/3000/app/signup"
// }));


// app.use(cors());
app.use(cors(corsOptions));
var corsMiddleware = function(req:any, res:any, next:any) {
  res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
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