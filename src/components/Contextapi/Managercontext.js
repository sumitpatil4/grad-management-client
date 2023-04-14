import React, { useContext, useState } from "react"

const ManagerContext=React.createContext();

export const Manager=(props)=>{
    
  const [train, setTrain] = useState();
  const [trainingsList, setTrainingsList] = useState([]);
  const [internsList, setInternsList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const updateTrain=(e)=> setTrain(e);
  const updatetrainingsList=(e)=> setTrainingsList(e);
  const updateinternsList=(e)=> setInternsList(e);
  const updategroupsList=(e)=> setGroupsList(e);

    return (
        <ManagerContext.Provider        
            value={{
                train,
                trainingsList,
                internsList,
                groupsList,
                updateTrain,
                updatetrainingsList,
                updateinternsList,
                updategroupsList
            }}
        >
            {props.children}
        </ManagerContext.Provider>
    );
}

export default ManagerContext;