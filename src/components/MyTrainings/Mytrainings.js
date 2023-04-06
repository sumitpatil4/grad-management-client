import React, { useState } from 'react'
import "../../styles/mytrainings/mytrainings.css"
import "../../styles/addTraining/popup.css"
import { GrAdd } from 'react-icons/gr';

const Mytrainings = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [arr, setArr] = useState(["training1","training2","training3","training4"])
  const [temp, setTemp] = useState("")
  const handleChange = event => {
    setTemp(event.target.value);
    
  };
  const handleClick = () => {
    setIsOpen(false);
    setArr(current => [...current, temp]);
    setTemp('')
  };

  return (
    <div className='mytrainingsContainer' >
        <h1>My&nbsp;Trainings</h1>
        <div className='mytrainings'>
          {arr.map((e)=><div>{e}</div>)}
          
          <div onClick={() => setIsOpen(true)}>
            <GrAdd className='add_icon'/>                           
            </div>
            
         </div>
        {isOpen && <div className="popup-boxd">

              <h2 className='newTrain' >Add New Training</h2>
              <div className="input-group">
                <label htmlFor="name">Name       </label>
                <input type="text" id="name" onChange={handleChange} value={temp} required/>
              </div>
              <button type="submit" className="submit-btn" onClick={handleClick}>
                Submit
              </button>
              <button type="reset" className="cancel-btn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>

        </div>}
    </div>
  )
}

export default Mytrainings