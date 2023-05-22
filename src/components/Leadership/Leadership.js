import React, { useContext, useEffect, useState } from 'react'
import Leadercontext from '../Contextapi/Leadercontext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./Leadership.css"
import { PuffLoader } from 'react-spinners';

const Leadership = () => {

    const leadercontext=useContext(Leadercontext);
    const {updatemanagerInstance}=leadercontext;
    const [usersList, setUsersList] = useState([]);
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        axios.get("http://localhost:8090/user/getUsers",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then((res)=>{
          const filteredList=res.data.userList.filter((user)=>user.role==="ROLE_MANAGER")
          setUsersList(filteredList)
          setIsLoading(false);
        }).catch((err)=>{
          setResMessage(err.response.data.message);
          setResPopUp(true);
          setIsLoading(false);
      });;
      },[])

    const navigate = useNavigate();
    const navigatetotopics = (e) => {
      updatemanagerInstance(e);
      navigate("/leadership/result", true);
    };

    return (
      <>
      {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
        <div className='mytrainingsContainer' >
          <h1>Managers</h1>
          <div className='mytrainings'>   
            {
              usersList.map((user)=><div onClick={()=>navigatetotopics(user)}>
                <div className='managerText' title={`Go to ${user.uname}`}>{user.uname}</div>
              </div>)
            }       
          </div>
        </div>
        {resPopUp && <div className='popupContainer'>
        <div className='popup-boxd'>
            <div className='popupHeader'>
            <h2>Opps Something went wrong!!</h2>
            </div>
            <div className='msgContainer'>
                <p>{resMessage}</p>
            </div>
            <div className='buttonsContainer'>
                <button type="submit" className="submit-btn" onClick={() => setResPopUp(false)}>
                    Ok
                </button>
            </div>
        </div>
    </div>}
    </>
      )
}

export default Leadership;