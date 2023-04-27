import React, { useContext, useState } from 'react'
import "./user.css"
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';


const User = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [temprole,setTemprole]=useState("");
    const [tempdesc,setTempdesc]=useState("manager");
    const [popUp,setPopUp] = useState(false);
    const usecontext=useContext(AuthContext);
    const {userid,username, usermail}=usecontext;

    const handleClick=(e)=>{
        const req={
            notificationDesc:tempdesc,
            timestamp:null,
            requestedRole:temprole
        }
        // shoot email to admin

        //API
        axios.post(`http://localhost:8090/notification/create/${userid}`,req)
        .then((res)=>{

            setPopUp(true);
        });
        setIsOpen(false);
    }


    return (
        <>
        <div className='newuserContainer'>
            <div className='newuser'>
                <h1>Hi {username} !</h1>
                <h1>You don't have access to this application</h1>
                <p onClick={()=>setIsOpen(true)}>Request&nbsp;Access</p>
            </div>
        </div>
        {isOpen && <form onSubmit={handleClick}><div className='popupContainer'>
            <div className="popup-boxd">
            <div className='popupHeader'>
            <h2>Request Dialog</h2>
            </div>


            <div className='inputContainer'>
                <div className="input-group">
                    <label htmlFor="name">Role </label>
                    <select id="name" onClick={(e)=>setTemprole(e.target.value)} required={true}>
                        <option value={"ROLE_MANAGER"}>Manager</option>
                        <option value={"ROLE_LEADER"}>Leader&nbsp;Ship</option>
                    </select>                                                            
                </div>

                <div className="input-group">
                    <label htmlFor="name">Description</label>
                    <textarea name='message' id="name" onChange={(e)=>setTempdesc(e.target.value)} 
                    placeholder='Write a request description' required={true}></textarea>                                                        
                </div>
            </div>

            <div className='buttonsContainer'><button type="submit" className="submit-btn">
                Submit
            </button>
            <button type="reset" className="cancel-btn" onClick={() => setIsOpen(false)}>
                Cancel
            </button>
            </div>
          </div>
        </div></form>}

        {popUp && (
        <div className="popupContainer">
          <div className="popup-boxd">
            <div className="popupHeader">
              <h2>Request sent to Admin</h2>
            </div>
            <div className="buttonsContainer">
              <button
                type="submit"
                className="submit-btn"
                onClick={()=>{setPopUp(false)}}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
        </>
    )
}

export default User