import React, { useContext, useEffect, useState } from 'react'
import "./users.css"
import AdminContext from '../Contextapi/Admincontext';
import AuthContext from '../Contextapi/Authcontext';
import { MdEdit,MdDelete } from 'react-icons/md';
import profile from "../../images/profile.svg";
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';

const Users = () => {
    const useAdmincontext=useContext(AdminContext);
    const useAuthcontext=useContext(AuthContext);
    const {userList,notificationList,updateuserList,updatenotificationList}=useAdmincontext;
    const {updatenotificationBadge,notificationCheck,updatenotificationCheck}=useAuthcontext;
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [notificationEditCheck, setNotificationEditCheck] = useState(false)
    const [useeffectreload, setUseeffectreload] = useState(false)
    const [userTemp,setUserTemp]=useState({});
    const [userId,setUserId]=useState("");
    const [temprole,setTemprole]=useState("");
    const [isOpenCon, setIsOpenCon] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const filteredUsers = userList.filter(
      (user) =>
        user.uname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [users, setUsers] = useState([]);

      const handleEditClick=(emp)=>{
        if(notificationEditCheck){
          setIsLoading(true);
          axios.put(`http://localhost:8090/user/updateRole/${temprole}`,{
            "userId":emp.user.userId
          },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
          }).catch((err)=>{
              setResMessage(err.response.data.message);
              setResPopUp(true);
              setIsLoading(false);
          });
          setIsLoading(true);
          axios.delete(`http://localhost:8090/notification/deleteNotification/${emp.notificationId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((res)=>{
            setUseeffectreload(useeffectreload);
            setIsLoading(false);
          }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        }
        else{
          setIsLoading(true);
          axios.put(`http://localhost:8090/user/updateRole/${temprole}`,{
            "userId":emp.userId
          },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
          }).catch((err)=>{
              setResMessage(err.response.data.message);
              setResPopUp(true);
              setIsLoading(false);
          });
        }
        setIsOpenEdit(false);
        setNotificationEditCheck(false);
    }

    const handleRejectClick=(emp)=>{
      setIsLoading(true);
      axios.delete(`http://localhost:8090/notification/deleteNotification/${emp.notificationId}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
          .then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setIsOpenEdit(false);
        setNotificationEditCheck(false);
    }


      useEffect(()=>{
        setIsLoading(true);
        axios.get("http://localhost:8090/notification/getNotifications",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then((res)=>{
          updatenotificationList(res.data.notificationList);
          if(res.data.notificationList.length > 0){
            updatenotificationBadge(true);
          }
          else{
            updatenotificationBadge(false);
          }
          setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setIsLoading(true);
        axios.get("http://localhost:8090/user/getUsers",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then((res)=>{
          updateuserList(res.data.userList);
          setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
      },[useeffectreload])

      

    const handleDelete = (userId) => {
        const newUsers = users.filter((e) => e.userid !== userId);
        setUsers(newUsers);
        //if notification is there then it should be removed from db
        setIsOpenCon(false);
        setNotificationEditCheck(false);
    };

    const handleEditPopup=(emp)=>{
        setIsOpenEdit(true);
        setUserTemp(emp);
        setTemprole(emp.role);
    }

    const handleNotification=(emp)=>{
      setNotificationEditCheck(true);
      setIsOpenEdit(true);
      setUserTemp(emp);
      setTemprole(emp.user.role);
      updatenotificationCheck(false);
    }

    const handleDeletePopup=(userId)=>{
        setIsOpenCon(true);
        setUserId(userId);
    }

    const displayRole = (role) =>{
      return role.substring(5);
    }

    

    return (
      <>
        {isLoading?<div className="loading">
        <PuffLoader color="#4CAF50" />
        </div>:<></>}
      <div className='employeeContainer'>
        <div className="trainernavbar">
          <div></div>
          <div>
            <div className="buttonContainer2">
              <div className="search-bar2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  />
              </div>
              <div type="submit" className="searchdiv" onClick={handleSearchInputChange}>
                <FaSearch className="searchIcon"/>
              </div>
            </div>
          </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>UserName</th>
                    <th>UserEmail</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    (searchQuery !== "" ? filteredUsers : userList).map((e,i)=><tr key={i}>
                        <td>{e.uname}</td>
                        <td>{e.email}</td>
                        <td>{displayRole(e.role)}</td>
                        <td>
                            <MdEdit title='Edit User Details'  onClick={()=>handleEditPopup(e)} className='edit-icon'/>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

        {
          notificationCheck && <div className='notificationContainer'>
            {notificationList.map((e,i)=><div onClick={()=>handleNotification(e)} className='notification' key={i}>
                <div className='empprofile'>
                  <img className="profile_icon" src={e.user.picture} alt="profile_logo"/>
                </div>
                <div>
                  <div className='notification_data'>
                    <div className='empname'>{e.user.uname}</div>
                    <div className='emprole'>Request For {displayRole(e.requestedRole)}</div>
                  </div>
                  <div className='notification_time'>{e.timestamp.substring(0,10)}&nbsp;&nbsp;{e.timestamp.substring(11,19)}</div>
                </div> 
              </div>)}
          </div>
        }

        {isOpenCon && <div className='popupContainer'>
          <div className='popup-boxd'>
            <div className='popupHeader'>
              <h2>Are you sure to delete this user?</h2>
            </div>
            <div className='buttonsContainer'>
              <button type="submit" className="submit-btn" onClick={() => handleDelete(userId)}>
                Yes
              </button>
              <button type="reset" className="cancel-btn" onClick={() => setIsOpenCon(false)}>
                No
              </button>
            </div>
          </div>
        </div>
        }

        {isOpenEdit && <form onSubmit={() => handleEditClick(userTemp)}>
          <div className='popupContainer' onClick={() => {setIsOpenEdit(false); setNotificationEditCheck(false);}}>
          <div className="popup-boxd" onClick={(e)=>e.stopPropagation()}>
            <div className='popupHeader'>
              <h2>Edit Role For User</h2>
            </div>
            <div className='inputContainer'>
              {
                notificationEditCheck ? <>
                  <div className="input-group">
                    <label>Name </label>
                    <input type="text" value={userTemp.user.uname} readOnly={true}/>                                                            
                  </div>

                  <div className="input-group">
                    <label>Email </label>
                    <input type="text" value={userTemp.user.email} readOnly={true}/>                                                            
                  </div>

                  <div className="input-group">
                    <label>Requested<br/>Role </label>
                    <input type="text" value={displayRole(userTemp.requestedRole)} readOnly={true}/>                                                            
                  </div>

                  <div className="input-group">
                    <label>Description</label>
                    <textarea value={userTemp.notificationDesc} readOnly={true}></textarea>                                                        
                  </div>

                  <div className="input-group">
                  <label>Role </label>
                  <select onClick={(e)=>setTemprole(e.target.value)} required={true}>
                    <option value={"ROLE_MANAGER"}>Manager</option>
                    <option value={"ROLE_LEADER"}>Leadership</option>
                    <option value={"ROLE_USER"}>User</option>
                  </select>                                                            
                  </div> 
                </>:<>
                <div className="input-group">
                    <label>Name </label>
                    <input type="text" value={userTemp.uname} readOnly={true}/>                                                            
                  </div>

                  <div className="input-group">
                    <label>Email </label>
                    <input type="text" value={userTemp.email} readOnly={true}/>                                                            
                  </div>

                  <div className="input-group">
                  <label>Role </label>
                  <select onClick={(e)=>setTemprole(e.target.value)} required={true}>
                    <option value={"ROLE_MANAGER"}>Manager</option>
                    <option value={"ROLE_LEADER"}>Leadership</option>
                    <option value={"ROLE_USER"}>User</option>
                  </select>                                                            
                  </div> 
                </>
              }
              </div>

            {!notificationEditCheck ? (<div className='buttonsContainer'>
              <button type="submit" className="submit-btn" >
                Submit
              </button>
              <button type="reset" className="cancel-btn" onClick={() => {setIsOpenEdit(false); setNotificationEditCheck(false);}}>
                Cancel
              </button>
            </div>):(<div className='buttonsContainer'>
              <button type="submit" className="submit-btn" >
                Approve
              </button>
              <button type="reset" id="reject-btn" className="cancel-btn" onClick={() => handleRejectClick(userTemp)}>
                Reject
              </button>
            </div>)}
          </div>
        </div></form>}

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
    </div>
    </>
    )
}

export default Users