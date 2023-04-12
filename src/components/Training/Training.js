import React, { useContext } from 'react'
import ManagerContext from '../Contextapi/Managercontext';
import "./Training.css"
import { NavLink } from 'react-router-dom';

const Training = () => {

    const managercontext=useContext(ManagerContext);
    const {train}=managercontext;

    console.log(train)

    


    return (
        <div className='trainingsContainer'>
            <h1>{train}</h1>
            <div className='trainings'>              
          
                    <div >
                        <NavLink to={"/mytrainings/training/interns"} >
                            <div className='trainText'>
                                <h3>INTERNS</h3>
                            </div>
                        </NavLink>
                    </div>
                    <div >
                        <NavLink to={"/mytrainings/training/topics"} >
                            <div className='trainText'>
                                <h3>TOPICS</h3>
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/mytrainings/training/schedules"} >
                            <div className='trainText'>
                                <h3>SCHEDULE</h3>
                            </div>
                        </NavLink>
                    </div>
            </div>
        </div>
    )
}

export default Training;