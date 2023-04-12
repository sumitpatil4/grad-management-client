import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import Mytrainings from '../MyTrainings/Mytrainings'
import Trainers from '../Trainers/Trainers';
import { Route,Routes,useNavigate } from 'react-router-dom';
import About from '../About/About';
import Login from '../Login/Login';
import AuthContext from '../Contextapi/Authcontext';
import Users from '../Admin/Users';
import User from '../User/User';
import {Admin} from '../Contextapi/Admincontext';
import {Manager} from "../Contextapi/Managercontext"
import Training from '../Training/Training';
import Interns from '../Interns/Intern';
import Topic from '../Topics/Topic';
import Schedules from '../Schedules/Schedules';

const Home = () => {
  const usecontext=useContext(AuthContext);
  const {isAuthenticated,userrole}=usecontext;
  const [managerflag,setManagerflag]=useState(false);
  const [leadershipflag,setLeadershipflag]=useState(false);
  const [superadminflag,setSuperadminflag]=useState(false);
  const [userflag,setUserflag]=useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(userrole!=="")
    {
        setManagerflag(false);
        setLeadershipflag(false);
        setSuperadminflag(false);
        setUserflag(false);
        // console.log(userrole);
        switch(userrole)
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
        }
    }
    // console.log(usecontext)
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
            navigate("/mytrainings",true);
            break;
          case 'ROLE_ADMIN':
            navigate("/admin",true);
            break;
          case 'ROLE_USER':
            navigate("/user",true);
            break;
        }
    }
  },[isAuthenticated])

  return (
    <>
    {
      !isAuthenticated ? (<Login/>) : <>
         {managerflag && <Manager><div>
            <Navbar role={userrole}/>
            <Routes>
              <Route path="/mytrainings" element={<Mytrainings />}/>
              <Route path="/mytrainings/training" element={<Training />}/>
              <Route path="/mytrainings/training/interns" element={<Interns />}/>
              <Route path="/mytrainings/training/topics" element={<Topic />}/>
              <Route path="/mytrainings/training/schedules" element={<Schedules />}/>
              <Route path="/trainers" element={<Trainers />}/>
              <Route path="/aboutus" element={<About />}/>
            </Routes>
        </div></Manager>}

        {leadershipflag && <div>
        <Navbar role={userrole}/>
        <h1>Leader ship</h1>
        </div>}

        {superadminflag && <Admin><div>
        <Navbar role={userrole}/>
        <Routes>
            <Route path="/admin" element={<Users />}/>
        </Routes>
        </div></Admin>}

        {userflag && <div>
        <Navbar role={userrole}/>
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