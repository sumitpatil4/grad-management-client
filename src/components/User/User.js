import React, { useContext, useState } from 'react'
import "./user.css"
import AuthContext from '../Contextapi/Authcontext';

const User = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [temprole,setTemprole]=useState("");
    const [tempdesc,setTempdesc]=useState("manager");
    const usecontext=useContext(AuthContext);
    const {empid}=usecontext;

    const handleClick=()=>{
        const req={
            role:temprole,
            desc:tempdesc,
            date:Date(),
            userid:empid
        }
        console.log(req);
        setIsOpen(false);
    }


    return (
        <>
        <div className='newuserContainer'>
            <div className='newuser'>
                <h1>You Are New User</h1>
                <p onClick={()=>setIsOpen(true)}>Request&nbsp;Access</p>
            </div>
        </div>
        {isOpen && <div className='popupContainer'>
            <div className="popup-boxd">
            <div className='newTrain'>
            <h2>Request Dialog</h2>
            </div>
                
            <div className="input-group">
            <label htmlFor="name">Role </label>
            <select id="name" onClick={(e)=>setTemprole(e.target.value)}>
                <option value={"manager"}>Manager</option>
                <option value={"leadership"}>Leader&nbsp;Ship</option>
                <option value={"user"}>User</option>
            </select>                                                            
            </div>
            <div className="input-group">
                <label htmlFor="name">Description</label>
                <textarea id="name" onChange={(e)=>setTempdesc(e.target.value)} 
                placeholder='Write a request description'></textarea>                                                        
            </div>

            <div><button type="submit" className="submit-btn" onClick={handleClick}>
                Submit
            </button>
            <button type="reset" className="cancel-btn" onClick={() => setIsOpen(false)}>
                Cancel
            </button>
            </div>
            </div>
        </div>}
        </>
    )
}

export default User