import React, { useContext, useEffect, useState } from 'react'
import website_logo from "../../images/website_logo.png";
import accolite_logo from "../../images/Accolite.PNG";
import "./navbar.css"
import { NavLink } from 'react-router-dom';
import profile from "../../images/profile.svg"
import Profile from './Profile';
import { IoNotifications } from 'react-icons/io5';
import AuthContext from '../Contextapi/Authcontext';

const Navbar = (props) => {

  const usecontext=useContext(AuthContext);
  const {userpicture,notificationBadge,notificationCheck,updatenotificationCheck}=usecontext;

  const [profileflag,setProfileflag]=useState(false);
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
        switch(props.role)
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

  return (
    <>
    <nav className='navbar'>
        <div className='website_logo_wrapper'><img className='website_logo' src={accolite_logo}/></div>
        <div className='navlinksContainer'>
          {managerflag && <>
            <NavLink className="navlinks" to={"/mytrainings"} >My Trainings</NavLink>
            <NavLink className="navlinks" to={"/trainers"}>Trainers</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }

          {leadershipflag && <>
            <NavLink className="navlinks" to={"/leadership"}>Leadership</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </>
          }

          {superadminflag && <>
              <NavLink className="navlinks" to={"/admin"}>Users</NavLink> 
              <div className='notificationBadgeContainer'>
              <IoNotifications onClick={()=>{notificationCheck ? updatenotificationCheck(false):updatenotificationCheck(true)}} className="notification_icon"/>
                {notificationBadge && <p id="notificationBadge"></p>}
              </div>
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

            <div onClick={()=>{profileflag ? setProfileflag(false):setProfileflag(true)}} className="profile_div">
                <img className="profile_logo" src={userpicture} />
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