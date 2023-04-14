import React, { useContext, useState } from "react"

const ManagerContext=React.createContext();

export const Manager=(props)=>{
    
  const [train, setTrain] = useState();
  const [trainingsList, setTrainingsList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const updateTrain=(e)=> setTrain(e);
  const updatetrainingsList=(e)=> setTrainingsList(e);
  const updateTrainerList=(e)=> setTrainerList(e);
  const updateTopicsList=(e)=> setTopicsList(e);


    return (
        
        <ManagerContext.Provider        
            value={{
                train,
                trainingsList,
                trainerList,
                topicsList,
                updateTrain,
                updatetrainingsList,
                updateTrainerList,
                updateTopicsList
            }}
        >
            {props.children}
        </ManagerContext.Provider>
    );
}

export default ManagerContext;