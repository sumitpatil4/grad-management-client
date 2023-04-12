import React, { useContext, useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';
import "../common/Links";

const Loginwrapper = (props) => {

    const usecontext=useContext(AuthContext);

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id:"325496617382-4cf1o7rh21492bh5m4qjsvr3iciv6o8q.apps.googleusercontent.com",
            callback:handleLoginApi
        })
        google.accounts.id.renderButton(
            document.getElementById("LoginButton"),
            {
                theme:"outline",
                size:"large",
                type:"standard"
            }
        )
    },[])

    const {handleLogin,
          updateuserid,
          updateusername,
          updateusermail,
          updateuserpicture,
          updateaccessToken,
          updateidToken,
          updateuserrole}=usecontext;

    function handleLoginApi(response){
        console.log(response);
        // updateuserrole("ROLE_MANAGER");
        // handleLogin();
        window.localStorage.setItem('LoggedIn',"YES");
        axios.post("http://localhost:8090/user/login",null,{
            headers:{
                "Authorization":response.credential
            }
        }).then((res)=>{
            updateuserid(res.data.user.userId);
            updateusername(res.data.user.uname);
            updateusermail(res.data.user.email);
            updateuserpicture(res.data.user.picture);
            updateuserrole(res.data.user.role);
            updateaccessToken(res.data.accessToken);
            updateidToken(response);s
            handleLogin();
        })

    }

    return (
        <div className='loginWrapper'>
                <h2>Welcome</h2>
                <div className="google_btn" onClick={handleLoginApi}>
                    <div id="LoginButton"></div>
                </div>
            </div>
    )
}

export default Loginwrapper