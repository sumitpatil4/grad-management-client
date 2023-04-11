import React, { useState } from 'react'
import "./mytrainings.css"
import { GrAdd, GrClose, GrEdit } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { MdEdit,MdDelete } from 'react-icons/md';

const Mytrainings = () => {
  const [validMsg,setValidMsg] = useState("");
  const [arr, setArr] = useState(["Training1","Training2","Training3","Training4"])
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
          setValidMsg("");
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
  setTemp(arr[i]);
  setIsOpenEdit(true);
}

const handleEditClick = (index) => {
  const list = [...arr];
  console.log(arrId);
  list[index] = temp;
  setArr(list);
  setIsOpenEdit(false);
  console.log(list);
  setTemp('');
};

  return (
    <div className='mytrainingsContainer' >
      <h1>My&nbsp;Trainings</h1>
      <div className='mytrainings'>
        
        {arr.map((e, i)=> <div id={i}> 
          
          <div className='iconContainer'>
            <div id={i} className='edit_icon_wrapper' onClick={() => handleEdit(i)}>
              <MdEdit className='edit_icon'/>
            </div>
            <div id={i} onClick={()=>handleRem(i)}>
              <MdDelete className="close-icon"/>
            </div>
          </div> 
          <div className='trainingText'>{e}</div>

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