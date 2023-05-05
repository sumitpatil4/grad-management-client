import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Contextapi/Authcontext';
import "./navbar.css";


const Error = () => {

    const usecontext=useContext(AuthContext);
    const {isAuthenticated,userrole}=usecontext;
    const navigate=useNavigate();

    const handleNavigate=()=>{
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

    return (
        <div className='errorContainer'>
            <h1>404</h1>
            <div>OOPS! NOTHING WAS FOUND</div>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <p onClick={handleNavigate} className='returnHome'>Return to Homepage</p>
        </div>
    )
}

export default Error