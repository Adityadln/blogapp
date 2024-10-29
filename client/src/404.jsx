import { Link } from 'react-router-dom';
import './styles/index.css';
import { UserContext } from './auth/auth';
import { useContext } from 'react';
import Header from './codepieces/header';
const PageNotFound = () => {
    const usercontext=useContext(UserContext);
    return ( <>

       <Header name={usercontext.username}/>
        <div className="error404">
          404
        <Link style={{ textDecoration:"none" }} to="/blogs">Go To Home</Link>
        </div>
    </>
     
        
     );
}
 
export default PageNotFound;