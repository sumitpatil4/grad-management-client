import React, { useContext, useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';
import "../common/Links";
import { PuffLoader,ClipLoader } from 'react-spinners';

const Loginwrapper = (props) => {

    const usecontext=useContext(AuthContext);
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id:"994239778897-qed7j3c4duls2vsten5eaqj5vsi13na0.apps.googleusercontent.com",
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
        // updateuserrole("ROLE_INTERN");
        // handleLogin();
        setIsLoading(true);
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
            updateidToken(response.credential);
            localStorage.setItem('accessToken',res.data.accessToken);
            localStorage.setItem('IDToken',response.credential);
            localStorage.setItem('userId',res.data.user.userId);
            handleLogin();
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        })
    }

    return (
        <>
            {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
            <div className='loginWrapper'>
                <h2>GRAD MANAGEMENT SYSTEM</h2>
                <div className="google_btn">
                    <div id="LoginButton"></div>
                </div>
            </div>

            {resPopUp && <div className='popupContainer'>
                <div className='popup-boxd'>
                    <div className='popupHeader'>
                    <h2>Opps Something went wrong!!</h2>
                    </div>
                    <div className='msgContainer'>
                        <p>{resMessage}</p>
                    </div>
                    <div className='buttonsContainer'>
                        <button type="submit" className="submit-btn" onClick={() => setResPopUp(false)}>
                            Ok
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Loginwrapper