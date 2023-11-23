import express from 'express';
const app=express();
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
app.use(cors());
app.use(express.json())//parses the incoming JSON object else it will be undefined and the server cant read it
import router from './router.js';

const runDb=async()=>{
  await mongoose.connect(process.env.uri)
}
runDb()
  .then((result)=>{
    console.log("The database is successfully running ")
  })
  .catch((err)=>{
    throw new Error("Error has occured with the DB")
})
   
app.listen(process.env.PORT,()=>{
    console.log("the server is listening on 8080");
})
// app.use((req,res,next)=>{
//   console.log("the method is " +req.method);
//   console.log("the path is " +req.path);
//   console.log("the url is is "+req.url);
//   next();
// })
app.use(router);


