import React, { useContext, useState } from "react"

const ManagerContext=React.createContext();

export const Manager=(props)=>{
    
  const [train, setTrain] = useState();
  const [trainingsList, setTrainingsList] = useState([]);
  const updateTrain=(e)=> setTrain(e);
  const updatetrainingsList=(e)=> setTrainingsList(e);

    return (
        
        <ManagerContext.Provider        
            value={{
                train,
                trainingsList,
                updateTrain,
                updatetrainingsList
            }}
        >
            {props.children}
        </ManagerContext.Provider>
    );
}

export default ManagerContext;