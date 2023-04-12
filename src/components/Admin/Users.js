import React, { useContext, useEffect, useState } from 'react'
import "./users.css"
import AdminContext from '../Contextapi/Admincontext';
import AuthContext from '../Contextapi/Authcontext';
import { MdEdit,MdDelete } from 'react-icons/md';
import profile from "../../images/profile.svg";
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';


const Users = () => {
    const useAdmincontext=useContext(AdminContext);
    const useAuthcontext=useContext(AuthContext);
    const {userList,notificationList,updateuserList,updatenotificationList}=useAdmincontext;
    const {notificationCheck,updatenotificationCheck}=useAuthcontext;
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [notificationEditCheck, setNotificationEditCheck] = useState(false)
    const [userTemp,setUserTemp]=useState({});
    const [userId,setUserId]=useState("");
    const [temprole,setTemprole]=useState("");
    const [isOpenCon, setIsOpenCon] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");



    const [users, setUsers] = useState([
        { userid: 1, username: 'Ashish Tripathy', useremail: 'ashish@gmail.com', role: 'manager' },
        { userid: 2, username: 'Sumit Vasant Patil', useremail: 'sumit@gmail.com', role: 'leadership'},
        { userid: 3, username: 'Sai Krupananda', useremail: 'sai@gmail.com', role: 'manager'},
        { userid: 4, username: 'Akriti Singh', useremail: 'akriti@gmail.com', role: 'leadership'},
      ]);

      useEffect(()=>{

        axios.get("http://localhost:8090/notification/getNotifications")
        .then((res)=>{
          console.log(res.data.notificationList);
          updatenotificationList(res.data.notificationList)
          // console.log(notificationList)
        });

        axios.get("http://localhost:8090/user/getUsers")
        .then((res)=>{
          // console.log(res.data.userList);
          updateuserList(res.data.userList)
          // console.log(userList)
        });
        //get users and notification from db and store in userlists and notificationlist

        // const x=[{ userid: 1,timestamp:"10 Apr 2023", username: 'Ashish Tripathy', useremail: 'ashish@gmail.com', role: 'manager' },
        // { userid: 2,timestamp:"10 Apr 2023", username: 'Sumit Vasant Patil', useremail: 'sumit@gmail.com', role: 'leadership'},
        // { userid: 3,timestamp:"10 Apr 2023", username: 'Sai Krupananda', useremail: 'sai@gmail.com', role: 'manager'},
        // { userid: 4,timestamp:"10 Apr 2023", username: 'Akriti Singh', useremail: 'akriti@gmail.com', role: 'leadership'},]


        // updatenotificationList();
      },[notificationCheck])

      

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

    const handleEditClick=(emp)=>{
        // console.log(temprole);
        console.log(emp.json(),temprole);
        //if notification is there then it should be removed from db
        setUsers(users);
        setIsOpenEdit(false);
        setNotificationEditCheck(false);
    }

    return (
        <div className='employeeContainer'>
        <div className="button-container">
          <div className="search-bar">
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit"><FaSearch /></button>
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
                    userList.map((e)=><tr>
                        <td>{e.uname}</td>
                        <td>{e.email}</td>
                        <td>{e.role}</td>
                        <td>
                            <MdEdit  onClick={()=>handleEditPopup(e)} className='edit-icon'/>
                            <MdDelete onClick={()=>handleDeletePopup(e.userid)} className='del_icon'/>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

        {
          notificationCheck && <div className='notificationContainer'>
            {notificationList.map((e)=><div onClick={()=>handleNotification(e)} className='notification'>
                <div className='empprofile'>
                  <img className="profile_icon" src={e.user.picture} alt="profile_logo"/>
                </div>
                <div>
                  <div className='notification_data'>
                    <div className='empname'>{e.user.uname}</div>
                    <div className='emprole'>Request For {e.requestedRole}</div>
                  </div>
                  <div className='notification_time'>{e.timestamp.substring(0,10)}&nbsp;&nbsp;{e.timestamp.substring(11,19)}</div>
                </div> 
              </div>)}
              {/* <h1>notification</h1> */}
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

        {isOpenEdit && <form><div className='popupContainer' onClick={() => {setIsOpenEdit(false); setNotificationEditCheck(false);}}>
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
                    <label>Request&nbsp;Role </label>
                    <input type="text" value={userTemp.requestedRole} readOnly={true}/>                                                            
                  </div>

                  <div className="input-group">
                    <label>Description</label>
                    <textarea readOnly={true}>{userTemp.notificationDesc}</textarea>                                                        
                  </div>

                  <div className="input-group">
                  <label>Role </label>
                  <select onClick={(e)=>setTemprole(e.target.value)} required={true}>
                    <option value={"ROLE_MANAGER"}>Manager</option>
                    <option value={"ROLE_LEADER"}>Leader&nbsp;Ship</option>
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
                    <option value={"ROLE_LEADER"}>Leader&nbsp;Ship</option>
                  </select>                                                            
                  </div> 
                </>
              }
              </div>

            {!notificationEditCheck ? (<div className='buttonsContainer'>
              <button type="submit" className="submit-btn" onClick={() => handleEditClick(userTemp)}>
                Submit
              </button>
              <button type="reset" className="cancel-btn" onClick={() => {setIsOpenEdit(false); setNotificationEditCheck(false);}}>
                Cancel
              </button>
            </div>):(<div className='buttonsContainer'>
              <button type="submit" className="submit-btn" onClick={() => handleEditClick(userTemp)}>
                Approve
              </button>
              <button type="reset" id="reject-btn" className="cancel-btn" onClick={() => {setIsOpenEdit(false); setNotificationEditCheck(false);}}>
                Reject
              </button>
            </div>)}
          </div>
        </div></form>}
    </div>
    )
}

export default Users