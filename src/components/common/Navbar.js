import React, { useState } from 'react'
import website_logo from "../../images/website_logo.png";
import "../../styles/common/navbar.css"
import { NavLink } from 'react-router-dom';
import profile from "../../images/profile.svg"
import Profile from './Profile';

const Navbar = (props) => {

  const [profileflag,setProfileflag]=useState(false);

  return (
    <>
    <nav className='navbar'>
        <div className='website_logo_wrapper'><img className='website_logo' src={website_logo}/></div>
        <div className='navlinksContainer'>
            <NavLink className="navlinks" to={"/"}>MyTrainings</NavLink>
            <NavLink className="navlinks" to={"/trainers"}>Trainers</NavLink>
            <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            <div onClick={()=>{profileflag ? setProfileflag(false):setProfileflag(true)}} className="profile_div">
                <img className="profile_logo" src={profile} alt="profile_logo"/>
            </div>
        </div>
    </nav>
    {
      profileflag && <Profile handlelogout={(e)=>props.handleLogout(e)}/>
    }
    </>
  )
}

export default Navbar