import express from 'express';
const app=express();
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
app.use(cors());
app.use(express.json())
import router from './router.js';
const docker_uri = process.env.uri_docker
const local_uri = process.env.uri_local
const runDb=async()=>{
  await mongoose.connect(docker_uri)
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


