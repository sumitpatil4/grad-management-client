import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const Loginwrapper = (props) => {

    const handleLogin=()=>{
        props.setLogin(false);
    }

  return (
    <div className='loginWrapper'>
            <h2>Welcome</h2>
            <div className="google_btn" onClick={handleLogin}>
                <div className="google-icon-wrapper">
                    <FcGoogle/>
                </div>
                <p className="btn-text"><b>Sign in with google</b></p>
            </div>
        </div>
  )
}

export default Loginwrapper