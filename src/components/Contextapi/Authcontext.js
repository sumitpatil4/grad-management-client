import React, { useState } from "react"

const AuthContext=React.createContext();

export const Auth=(props)=>{
    const [isAuthenticated,setIsAuthenticated]=useState(true);
    const [empid,setEmpid]=useState("1001");
    const [empname,setEmpname]=useState("");
    const [empmail,setEmpmail]=useState("");
    const [emppicture,setEmppicture]=useState("");
    const [emprole,setEmprole]=useState("");
    const [notificationCheck,setNotificationCheck]=useState(false);

    const updateempid=(e)=>setEmpid(e);
    const updateempname=(e)=>setEmpname(e);
    const updateempmail=(e)=>setEmpmail(e);
    const updateemppicture=(e)=>setEmppicture(e);
    const updateemprole=(e)=>setEmprole(e);
    const updatenotificationCheck=(e)=>setNotificationCheck(e);

    const handleLogin=()=>{
        // if(empname!=="" && empid!=="" && empmail!=="" && emppicture!=="")
            setIsAuthenticated(false);
        // else return;
    }

    const handleLogout=()=>{
        setIsAuthenticated(true);
        setEmpid("");
        setEmpname("");
        setEmpmail("");
        setEmppicture("");
        setEmprole("");
    }

    return (
        <AuthContext.Provider
        value={{
          isAuthenticated,
          empname,
          empid,
          empmail,
          emppicture,
          emprole,
          notificationCheck,
          handleLogout,
          handleLogin,
          updateempid,
          updateempname,
          updateempmail,
          updateemppicture,
          updateemprole,
          updatenotificationCheck
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;