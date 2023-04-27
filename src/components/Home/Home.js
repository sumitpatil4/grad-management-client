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
import {Intern} from "../Contextapi/InternContext"
import Training from '../Training/Training';
import Interns from '../Interns/Interns';
import Topic from '../Topics/Topic';
import Schedules from '../Schedules/Schedules';
import Leadership from '../Leadership/Leadership';
import Result from '../Result/result';
import InternsView from '../InternsView/InternsView';

const Home = () => {
  const usecontext=useContext(AuthContext);
  const {isAuthenticated,userrole}=usecontext;
  const [managerflag,setManagerflag]=useState(false);
  const [leadershipflag,setLeadershipflag]=useState(false);
  const [superadminflag,setSuperadminflag]=useState(false);
  const [internFlag, setInternFlag] = useState(false);
  const [userflag,setUserflag]=useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(userrole!=="")
    {
        setManagerflag(false);
        setLeadershipflag(false);
        setSuperadminflag(false);
        setUserflag(false);
        setInternFlag(false);
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
          case 'ROLE_INTERN':
            setInternFlag(true);
            break;
        }
    }
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
        <Routes>
            <Route path="/leadership" element={<Leadership />}/>
            <Route path="/leadership/result" element={<Result />}/>
        </Routes>
        </div>}

        {internFlag && <Intern><div>
          <Navbar role={userrole}/>
          <Routes>
            <Route path="/intern" element={<InternsView />}/>
            <Route path="/aboutus" element={<About />}/>
          </Routes>
          </div></Intern>}

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