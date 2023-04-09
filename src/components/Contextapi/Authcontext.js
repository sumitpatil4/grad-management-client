import React, { useState } from "react"

const AuthContext=React.createContext();

export const Auth=(props)=>{
    const [isAuthenticated,setIsAuthenticated]=useState(true);
    const [empid,setEmpid]=useState("");
    const [empname,setEmpname]=useState("");
    const [empmail,setEmpmail]=useState("");
    const [emppicture,setEmppicture]=useState("");
    const [emprole,setEmprole]=useState("");

    const updateempid=(e)=>setEmpid(e);
    const updateempname=(e)=>setEmpname(e);
    const updateempmail=(e)=>setEmpmail(e);
    const updateemppicture=(e)=>setEmppicture(e);
    const updateemprole=(e)=>setEmprole(e);

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
          handleLogout,
          handleLogin,
          updateempid,
          updateempname,
          updateempmail,
          updateemppicture,
          updateemprole
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;