import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const UserContext=createContext({});

const Auth = () => {
  const [auth,setauth] =useState(false);
  const [userdata,setuserdata]=useState({});
 
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = Cookies.get("token");
    async function notVerified() {
      console.log("NotVerified");
      navigate("/login");
    }
    async function verify() {
      const url = import.meta.env.VITE_BACKEND_URL + "/blogs/verify";
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: cookie }),
        });
        const data = await res.json();
    
        if (res.status === 200) {
          console.log(data);
          const url = import.meta.env.VITE_BACKEND_URL + '/blogs/find';
          const response=await fetch(url,{
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({id:data.id})
          })
          const userInfo = await response.json();
          if(response.status === 200) {
            console.log(userInfo);
            setuserdata(userInfo);
          }
        } else {
          console.log("not verified");
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (cookie) {
      verify();
    } else {
      notVerified();
    }
  }, []);

  return(
      <UserContext.Provider value={userdata}>
          <Outlet />
      </UserContext.Provider>
  );
 
};
export {UserContext};
export default Auth;


