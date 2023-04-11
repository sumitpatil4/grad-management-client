import React, { useContext } from "react";
import AuthContext from "../Contextapi/Authcontext";

const Profile=(props)=>{
    const usecontext=useContext(AuthContext);
    const {username,handleLogout}=usecontext;

    return (<div className="profile_layout">
                    <div>{username}</div>
                    <div onClick={handleLogout}>Logout</div>
            </div>
            )
}
export default Profile;