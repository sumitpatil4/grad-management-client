import React, { useContext, useEffect, useState } from 'react'
import "./mytrainings.css"
import { GrAdd, GrClose, GrEdit } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { MdEdit,MdDelete } from 'react-icons/md';
import { NavLink, Navigate ,useNavigate} from 'react-router-dom';
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';

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

  useEffect(()=>{
    axios.get(`http://localhost:8090/training/getTrainingById/${userid}`)
    .then((res)=>{
      console.log(res)
      updatetrainingsList(res.data.training);
      console.log(trainingsList)
    })
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
      // setArr(current => [...current, temp]);

      axios.post(`http://localhost:8090/training/createTraining/${userid}`,{
        "trainingName":temp
       }).then((res)=>{
        console.log(res);
        setUseeffectreload(!useeffectreload)
      })
      setTemp('');
    }
  };

// handle click event of the Remove button
const handleRem =  (i) => {
  // console.log(i);
  setArrId(i);
  setIsOpenCon(true);
}

const handleRemoveClick = (i) => {
  // const list = [...arr];
  // console.log(arrId);
  // list.splice(index, 1);
  // setArr(list);
  axios.delete(`http://localhost:8090/training/deleteTraining/${trainingsList[i].trainingId}`)
  .then((res)=>{
    console.log(res);
    setUseeffectreload(!useeffectreload);
  })
  setIsOpenCon(false);
  // console.log(list);
};


// handle click event of the Edit button
const handleEdit = (i) => {
  setArrId(i);
  setTemp(trainingsList[i].trainingName);
  setIsOpenEdit(true);
}

const handleEditClick = (i) => {
  // const list = [...arr];
  // console.log(arrId);
  // list[index] = temp;
  // setArr(list);
  axios.put("http://localhost:8090/training/updateTraining",{
    "trainingId":trainingsList[i].trainingId,
    "trainingName":temp
  }).then((res)=>{
    console.log(res);
    setUseeffectreload(!useeffectreload)
  })

  setIsOpenEdit(false);
  setTemp('');
};
const navigate = useNavigate();
  const navigatetotrainings=(e)=>{
    console.log(e)
    updateTrain(e);
    navigate("/mytrainings/training",true);
  }

  return (
    <div className='mytrainingsContainer' >
      <h1>My&nbsp;Trainings</h1>
      <div className='mytrainings'>
        
        {trainingsList.map((e, i)=> <div onClick={()=>navigatetotrainings(e)}> 
          <div className='iconContainer' >
            <div className='edit_icon_wrapper' onClick={(e) => {e.stopPropagation();handleEdit(i);}}>
              <MdEdit className='edit_icon'/>
            </div>
            <div onClick={(e) => {e.stopPropagation();handleRem(i);}}>
              <MdDelete className="close-icon"/>
            </div>
          </div> 
          <div className='trainingText'>{e.trainingName}</div>
        </div> )}
        
        <div className='trainingText' onClick={() => setIsOpen(true)}>
          <GrAdd className='add_icon'/>                           
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
        {isOpen && <form><div className='popupContainer'>
            <div className="popup-boxd">
              <div className='popupHeader'>
                <h2>Add New Training</h2>
              </div>
              <div className='inputContainer'>
                <div className="input-group">
                  <label htmlFor="name">Name </label>
                  <div>
                    <input type="text" id="name" onChange={handleChange} value={temp} required={true}/>
                    <p id="val">{validMsg}</p>
                  </div>                                                              
                </div>
              </div>
              <div className='buttonsContainer'>
                <button type="submit" className="submit-btn" onClick={handleClick}>
                 Submit
                </button>
                <button type="reset" className="cancel-btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
        </div></form>}

      {isOpenEdit && <form><div className='popupContainer'>
        <div className="popup-boxd">
          <div className='popupHeader'>
            <h2>Enter New Training Name</h2>
          </div>
            
        <div className='inputContainer'>
          <div className="input-group">
            <label htmlFor="name">Name </label>
            <div>
              <input type="text" id="name" onChange={handleChange} value={temp} />
              <p id="val">{validMsg}</p>     
            </div>                                                         
          </div>
        </div>

        <div className='buttonsContainer'>
          <button type="submit" className="submit-btn" onClick={() => handleEditClick(arrId)}>
            Submit
          </button>
          <button type="reset" className="cancel-btn" onClick={() => {setIsOpenEdit(false);setTemp('');}}>
            Cancel
          </button>
        </div>
      </div>
      </div></form>}
    </div>
  )
}

export default Mytrainings