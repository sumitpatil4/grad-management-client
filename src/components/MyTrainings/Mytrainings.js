import React from 'react'
import "../../styles/mytrainings/mytrainings.css"


const Mytrainings = () => {

  const arr=["training1","training2","training3","training4"]

  return (
    <div className='mytrainingsContainer' >
        <h1>My&nbsp;Trainings</h1>
        <div className='mytrainings'>
          {arr.map((e)=><div>{e}</div>)}
          <div>+</div>
        </div>
    </div>
  )
}

export default Mytrainings