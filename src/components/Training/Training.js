import React, { useContext } from 'react'
import ManagerContext from '../Contextapi/Managercontext';
import "./Training.css"

const Training = () => {

    const managercontext=useContext(ManagerContext);
    const {train}=managercontext;

    console.log(train)


    return (
        <div className='trainingsContainer'>
            <h1>{train}</h1>
            <div className='trainings'>
                
                    <div className='trainingText'><h3>INTERNS</h3></div>
                    <div className='trainingText'><h3>TOPICS</h3></div>
                    <div className='trainingText'><h3>SCHEDULE</h3></div>
                
            </div>
        </div>
        
    )
}

export default Training;