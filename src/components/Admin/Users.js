import React, { useContext, useEffect, useState } from 'react'
import "./users.css"
import AdminContext from '../Contextapi/Admincontext';
import AuthContext from '../Contextapi/Authcontext';
import { MdEdit,MdDelete } from 'react-icons/md';
import profile from "../../images/profile.svg";
import { FaSearch } from 'react-icons/fa';


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

        //get users and notification from db and store in userlists and notificationlist

        const x=[{ userid: 1,timestamp:"10 Apr 2023", username: 'Ashish Tripathy', useremail: 'ashish@gmail.com', role: 'manager' },
        { userid: 2,timestamp:"10 Apr 2023", username: 'Sumit Vasant Patil', useremail: 'sumit@gmail.com', role: 'leadership'},
        { userid: 3,timestamp:"10 Apr 2023", username: 'Sai Krupananda', useremail: 'sai@gmail.com', role: 'manager'},
        { userid: 4,timestamp:"10 Apr 2023", username: 'Akriti Singh', useremail: 'akriti@gmail.com', role: 'leadership'},
      ]
        updatenotificationList(x);
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
      const newUser = users.filter((e) => e.userid === emp.userid)[0];
      newUser.desc="descrption Upon successfully clearing an assessment, you can promote yourself using the HackerRank certificate to peers and employers";
      newUser.req_role=emp.role;
      console.log(newUser);
      // setUsers(newUser);
      setNotificationEditCheck(true);
      setIsOpenEdit(true);
      setUserTemp(newUser);
      setTemprole(newUser.role);
      updatenotificationCheck(false);
    }

    const handleDeletePopup=(userId)=>{
        setIsOpenCon(true);
        setUserId(userId);
    }

    const handleEditClick=(emp)=>{
        console.log(temprole);
        users.forEach((e)=>{
            if(e.userid===emp.userid)
            {
                e.role=temprole;
            }
        })
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
                    users.map((e)=><tr>
                        <td>{e.username}</td>
                        <td>{e.useremail}</td>
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
                  <img className="profile_icon" src={profile} alt="profile_logo"/>
                </div>
                <div>
                  <div className='notification_data'>
                    <div className='empname'>{e.username}</div>
                    <div className='emprole'>Request For {e.role}</div>
                  </div>
                  <div className='notification_time'>{e.timestamp}</div>
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
              <div className="input-group">
                <label>Name </label>
                <input type="text" value={userTemp.username} readOnly={true}/>                                                            
              </div>

              <div className="input-group">
                <label>Email </label>
                <input type="text" value={userTemp.useremail} readOnly={true}/>                                                            
              </div>

              {
                notificationEditCheck && <>
                  <div className="input-group">
                    <label>Request&nbsp;Role </label>
                    <input type="text" value={userTemp.req_role} readOnly={true}/>                                                            
                  </div>

                  <div className="input-group">
                    <label>Description</label>
                    <textarea readOnly={true}>{userTemp.desc}</textarea>                                                        
                  </div>
                </>
              }
              
              <div className="input-group">
                <label>Role </label>
                <select onClick={(e)=>setTemprole(e.target.value)} required={true}>
                  <option value={"manager"}>Manager</option>
                  <option value={"leadership"}>Leader&nbsp;Ship</option>
                  <option value={"user"}>User</option>
                </select>                                                            
              </div>
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
              <button type="reset" className="cancel-btn" onClick={() => {setIsOpenEdit(false); setNotificationEditCheck(false);}}>
                Reject
              </button>
            </div>)}
          </div>
        </div></form>}
    </div>
    )
}

export default Users