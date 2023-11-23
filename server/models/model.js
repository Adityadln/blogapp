import isEmail from 'validator/lib/isEmail.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema=mongoose.Schema;
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,'Please enter a username']
    },
    email:{
        type:String,
        validate:[isEmail,'Enter a valid email'],
        unique:[true,'This email is already registered']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Enter a password of atleast 6 characters'],
    },
    blogs:[
        {
            type:Schema.Types.ObjectId,
            ref:"Blog"
            
        }
    ],
   
})
const blogschema = new Schema({
    title:{
        type:String,

    },
    content:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
        
    },
    time:{
        type:String,
        required:true,
        default:`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()},${new Date().getHours()}:${new Date().getMinutes()}`
    }
},{timestamps:true})
userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

const User=mongoose.model('User',userSchema);
const Blog=mongoose.model('Blog',blogschema);

export {User,Blog};