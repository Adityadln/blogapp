import { useEffect, useState,createContext } from "react";
import {Link,useNavigate} from 'react-router-dom';

import './styles/index.css';
import useAuth from "./auth/useAuth";
const Login =() => {
const navigate = useNavigate()
const [email,setemail]=useState("");
const [password,setpassword]=useState("");
const [submit,setsubmit]=useState(false);

const {userdata,err,load}=  useAuth({email:email,password:password,submit:submit,setsubmit:setsubmit});        

    const formSubmit =(e)=>{
        e.preventDefault();  
        setsubmit(true); 
          
    }
    useEffect(()=>{
      if(load){
        if(err)  console.log(err);        
        else { 
          navigate('/blogs')
        } 
      }    
    },[userdata,err,load]);

    return ( 
    <div className="main">
         <div className="title">
           <div className="title">BlogIt</div>
           <div className="error">{err}</div>
        </div>
        
        <div className="form-div">
          <form onSubmit={formSubmit}>
            
              <label htmlFor="email">Email</label> <br/>
              <input type="text" id="email" onChange={e => setemail(e.target.value)} />
              <br/>
      
              <label htmlFor="password">Password</label> <br/>
              <input type="password" id="password" onChange={e => setpassword(e.target.value)} />
              <br/>
        <div className="btndiv">
        <button disabled={submit} className="submitbtn">Log In</button>  
       
        </div>
        <p className="linktext">Don't have an account? <span ><Link to="/signup" className="link">Sign Up</Link></span></p>
          </form>
        </div>
        </div>
      );     
}

export default Login;