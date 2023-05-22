import React, { useState } from "react"

const AdminContext=React.createContext();

export const Admin=(props)=>{
    const [userList,setUserList]=useState([]);
    const [notificationList,setNotificationList]=useState([]);

    const updateuserList=(e)=>setUserList(e);
    const updatenotificationList=(e)=>setNotificationList(e);

    return (
        <AdminContext.Provider
        value={{
            userList,
            notificationList,
            updateuserList,
            updatenotificationList
        }}
      >
        {props.children}
      </AdminContext.Provider>
    );
}

export default AdminContext;