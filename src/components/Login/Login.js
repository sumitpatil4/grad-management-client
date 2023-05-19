import React,{useState} from 'react'
import "../common/navbar.css"
import "./login.css"
import website_logo from "../../images/website_logo.png";
import accolite_logo from "../../images/Accolite.PNG";
import { NavLink } from 'react-router-dom';
import menu_icon from "../../images/menu1.png"
import Loginwrapper from './Loginwrapper';
import About from '../About/About';
import { Route,Routes } from 'react-router-dom';
import Menu from '../common/menu';
import Error from '../common/Error';
const Login = (props) => {
  const [menuflag,setMenuflag]=useState(false);
  return (
    <div className='loginContainer'>
        <nav className='navbar'>
            <div className='website_logo_wrapper'><img className='website_logo' src={accolite_logo} height={"90px"}/></div>
            <div className='navlinksContainer'>
                <NavLink className="navlinks" to={"/"}>LogIn</NavLink>
                <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
            </div>

            <div onClick={()=>{menuflag ? setMenuflag(false):setMenuflag(true)}} className="menu_div">
              <img id="menu_icon" className="menu_logo" src={menu_icon}/>
            </div>
        </nav>
        {menuflag &&
        <div className='menu_layout'>
          <NavLink className="navlinks" to={"/"}>LogIn</NavLink>
          <NavLink className="navlinks" to={"/aboutus"}>AboutUs</NavLink>
        </div>}
        <Routes>
          <Route path="/" element={<Loginwrapper/>}/>
          <Route path="/aboutus" element={<About />}/>
          <Route path="/error" element={<Error />}/>
        </Routes>
    </div>
  )
}

export default Login