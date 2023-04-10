import React, { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../Contextapi/Authcontext';

const Loginwrapper = (props) => {

    const usecontext=useContext(AuthContext);
    const {handleLogin,
        updateempid,
        updateempname,
        updateempmail,
        updateemppicture,
        updateemprole}=usecontext;

    const handleLoginApi=()=>{
            //call google api here and store in db get response
            //using response update emp_details to auth contextapi
            updateemprole("manager")
            handleLogin();
    }

    return (
        <div className='loginWrapper'>
                <h2>Welcome</h2>
                <div className="google_btn" onClick={handleLoginApi}>
                    <div className="google-icon-wrapper">
                        <FcGoogle/>
                    </div>
                    <p className="btn-text"><b>Sign in with google</b></p>
                </div>
            </div>
    )
}

export default Loginwrapper