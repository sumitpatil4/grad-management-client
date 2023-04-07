import React, { useState, } from 'react'
import "../../styles/mytrainings/mytrainings.css"
import "../../styles/addTraining/popup.css"
import { GrAdd, GrClose, GrEdit } from 'react-icons/gr';
import { useEffect } from 'react';

const Mytrainings = () => {
  const [validMsg,setValidMsg] = useState("");
  const [arr, setArr] = useState(["training1","training2","training3","training4"])
  const [temp, setTemp] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenCon, setIsOpenCon] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [arrId, setArrId] = useState()


  const handleChange = event => {
    setTemp(event.target.value);
    
};

  const handleClick = () => {
    if(temp==""){
      setValidMsg("Invalid Name!!");
      setTimeout(()=>{
          document.getElementById("val").style.display="none";
      },5000);
    }
    else{
      setIsOpen(false);
      setArr(current => [...current, temp]);
      setTemp('');
    }
  };

// handle click event of the Remove button
const handleRem =  (i) => {
  // console.log(i);
  setArrId(i);
  setIsOpenCon(true);
}

const handleRemoveClick = (index) => {
  const list = [...arr];
  console.log(arrId);
  list.splice(index, 1);
  setArr(list);
  setIsOpenCon(false);
  console.log(list);
};


// handle click event of the Edit button
const handleEdit = (i) => {
  setArrId(i);
  setIsOpenEdit(true);
  setTemp(arr[arrId]);
}

const handleEditClick = (index) => {
  const list = [...arr];
  console.log(arrId);
  list[index] = temp;
  setArr(list);
  setIsOpenEdit(false);
  console.log(list);
};

  return (
    <div className='mytrainingsContainer' >
      <h1>My&nbsp;Trainings</h1>
      <div className='mytrainings'>
        
        {arr.map((e, i)=> <div id={i}> 
          
          <div >
            <div id={i} onClick={() => handleEdit(i)}>
            <GrEdit className='edit_icon' color='blue'/>                           
            </div>
            <div id={i} onClick={()=>handleRem(i)}>
            <GrClose className="close-icon" color='blue'/> </div>
              {e} 
          </div> 

        </div> )}
                        

        <div onClick={() => setIsOpen(true)}>
          <GrAdd className='add_icon'/>                           
        </div>            
      </div>
        

      {isOpen && <div className="popup-boxd">
          <div className='newTrain'>
          <h2>Add New Training</h2>
          </div>
            
          <div className="input-group">
            <label htmlFor="name">Name </label>
            <input type="text" id="name" onChange={handleChange} value={temp} />
            <p id="val">{validMsg}</p>                                                              
          </div>
          <div><button type="submit" className="submit-btn" onClick={handleClick}>
            Submit
          </button>
          <button type="reset" className="cancel-btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          </div>
            
      </div>}

      {isOpenCon && <div className='con-popup'>
        <div className='delTrain'>
        <h2>Are you sure to delete this training?</h2>
        </div>
          <div><button type="submit" className="submit-btn" onClick={() => handleRemoveClick(arrId)}>
            Yes
          </button>
          <button type="reset" className="cancel-btn" onClick={() => setIsOpenCon(false)}>
            No
          </button>
          </div>
        </div>}

      {isOpenEdit && <div className='popup-edit'>
        <div className='editTrain'>
        <h2>Enter New Training Name</h2>
        </div>
            
        <div className="input-group">
          <label htmlFor="name">Name </label>
          <input type="text" id="name" onChange={handleChange} value={temp} />
          <p id="val">{validMsg}</p>                                                              
        </div>
        <div><button type="submit" className="submit-btn" onClick={() => handleEditClick(arrId)}>
          Submit
        </button>
        <button type="reset" className="cancel-btn" onClick={() => setIsOpenEdit(false)}>
          Cancel
        </button>
        </div>
      </div>}
    </div>
  )
}

export default Mytrainings