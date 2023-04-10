import React, { useContext, useEffect, useState } from 'react'
import website_logo from "../../images/website_logo.png";
import "./navbar.css"
import { NavLink } from 'react-router-dom';
import profile from "../../images/profile.svg"
import Profile from './Profile';
import { IoNotifications } from 'react-icons/io5';
// import AdminContext from '../Contextapi/Admincontext';
import AuthContext from '../Contextapi/Authcontext';

const Navbar = (props) => {

  const usecontext=useContext(AuthContext);
  const {notificationCheck,updatenotificationCheck}=usecontext;

  const [profileflag,setProfileflag]=useState(false);
  const [managerflag,setManagerflag]=useState(false);
  const [leadershipflag,setLeadershipflag]=useState(false);
  const [superadminflag,setSuperadminflag]=useState(false);
  const [userflag,setUserflag]=useState(false);

  useEffect(()=>{
    if(props.role!=="")
    {
        setManagerflag(false);
        setLeadershipflag(false);
        setSuperadminflag(false);
        setUserflag(false);
        switch(props.role)
        {
          case 'manager':
            setManagerflag(true);
            break;
          case 'leadership':
            setLeadershipflag(true);
            break;
          case 'superadmin':
            setSuperadminflag(true);
            break;
          case 'user':
            setUserflag(true);
            break;
        }
    }
  },[props.role]);

  return (
    <>
    <nav className='navbar'>
        <div className='website_logo_wrapper'><img className='website_logo' src={website_logo}/></div>
        <div className='navlinksContainer'>
          {managerflag && <>
            <NavLink className="navlinks" to={"/mytrainings"} >MyTrainings</NavLink>
            <NavLink className="navlinks" to={"/trainers"}>Trainers</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }

          {leadershipflag && <>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }

          {superadminflag && <>
              <NavLink className="navlinks" to={"/admin"}>Users</NavLink>
              {/* <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink> */}
              <IoNotifications onClick={()=>{notificationCheck ? updatenotificationCheck(false):updatenotificationCheck(true)}} className="notification_icon"/>
            </>
          }

          {userflag && <>
            <NavLink className="navlinks" to={"/user"}>User</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }

            <div onClick={()=>{profileflag ? setProfileflag(false):setProfileflag(true)}} className="profile_div">
                <img className="profile_logo" src={profile} alt="profile_logo"/>
            </div>
        </div>
    </nav>
    {
      profileflag && <Profile />
    }
    </>
  )
}

export default Navbar