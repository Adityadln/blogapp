import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from "react";
import Header from "./codepieces/header";
import { UserContext } from "./auth/auth";
import { Link,useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate()
  const [allblogs,setallblogs]=useState([])
  useEffect(()=>{
    const getBlogs=async()=>{
      const url = import.meta.env.VITE_BACKEND_URL + '/blogs/getall';
      try{
        const response = await fetch(url,{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
        });
        
        if(response.status===200){
          const data=await response.json();
          setallblogs(data);
        }
      }
      catch(e){
        console.log(e);
      }
    }
    getBlogs();
  },[])
  const usercontext=useContext(UserContext);
    return (
      <>
  <Header name={usercontext.username}/>
        
<div className="blog">
  <div className="bloginside">
      <div className="blog-header">
        <div className="blogadd" onClick={()=>navigate('/blogs/add')}>Add a New Post +</div>
      </div>    
      <div className="blogdisplay">
            {allblogs.map((value)=>{
              return (
                <div className="a-blog" key={value._id}>
                <div>
                  <div className="a-blog-header">
                     <div className="a-blog-title-user">
                        <div className="a-blog-title"><Link style={{textDecoration:'none',color:"inherit"}} to={`/blogs/${value._id}`}>{value.title}</Link></div>
                        <div className="a-blog-user">{value.user.username}</div>
                       
                     </div>
                     <div className='iconparent'>
                        <div className="a-blog-time">{value.time}</div>
                        <div className='usericon' onClick={()=>navigate(`/blogs/user/${value.user._id}`)}>
                          <FontAwesomeIcon icon={faUser} size='lg'/>
                        </div>
                      
                     </div>
                
                  
                </div>
                <div className="a-blog-content">{value.content}
                </div>
                </div> 
              </div>
              )
            })}  
      </div>
  </div>
  <div className="blogtext">BlogIt<br/>Out!!</div>
</div>
      </>
      );
}
 
export default Blogs;