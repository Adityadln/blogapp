
import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom';

import './styles/index.css';
import Cookies from "js-cookie";
const Signup = () => {
const navigate = useNavigate();
const [email,setemail]=useState("");
const [password,setpassword]=useState("");
const [username,setusername]=useState("");
const [submit,setsubmit]=useState(false);
const [error,seterror]=useState(' ');

    useEffect(()=>{
       
        const fetchRequest =async()=>{  
            if(!submit) return;     
            const url = import.meta.env.VITE_BACKEND_URL + '/signup';     
            try{
                const res=await fetch(url,{
                   method: 'POST',
                   headers:{'Content-Type': 'application/json'},
                   body:JSON.stringify({username:username,password:password,email:email}),
                   
                });
                if(!res.ok){
                    console.error('the response is not okay');
                }
                const data=await res.json();
                if(res.status==200){
                    Cookies.set('token',data);
                   navigate('/blogs')
                }
                else{
                    seterror(data);
                }
              }
              catch(e){
                  console.error(e.message);
              }
              finally{
                setsubmit(false)
              }
        }
        fetchRequest();
    },[email,password,username,submit])
    
    const formSubmit =(e)=>{
        e.preventDefault();  
        setsubmit(true);
    }

    return ( 
    <div className="main">
        <div className="title">
           <div className="title">BlogIt</div>
           <div className="error">{error}</div>
        </div>
        <div className="form-div">
          <form onSubmit={formSubmit}>
            
              <label htmlFor="username">Username</label> <br/>
              <input type="text" id="username" onChange={e => setusername(e.target.value)} />
              <br/>
      
            
              <label htmlFor="email">Email</label> <br/>
              <input type="text" id="email" onChange={e => setemail(e.target.value)} />
              <br/>
      
              <label htmlFor="password">Password</label> <br/>
              <input type="password" id="password" onChange={e => setpassword(e.target.value)} />
              <br/>
        <div className="btndiv">
        <button disabled={submit} className="submitbtn">Sign Up</button>  
       
        </div>
        <p className="linktext">Have an account? <span ><Link to="/login" className="link">Log In</Link></span></p>
          </form>
        </div>
        </div>
      );     
}
 
export default Signup;