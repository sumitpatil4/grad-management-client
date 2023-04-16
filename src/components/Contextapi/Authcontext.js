import axios from "axios";
import React, { useEffect, useState } from "react"

const AuthContext=React.createContext();

export const Auth=(props)=>{
    useEffect(()=>{
      if(isAuthenticated===false && localStorage.getItem('accessToken')!=null){
        axios.get(`http://localhost:8090/user/getUserById/${localStorage.getItem('userId')}`)
        .then((res)=>{
            updateuserid(res.data.user.userId);
            updateusername(res.data.user.uname);
            updateusermail(res.data.user.email);
            updateuserpicture(res.data.user.picture);
            updateuserrole(res.data.user.role);
            updateaccessToken(res.data.accessToken);
            updateidToken(localStorage.getItem('IDToken'));
            handleLogin();
        })
      }
    })


    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [userid,setUserid]=useState("1001");
    const [username,setUsername]=useState("");
    const [usermail,setUsermail]=useState("");
    const [userpicture,setUserpicture]=useState("");
    const [userrole,setUserrole]=useState("");
    const [accessToken,setAccessToken]=useState("");
    const [idToken,setIdToken]=useState("");
    const [notificationCheck,setNotificationCheck]=useState(false);
    const [notificationBadge,setNotificationBadge] = useState(false);

    const updateuserid=(e)=>setUserid(e);
    const updateusername=(e)=>setUsername(e);
    const updateusermail=(e)=>setUsermail(e);
    const updateuserpicture=(e)=>setUserpicture(e);
    const updateuserrole=(e)=>setUserrole(e);
    const updateaccessToken=(e)=>setAccessToken(e);
    const updateidToken=(e)=>setIdToken(e);
    const updatenotificationCheck=(e)=>setNotificationCheck(e);
    const updatenotificationBadge=(e)=>setNotificationBadge(e);

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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('IDToken');
        localStorage.removeItem('userId');
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
          notificationBadge,
          handleLogout,
          handleLogin,
          updateuserid,
          updateusername,
          updateusermail,
          updateuserpicture,
          updateuserrole,
          updateaccessToken,
          updateidToken,
          updatenotificationCheck,
          updatenotificationBadge
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;