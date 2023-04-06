import React from "react";

const Profile=(props)=>{

    return (<div className="profile_layout">
                    <div>UserName</div>
                    <div onClick={()=>props.handlelogout(true)}>Logout</div>
            </div>
            )
}
export default Profile;