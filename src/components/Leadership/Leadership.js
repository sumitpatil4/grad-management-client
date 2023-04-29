import React, { useContext, useEffect, useState } from 'react'
import Leadercontext from '../Contextapi/Leadercontext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./Leadership.css"

const Leadership = () => {

    const leadercontext=useContext(Leadercontext);
    const {updatemanagerInstance}=leadercontext;
    const [usersList, setUsersList] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8090/user/getUsers")
        .then((res)=>{
          console.log(res.data.userList)
          const filteredList=res.data.userList.filter((user)=>user.role==="ROLE_MANAGER")
          setUsersList(filteredList)
          console.log(filteredList)
        });
      },[])

    const navigate = useNavigate();
    const navigatetotopics = (e) => {
      console.log(e);
      updatemanagerInstance(e);
      navigate("/leadership/result", true);
    };

    return (
        <div className='mytrainingsContainer' >
          <h1>Managers</h1>
          <div className='mytrainings'>   
            {
              usersList.map((user)=><div onClick={()=>navigatetotopics(user)}>
                <div className='managerText'>{user.uname}</div>
              </div>)
            }       
          </div>
        </div>
      )
}

export default Leadership;