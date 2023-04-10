import React, { useContext, useEffect, useState } from 'react'
import Navbar from './common/Navbar'
import Mytrainings from './MyTrainings/Mytrainings'
import Trainers from './Trainers/Trainers';
import { Route,Routes,useNavigate } from 'react-router-dom';
import About from './About/About';
import Login from './Login/Login';
import AuthContext from './Contextapi/Authcontext';
import Users from './Admin/Users';
import User from './User/User';
import {Admin} from './Contextapi/Admincontext';

const Home = () => {
  const usecontext=useContext(AuthContext);
  const {isAuthenticated,emprole}=usecontext;
  const [managerflag,setManagerflag]=useState(false);
  const [leadershipflag,setLeadershipflag]=useState(false);
  const [superadminflag,setSuperadminflag]=useState(false);
  const [userflag,setUserflag]=useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(emprole!=="")
    {
        setManagerflag(false);
        setLeadershipflag(false);
        setSuperadminflag(false);
        setUserflag(false);
        console.log(emprole);
        switch(emprole)
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
    if(isAuthenticated)
    {
      navigate("/",true)
    }
    else{
      switch(emprole)
        {
          case 'manager':
            navigate("/mytrainings",true);
            break;
          case 'leadership':
            navigate("/mytrainings",true);
            break;
          case 'superadmin':
            navigate("/admin",true);
            break;
          case 'user':
            navigate("/user",true);
            break;
        }
    }
    // isAuthenticated?navigate("/",true):navigate("/mytrainings",true);
  },[isAuthenticated])

  return (
    <>
    {
      isAuthenticated ? (<Login/>) : <>
         {managerflag && <div>
            <Navbar role={emprole}/>
            <Routes>
              <Route path="/mytrainings" element={<Mytrainings />}/>
              <Route path="/trainers" element={<Trainers />}/>
              <Route path="/aboutus" element={<About />}/>
            </Routes>
        </div>}
        {leadershipflag && <div>
        <Navbar role={emprole}/>
        <h1>Leader ship</h1>
        </div>}
        {superadminflag && <Admin><div>
        <Navbar role={emprole}/>
        <Routes>
            <Route path="/admin" element={<Users />}/>
            {/* <Route path="/aboutus" element={<About />}/> */}
        </Routes>
        </div></Admin>}
        {userflag && <div>
        <Navbar role={emprole}/>
        <Routes>
          <Route path="/user" element={<User />}/>
          <Route path="/aboutus" element={<About />}/>
        </Routes>
        
        </div>} 
        </>
    }
    </>
  )
}

export default Home