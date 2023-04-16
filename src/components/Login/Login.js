import React from 'react'
import "../common/navbar.css"
import "./login.css"
import website_logo from "../../images/website_logo.png";
import accolite_logo from "../../images/Accolite.PNG";
import { NavLink } from 'react-router-dom';
import Loginwrapper from './Loginwrapper';
import About from '../About/About';
import { Route,Routes } from 'react-router-dom';

const Login = (props) => {
  return (
    <div className='loginContainer'>
        <nav className='navbar'>
            <div className='website_logo_wrapper'><img className='website_logo' src={accolite_logo} height={"90px"}/></div>
            <div className='navlinksContainer'>
                <NavLink className="navlinks" to={"/"}>LogIn</NavLink>
                <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </div>
        </nav>
        <Routes>
          <Route path="/" element={<Loginwrapper/>}/>
          <Route path="/aboutus" element={<About />}/>
        </Routes>
        
    </div>
  )
}

export default Login