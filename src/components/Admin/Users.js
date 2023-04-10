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
    const {notificationList,updatenotificationList}=useAdmincontext;
    const {notificationCheck,updatenotificationCheck}=useAuthcontext;
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [notificationEditCheck, setNotificationEditCheck] = useState(false)
    const [userTemp,setUserTemp]=useState({});
    const [userId,setUserId]=useState("");
    const [temprole,setTemprole]=useState("");
    const [isOpenCon, setIsOpenCon] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");



    const [employees, setEmployees] = useState([
        { userid: 1, username: 'Ashish Tripathy', useremail: 'ashish@gmail.com', role: 'manager' },
        { userid: 2, username: 'Sumit Vasant Patil', useremail: 'sumit@gmail.com', role: 'leadership'},
        { userid: 3, username: 'Sai Krupananda', useremail: 'sai@gmail.com', role: 'manager'},
        { userid: 4, username: 'Akriti Singh', useremail: 'akriti@gmail.com', role: 'leadership'},
      ]);

      useEffect(()=>{
        const x=[{ userid: 1,timestamp:"10 Apr 2023", username: 'Ashish Tripathy', useremail: 'ashish@gmail.com', role: 'manager' },
        { userid: 2,timestamp:"10 Apr 2023", username: 'Sumit Vasant Patil', useremail: 'sumit@gmail.com', role: 'leadership'},
        { userid: 3,timestamp:"10 Apr 2023", username: 'Sai Krupananda', useremail: 'sai@gmail.com', role: 'manager'},
        { userid: 4,timestamp:"10 Apr 2023", username: 'Akriti Singh', useremail: 'akriti@gmail.com', role: 'leadership'},
      ]
        updatenotificationList(x);
      },[notificationCheck])

      

    const handleDelete = (userId) => {
        const newEmployees = employees.filter((e) => e.userid !== userId);
        setEmployees(newEmployees);
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
      const newEmployee = employees.filter((e) => e.userid === emp.userid)[0];
      newEmployee.desc="descrption Upon successfully clearing an assessment, you can promote yourself using the HackerRank certificate to peers and employers";
      newEmployee.req_role=emp.role;
      console.log(newEmployee);
      // setEmployees(newEmployee);
      setNotificationEditCheck(true);
      setIsOpenEdit(true);
      setUserTemp(newEmployee);
      setTemprole(newEmployee.role);
      updatenotificationCheck(false);
    }

    const handleDeletePopup=(userId)=>{
        setIsOpenCon(true);
        setUserId(userId);
    }

    const handleEditClick=(emp)=>{
        console.log(temprole);
        employees.forEach((e)=>{
            if(e.userid===emp.userid)
            {
                e.role=temprole;
            }
        })
        //if notification is there then it should be removed from db
        setEmployees(employees);
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
                    employees.map((e)=><tr>
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
       <div className='con-popup'>
        <div className='delTrain'>
        <h2>Are you sure to delete this user?</h2>
        </div>
          <div><button type="submit" className="submit-btn" onClick={() => handleDelete(userId)}>
            Yes
          </button>
          <button type="reset" className="cancel-btn" onClick={() => setIsOpenCon(false)}>
            No
          </button>
          </div>
        </div>
        </div>
        }

        {isOpenEdit && <div className='popupContainer'>
        <div className="popup-boxd">
        <div className='newTrain'>
        <h2>Edit Role For User</h2>
        </div>
            
        <div className="input-group">
          <label htmlFor="name">Name </label>
          <input type="text" id="name" value={userTemp.username} readOnly={true}/>                                                            
        </div>

        <div className="input-group">
          <label htmlFor="name">Email </label>
          <input type="text" id="name" value={userTemp.useremail} readOnly={true}/>                                                            
        </div>

        {
          notificationEditCheck && <>
            <div className="input-group">
              <label htmlFor="name">Request&nbsp;Role </label>
              <input type="text" id="name" value={userTemp.req_role} readOnly={true}/>                                                            
            </div>

            <div className="input-group">
              <label htmlFor="name">Description</label>
              <textarea id="name" readOnly={true}>{userTemp.desc}</textarea>                                                        
            </div>
          </>
        }
        
        <div className="input-group">
          <label htmlFor="name">Role </label>
          <select id="name" onClick={(e)=>setTemprole(e.target.value)}>
            <option value={"manager"}>Manager</option>
            <option value={"leadership"}>Leader&nbsp;Ship</option>
            <option value={"user"}>User</option>
          </select>                                                            
        </div>

        <div><button type="submit" className="submit-btn" onClick={() => handleEditClick(userTemp)}>
          Submit
        </button>
        <button type="reset" className="cancel-btn" onClick={() => {setIsOpenEdit(false); setNotificationEditCheck(false);}}>
          Cancel
        </button>
        </div>
      </div>
      </div>}
    </div>
    )
}

export default Users