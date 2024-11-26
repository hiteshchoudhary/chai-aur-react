import React,{useContext} from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
    const {user} = useContext(UserContext);

    if(!user) return <div><h2>PLease Log In</h2></div>

    return <div><h2>Welcome: {user.username}</h2></div>
}

export default Profile;