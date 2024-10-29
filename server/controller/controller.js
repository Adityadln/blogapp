import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User,Blog} from '../models/model.js';
import pkg from 'sift';
const { $eq, $in } = pkg;


const createToken=(id)=>{
    return jwt.sign({ id },process.env.SECRET_KEY,{
      expiresIn:"1 day",
    });  
}
const verifyToken=(token)=>{
  return new Promise((resolve,reject)=>{
    jwt.verify(token,process.env.SECRET_KEY,(err,decodedtoken)=>{
      if(!err){
       resolve(decodedtoken)
      }
      else{
       reject(err);
      }
    });
  }) 
}

const errorHandler = (err) => {
  let error = '';
  
  if (err && err.errors) {
    Object.values(err.errors).forEach((err) => {
      error += err.properties.message + " -- ";
    });
  } else {
    error = err.message || 'An unknown error occurred';
  }

  console.error(error);
  return error;
};

const userBlog=async(user,id)=>{
    const document=await User.findById(user._id);
    const blogs=document.blogs;
    const ifexists=blogs.some((idValue)=>( idValue.toString()==id));
    return ifexists;
}


export const signup=(req,res)=>{
    const {email,password,username}=req.body;
    const newUser=new User({
      email: email,
      password: password,
      username:username
    })
    newUser.save()
     .then((result)=>{
      const token=createToken(result._id);
      res.status(200).json(token);
      
     })
     .catch((err)=>{
      const error=errorHandler(err);
      res.status(400).json(error);
     })
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    const data=await User.findOne({email: email})
    if(!data)
    {
     return res.status(401).json({data:"The email is not registered--",token:""});
    }
     const passwordcheck=await bcrypt.compare(password,data.password)
     if(!passwordcheck){
      return res.status(401).json({data:"The password is incorrect--",token:""});
     }
    
    const token=createToken(data._id);
    res.status(200).json({data:data,token:token});  
}
export const blogVerify=(req,res)=>{
    const {token}=req.body;
  
      verifyToken(token)
      .then((isValid)=>{
         res.status(200).json(isValid); 
      })
      .catch((err)=>{
        res.status(401).json("token not verified");
      }) 
}
export const blogFind=async(req,res)=>{
    const {id}=req.body;
    const data=await User.findById(id);
    if(data){
      res.status(200).json(data);
    }
    else{
      res.status(500);
    }
}
export const blogAdd=async(req,res)=>{
    const {title,description,id}=req.body;
    const blog=new Blog({
      title: title,
      content: description,
      user:id
    })
    try{
      blog.save()
        .then(async(response)=>{
          await User.findByIdAndUpdate(id,{$push:{blogs:response._id}})
          res.status(200).json(response);
        })
        .catch((err)=>{
          console.log(err);
          res.status(500).json(err);
        });
    }
    catch(err){
      console.log(err);
    }    
} 
export const blogGetAll=async(req,res)=>{
    try{
      const getall=await Blog.find({}).populate('user').sort({updatedAt:-1});
      console.log(req.time);
      res.status(200).json(getall);
    }
    catch(e){
      console.log(e);
    }  
}

export const blogFindOne=async(req,res)=>{
    const {id}=req.body;
    const blog=await Blog.findById(id);
    if(blog) res.status(200).json(blog);
    else{ 
      res.status(404).json("resource not found");
    }
}

export const blogModify=async(req,res)=>{
    const {title,content,user,id}=req.body;
    const canModify=await userBlog(user,id);
    if(canModify){
      const result=await Blog.findByIdAndUpdate(id,{$set:{content:content,title:title}},{new:true});
      res.status(200).json(result);
    }
    else{
     res.status(500).json("not found");
    }
}
export const blogDelete=async(req,res)=>{
  
    const {user,id}=req.body;
    const canDelete=await userBlog(user,id);
    if(canDelete){
      await Blog.findByIdAndDelete(id);
      await User.updateMany({},{$pullAll:{blogs:[id]}});
      res.status(200).json("successfully deleted");
    }
    else{
       res.status(500).json("cant delete blog");
    } 
}


