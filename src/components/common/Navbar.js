import React from 'react'
import website_logo from "../../website_logo.png";
import "../../styles/common/navbar.css"
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className='navbar'>
        <div className='website_logo'><img src={website_logo} height={"90px"}/></div>
        <div className='nav_links'>
            <div>
                <NavLink to={"/"}>MyTrainings</NavLink>
            </div>
            <div>
                <NavLink to={"/trainers"}>Trainers</NavLink>
            </div>
            <div><NavLink to={"/aboutus"}>AboutUs</NavLink></div>
            <div>Logout</div>
        </div>
    </nav>
  )
}

export default Navbar