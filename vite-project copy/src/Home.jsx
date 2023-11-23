import { Link } from "react-router-dom";
const Home = () => {
    return (     
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent:'space-between',
    margin:15
  }}>
    <div className="headertitle" >BlogIt</div>
    <div>
    <Link to="/login" style={{ textDecoration: 'none',}}><span style={{
           color:'#00ED64',fontWeight:600,marginLeft:60,marginTop:15,marginBottom:15,marginRight:60,
         }}>Log In</span></Link> 
         <Link to="/signup"> <button className="submitbtn active">Sign Up</button></Link> 
    </div>
</div> 
     );
}
 
export default Home;