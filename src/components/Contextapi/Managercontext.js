import React, { useContext, useState } from "react"

const ManagerContext=React.createContext();

export const Manager=(props)=>{
    
  const [train, setTrain] = useState()
  const updateTrain=(e)=> setTrain(e);

    return (
        
        <ManagerContext.Provider        
            value={{
                train,
                updateTrain
            }}
        >
            {props.children}
        </ManagerContext.Provider>
    );
}

export default ManagerContext;