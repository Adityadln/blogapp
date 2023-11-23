import { useState,useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const Header = ({name='User'}) => {
  const navigate = useNavigate();
    const [logout,setlogout]=useState(false);
    useEffect(()=>{
       if(logout){
         Cookies.remove('token');
         navigate('/');
       }
    },[logout]) 
    return ( 
        <div className="header">
            <div className="headertitle" >BlogIt</div>
            <div style={{
              display: "flex",
            }}>
              <div  className ="hellomsg">Hello there {name}</div>
                <button className="submitbtn " onClick={()=>setlogout(true)} style={{margin:15}}>Log Out</button>
              </div>    
         </div>                  
     );
}
 
export default Header;