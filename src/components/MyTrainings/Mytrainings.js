import React from 'react'
import "../../styles/mytrainings/mytrainings.css"
import { GrAdd } from 'react-icons/gr';

const Mytrainings = () => {

  const arr=["training1","training2","training3","training4"]

  return (
    <div className='mytrainingsContainer' >
        <h1>My&nbsp;Trainings</h1>
        <div className='mytrainings'>
          {arr.map((e)=><div>{e}</div>)}
          <div><GrAdd className='add_icon'/></div>
        </div>
    </div>
  )
}

export default Mytrainings