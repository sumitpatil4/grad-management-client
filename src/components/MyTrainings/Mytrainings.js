import React, { useContext, useEffect, useState } from 'react'
import "./mytrainings.css"
import { GrAdd, GrClose, GrEdit } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { MdEdit,MdDelete } from 'react-icons/md';
import { NavLink, Navigate ,useNavigate} from 'react-router-dom';
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';

const Mytrainings = () => {
  const [validMsg,setValidMsg] = useState("");
  const [arr, setArr] = useState(["Training1","Training2","Training3","Training4"])
  const [temp, setTemp] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenCon, setIsOpenCon] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [arrId, setArrId] = useState()
  const [useeffectreload, setUseeffectreload] = useState(false)
  const managercontext=useContext(ManagerContext);
  const authcontext=useContext(AuthContext);
  const {updateTrain,updatetrainingsList,trainingsList}=managercontext;
  const {userid}=authcontext;
  const [resPopUp,setResPopUp] = useState(false);
  const [resMessage,setResMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    setIsLoading(true);
    axios.get(`http://localhost:8090/training/getTrainingById/${userid}`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((res)=>{
      updatetrainingsList(res.data.training);
      setIsLoading(false);
    }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    });
  },[useeffectreload])

  const handleChange = event => {
    setTemp(event.target.value);  
  };

  const handleClick = () => {
    if(temp==""){
      setValidMsg("Invalid Name!!");
      setTimeout(()=>{
          setValidMsg("");
      },5000);
    }
    else{
      setIsOpen(false);
      setIsLoading(true);
      axios.post(`http://localhost:8090/training/createTraining/${userid}`,{
        "trainingName":temp
       },{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((res)=>{
         setUseeffectreload(!useeffectreload);
         setIsLoading(false);
      }).catch((err)=>{
          setResMessage(err.response.data.message);
          setResPopUp(true);
          setIsLoading(false);
      });
      setTemp('');
    }
  };

// handle click event of the Remove button
const handleRem =  (i) => {
  setArrId(i);
  setIsOpenCon(true);
}

const handleRemoveClick = (i) => {
  setIsLoading(true);
  axios.delete(`http://localhost:8090/training/deleteTraining/${trainingsList[i].trainingId}`,{
    headers:{
      "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  .then((res)=>{
    setUseeffectreload(!useeffectreload);
    setIsLoading(false);
  }).catch((err)=>{
      setResMessage(err.response.data.message);
      setResPopUp(true);
      setIsLoading(false);
  });
  setIsOpenCon(false);
};


// handle click event of the Edit button
const handleEdit = (i) => {
  setArrId(i);
  setTemp(trainingsList[i].trainingName);
  setIsOpenEdit(true);
}

const handleEditClick = (i) => {
  setIsLoading(true);
  axios.put("http://localhost:8090/training/updateTraining",{
    "trainingId":trainingsList[i].trainingId,
    "trainingName":temp
  },{
    headers:{
      "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then((res)=>{
    setUseeffectreload(!useeffectreload);
    setIsLoading(false);
  }).catch((err)=>{
      setResMessage(err.response.data.message);
      setResPopUp(true);
      setIsLoading(false);
  });

  setIsOpenEdit(false);
  setTemp('');
};
const navigate = useNavigate();
  const navigatetotrainings=(e)=>{
    updateTrain(e);
    navigate("/mytrainings/training",true);
  }

  return (
    <>
    {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
    <div className='mytrainingsContainer' >
      <h1>My&nbsp;Trainings</h1>
      <div className='mytrainings'>
        
        {trainingsList.map((e, i)=> <div title={`Go to ${e.trainingName}`} onClick={()=>{navigatetotrainings(e);updateTrain(e)}} key={i}> 
          <div className='iconContainer' >
            <div className='edit_icon_wrapper' onClick={(e) => {e.stopPropagation();handleEdit(i);}}>
              <MdEdit title='Edit Training' className='edit_icon'/>
            </div>
            <div title='Delete Training' onClick={(e) => {e.stopPropagation();handleRem(i);}}>
              <MdDelete className="close-icon"/>
            </div>
          </div> 
          <div className='trainingText'>{e.trainingName}</div>
        </div> )}    
        

        <div className='trainingText' onClick={() => setIsOpen(true)}>
          <GrAdd title='Add New Training' className='add_icon'/>                           
        </div>            
      </div>
        

      {isOpenCon && <div className='popupContainer'>
       <div className='popup-boxd'>
        <div className='popupHeader'>
          <h2>Are you sure to delete this training?</h2>
        </div>
          <div className='buttonsContainer'><button type="submit" className="submit-btn" onClick={() => handleRemoveClick(arrId)}>
            Yes
          </button>
          <button type="reset" className="cancel-btn" onClick={() => setIsOpenCon(false)}>
            No
          </button>
          </div>
        </div>
        </div>
        }
        {isOpen && <form onSubmit={handleClick}><div className='popupContainer'>
            <div className="popup-boxd">
              <div className='popupHeader'>
                <h2>Add New Training</h2>
              </div>
              <div className='inputContainer'>
                <div className="input-group">
                  <label htmlFor="name">Name </label>
                    <input type="text" id="name" 
                           pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                           title="Please enter a valid name" 
                           onChange={handleChange} 
                           value={temp} required={true}
                    />
                </div>
              </div>
              <div className='buttonsContainer'>
                <button type="submit" className="submit-btn" >
                 Submit
                </button>
                <button type="reset" className="cancel-btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
        </div></form>}

      {isOpenEdit && <form onSubmit={() => handleEditClick(arrId)}>
        <div className='popupContainer'>
        <div className="popup-boxd">
          <div className='popupHeader'>
            <h2>Enter New Training Name</h2>
          </div>
            
        <div className='inputContainer'>
          <div className="input-group">
            <label htmlFor="name">Name </label>
            <div>
              <input type="text" id="name"
                    pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                    title="Please enter a valid name" 
                    onChange={handleChange} value={temp} required={true}
              />
              <p id="val">{validMsg}</p>     
            </div>                                                         
          </div>
        </div>

        <div className='buttonsContainer'>
          <button type="submit" className="submit-btn" >
            Submit
          </button>
          <button type="reset" className="cancel-btn" onClick={() => {setIsOpenEdit(false);setTemp('');}}>
            Cancel
          </button>
        </div>
      </div>
      </div></form>}

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
    </div>
    </>
  )
}

export default Mytrainings