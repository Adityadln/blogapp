import { useContext, useEffect, useState } from "react";
import Header from "./codepieces/header";
import { UserContext } from "./auth/auth";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const navigate=useNavigate()
    const usercontext=useContext(UserContext);
    const [submitted,setsubmitted] = useState(false)
    const [title,settitle] = useState('');
    const [description,setdescription] = useState('');
    useEffect(()=>{
        if(!submitted) return;
        const submit=async()=>{
            const url = import.meta.env.VITE_BACKEND_URL + '/blogs/add';
            try{
                const response=await fetch(url,{
                    method: 'POST',
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify({title:title,description:description,id:usercontext._id})
                  })
                  const data=await response.json();
                  if(response.status===200) navigate('/blogs') 
            }
            catch(e){
                console.log(e);
            }
            finally{
                setsubmitted(false);    
            }
        };
        submit();
    },[submitted])
    return (<>
    <Header name={usercontext.username}/>
    
        <div className="blogspace">
            <form className="FormInput" onSubmit={(e)=>{setsubmitted(true);
                    e.preventDefault()}}>
               <input onChange={(e)=>settitle(e.target.value)} required placeholder="Enter The Title" type="text" className="inputCls"/>
                <textarea onChange={(e)=>setdescription(e.target.value)} required placeholder="Enter The Description" className="textareaCls" ></textarea>
                <div style={{
                    display:"flex",
                    width:"100%",
                    justifyContent:"center",
                }}>
                   <button className="submitbtn">Create</button>
                </div>
              </form>      
            </div>
    </> 
       
     );
}
 
export default Add;