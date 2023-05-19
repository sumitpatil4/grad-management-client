import React, { useContext, useEffect, useState } from 'react'
import website_logo from "../../images/website_logo.png";
import accolite_logo from "../../images/Accolite.PNG";
import "./navbar.css"
import { NavLink, useNavigate } from 'react-router-dom';
import profile from "../../images/profile.svg"
import menu_icon from "../../images/menu1.png"
import Profile from './Profile';
import { IoNotifications } from 'react-icons/io5';
import AuthContext from '../Contextapi/Authcontext';

const Menu = (props) => {
    const usecontext=useContext(AuthContext);
    const {username,handleLogout,isAuthenticated,userrole,userpicture,notificationBadge,notificationCheck,updatenotificationCheck}=usecontext;
  const [managerflag,setManagerflag]=useState(false);
  const [leadershipflag,setLeadershipflag]=useState(false);
  const [superadminflag,setSuperadminflag]=useState(false);
  const [userflag,setUserflag]=useState(false);
  const [internFlag, setInternFlag] = useState(false);

  useEffect(()=>{
    if(props.role!=="")
    {
        setManagerflag(false);
        setLeadershipflag(false);
        setSuperadminflag(false);
        setUserflag(false);
        setInternFlag(false);
        switch(props.props.role)
        {
          case 'ROLE_MANAGER':
            setManagerflag(true);
            break;
          case 'ROLE_LEADER':
            setLeadershipflag(true);
            break;
          case 'ROLE_ADMIN':
            setSuperadminflag(true);
            break;
          case 'ROLE_USER':
            setUserflag(true);
            break;
          case 'ROLE_INTERN':
            setInternFlag(true);
            break;
        }
    }
  },[props.role]);

  const navigate=useNavigate();

  const handleNavigate=()=>{
    if(!isAuthenticated)
    {
      navigate("/",true)
    }
    else{
      switch(userrole)
        {
          case 'ROLE_MANAGER':
            navigate("/mytrainings",true);
            break;
          case 'ROLE_LEADER':
            navigate("/leadership",true);
            break;
          case 'ROLE_ADMIN':
            navigate("/admin",true);
            break;
          case 'ROLE_USER':
            navigate("/user",true);
            break;
          case 'ROLE_INTERN':
            navigate("/intern",true);
            break;
        }
    }
  }
  return (
    <div className="menu_layout">
        <div className='menulinksContainer'>
          {managerflag && <>
            <NavLink className="navlinks" to={"/mytrainings"} >My Trainings</NavLink>
            <NavLink className="navlinks" to={"/trainers"}>Trainers</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }

          {leadershipflag && <>
            <NavLink className="navlinks" to={"/leadership"}>Managers</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }

          {internFlag && <>
            <NavLink className="navlinks" to={"/intern"}>My Trainings</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
          </>}

          {userflag && <>
            <NavLink className="navlinks" to={"/user"}>User</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }
          <div className='navlinks' onClick={handleLogout}>Logout</div>
          </div>
    </div>
  )
}

export default Menu;