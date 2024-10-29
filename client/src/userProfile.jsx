import { useParams } from "react-router-dom";

const UserProfile = () => {
    const {id}=useParams();
    console.log(id);
    return ( 
      <p>hello</p>
     );
}
 
export default UserProfile;