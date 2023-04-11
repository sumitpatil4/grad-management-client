import React, { useState } from "react"

const AuthContext=React.createContext();

export const Auth=(props)=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [userid,setUserid]=useState("1001");
    const [username,setUsername]=useState("");
    const [usermail,setUsermail]=useState("");
    const [userpicture,setUserpicture]=useState("");
    const [userrole,setUserrole]=useState("");
    const [accessToken,setAccessToken]=useState("");
    const [idToken,setIdToken]=useState("");
    const [notificationCheck,setNotificationCheck]=useState(false);

    const updateuserid=(e)=>setUserid(e);
    const updateusername=(e)=>setUsername(e);
    const updateusermail=(e)=>setUsermail(e);
    const updateuserpicture=(e)=>setUserpicture(e);
    const updateuserrole=(e)=>setUserrole(e);
    const updateaccessToken=(e)=>setAccessToken(e);
    const updateidToken=(e)=>setIdToken(e);
    const updatenotificationCheck=(e)=>setNotificationCheck(e);

    const handleLogin=()=>{
        // if(username!=="" && userid!=="" && usermail!=="" && userpicture!=="")
            setIsAuthenticated(true);
        // else return;
    }

    const handleLogout=()=>{
        setIsAuthenticated(false);
        setUserid("");
        setUsername("");
        setUsermail("");
        setUserpicture("");
        setUserrole("");
        setIdToken("");
        setAccessToken("");
    }

    return (
        <AuthContext.Provider
        value={{
          isAuthenticated,
          username,
          userid,
          usermail,
          userpicture,
          userrole,
          accessToken,
          idToken,
          notificationCheck,
          handleLogout,
          handleLogin,
          updateuserid,
          updateusername,
          updateusermail,
          updateuserpicture,
          updateuserrole,
          updateaccessToken,
          updateidToken,
          updatenotificationCheck
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;