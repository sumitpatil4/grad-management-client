import React, { useContext } from "react";
import AuthContext from "../Contextapi/Authcontext";

const Profile=(props)=>{
    const usecontext=useContext(AuthContext);
    const {handleLogout}=usecontext;

    return (<div className="profile_layout">
                    <div>UserName</div>
                    <div onClick={handleLogout}>Logout</div>
            </div>
            )
}
export default Profile;