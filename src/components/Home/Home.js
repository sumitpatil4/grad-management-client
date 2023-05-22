import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import Mytrainings from '../MyTrainings/Mytrainings'
import Trainers from '../Trainers/Trainers';
import { Route,Routes,useLocation,useNavigate } from 'react-router-dom';
import About from '../About/About';
import Login from '../Login/Login';
import AuthContext from '../Contextapi/Authcontext';
import Users from '../Admin/Users';
import User from '../User/User';
import {Admin} from '../Contextapi/Admincontext';
import {Manager} from "../Contextapi/Managercontext"
import {Intern} from "../Contextapi/InternContext"
import { Leader } from '../Contextapi/Leadercontext';
import Training from '../Training/Training';
import Interns from '../Interns/Interns';
import Topic from '../Topics/Topic';
import Schedules from '../Schedules/Schedules';
import Leadership from '../Leadership/Leadership';
import Result from '../Leadership/result';
import InternsView from '../InternsView/InternsView';
import Error from '../common/Error';

const Home = () => {
  const usecontext=useContext(AuthContext);
  const {isAuthenticated,userrole}=usecontext;
  const [managerflag,setManagerflag]=useState(false);
  const [leadershipflag,setLeadershipflag]=useState(false);
  const [superadminflag,setSuperadminflag]=useState(false);
  const [internFlag, setInternFlag] = useState(false);
  const [userflag,setUserflag]=useState(false);
  const navigate = useNavigate();
  const location=useLocation();
  
  useEffect(()=>{

    const routesArr=["/","/mytrainings","/mytrainings/training",
    "/mytrainings/training/interns","/mytrainings/training/topics",
    "/mytrainings/training/schedules","/trainers","/aboutus",
    "/leadership","/leadership/result","/intern","/admin","/user"
    ]

    if(routesArr.includes(location.pathname))
    {
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
    else {
      navigate("/error",true);
    }

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
    
  },[isAuthenticated])

  return (
    <>
    {
      !isAuthenticated ? (
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/error" element={<Error />}/>
        </Routes>
      ) : <>
         {managerflag && <Manager><div>
            <Navbar role={userrole}/>
            <Routes>
              <Route exact path="/mytrainings" element={<Mytrainings />}/>
              <Route exact path="/mytrainings/training" element={<Training />}/>
              <Route exact path="/mytrainings/training/interns" element={<Interns />}/>
              <Route exact path="/mytrainings/training/topics" element={<Topic />}/>
              <Route exact path="/mytrainings/training/schedules" element={<Schedules />}/>
              <Route exact path="/trainers" element={<Trainers />}/>
              <Route exact path="/aboutus" element={<About />}/>
              <Route exact path="/error" element={<Error />}/>
            </Routes>
        </div></Manager>}

        {leadershipflag && <Leader><div>
        <Navbar role={userrole}/>
        <Routes>
            <Route exact path="/leadership" element={<Leadership />}/>
            <Route exact path="/leadership/result" element={<Result />}/>
            <Route exact path="/aboutus" element={<About />}/>
            <Route exact path="/error" element={<Error />}/>
        </Routes>
        </div></Leader>}

        {internFlag && <Intern><div>
          <Navbar role={userrole}/>
          <Routes>
            <Route exact path="/intern" element={<InternsView />}/>
            <Route exact path="/aboutus" element={<About />}/>
            <Route exact path="/error" element={<Error />}/>
          </Routes>
          </div></Intern>}

        {superadminflag && <Admin><div>
        <Navbar role={userrole}/>
        <Routes>
            <Route exact path="/admin" element={<Users />}/>
            <Route exact path="/error" element={<Error />}/>
        </Routes>
        </div></Admin>}

        {userflag && <div>
        <Navbar role={userrole}/>
        <Routes>
          <Route exact path="/user" element={<User />}/>
          <Route exact path="/aboutus" element={<About />}/>
          <Route exact path="/error" element={<Error />}/>
        </Routes>
        
        </div>} 
        </>
    }
    
    </>
  )
}

export default Home