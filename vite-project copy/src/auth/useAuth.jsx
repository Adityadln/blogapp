import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
const url='http://localhost:8080/login';

const useAuth = ({email,password,submit,setsubmit}) => {
    const [userdata,setuserdata] =useState({});
    const [err,seterr]=useState("");
    const [load,setload]=useState(false);
    

    useEffect(()=>{
       
        const fetchRequest =async()=>{  
            if(!submit) return;     
            try{
                const res=await fetch(url,{
                   method: 'POST',
                   headers:{'Content-Type': 'application/json'},
                   body:JSON.stringify({password:password,email:email}),
                   
                });
                if(!res.ok){
                    console.log('the response is not okay');
                }
                const {data,token}=await res.json();
                if(res.status==200){
                    console.log(data);
                    Cookies.set('token',token,{
                        expires:1
                    });
                    setuserdata(data);
                    seterr("");
                    
                }
                else{
                  seterr(data);
                }
              }
              catch(e){
                  console.error(e.message);
              }
              finally{
                setsubmit(false)
                setload(true)
               
              }
        }
        fetchRequest();
    },[email,password,submit])

    return {userdata,err,load}
}
export default useAuth;