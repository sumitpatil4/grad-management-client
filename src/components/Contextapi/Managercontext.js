import React, { useContext, useState } from "react"

const ManagerContext=React.createContext();

export const Manager=(props)=>{
    
  const [train, setTrain] = useState();
  const [trainingsList, setTrainingsList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);
  const updateTrain=(e)=> setTrain(e);
  const updatetrainingsList=(e)=> setTrainingsList(e);
  const updateTrainerList=(e)=> setTrainerList(e);

    return (
        
        <ManagerContext.Provider        
            value={{
                train,
                trainingsList,
                trainerList,
                updateTrain,
                updatetrainingsList,
                updateTrainerList
            }}
        >
            {props.children}
        </ManagerContext.Provider>
    );
}

export default ManagerContext;