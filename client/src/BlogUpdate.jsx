import { useParams,useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, } from "react";
import { UserContext } from "./auth/auth";
import Header from "./codepieces/header";
import './styles/index.css';
const BlogPiece = () => {
    const id=useParams();
    const url='http://localhost:8080/blogs/findone'
    const usercontext=useContext(UserContext); 
    const [title,settitle]=useState('');
    const [content,setcontent] = useState('');
    const [submitted,setsubmitted]=useState(false);
    const [submitteddelete,setsubmitteddelete]=useState(false);
    const [error,seterror] = useState('');
    const navigate=useNavigate()
    useEffect(()=>{
        const findone=async()=>{
            try{
                const response = await fetch(url,{
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify({id: id.id})
                 })
                 if(response.status===200){
                    const data=await response.json();
                    settitle(data.title);
                    setcontent(data.content);
                 }
            }
            catch(e){
                console.log(e);
            }
        
        }
        findone();
       
    },[])
    useEffect(()=>{
        const url='http://localhost:8080/blogs/modify'
       if(!submitted) return;
       const modify=async()=>{
        try{
            const response=await fetch(url,{
                method:'PATCH',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({title:title,content:content,user:usercontext,id:id.id})
             })
             if(response.status!=200){
                seterror("Can't modify the blog as you are not the author!!")
             }
             else{
                navigate('/blogs')
               
             }
        }
        catch(e){
            console.log(e);
        }
        finally{
            setsubmitted(false);
        } 
       }
       modify();
    },[submitted])
    useEffect(()=>{
        const url='http://localhost:8080/blogs/delete';
        console.log("hello!");
       if(!submitteddelete) return;
       const Delete=async()=>{
        try{
            const response=await fetch(url,{
                method:'DELETE',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({user:usercontext,id:id.id})
             })
             if(response.status!=200){
                seterror("Can't delete the blog as you are not the author!!")
             }
             else{
                navigate('/blogs')  
             }
        }
        catch(e){
            console.log(e);
        }
        finally{
            setsubmitteddelete(false);
        } 
       }
       Delete();
    },[submitteddelete])
    return ( 
        <>
         <Header name={usercontext.username}/>

         <div className="blogspace">
         <div className="errormodify">{error}</div>
            <form  className="FormInput" onSubmit={(e)=>{e.preventDefault()}}>
               <input onChange={(e)=>settitle(e.target.value)} required type="text" value={title} className="inputCls" />
                <textarea onChange={(e)=>setcontent(e.target.value)} required value={content} className="textareaCls"></textarea>
                <div style={{
                    display:"flex",
                    width:"100%",
                    justifyContent:"center",
                }}>
                   <button className="submitbtn" onClick={()=>setsubmitted(true)}>Modify</button>
                   <button className="submitbtn" onClick={()=>setsubmitteddelete(true)} style={{
                    backgroundColor:"#00ED64",
                    color:"#001E2B"
                   }}>Delete</button>
                </div>
              </form> 
         
            </div>
        </>
       
     );
}
 
export default BlogPiece;