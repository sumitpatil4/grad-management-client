import React, { useState } from "react"

const ManagerContext=React.createContext();

export const Manager=()=>{
    
  const [train, setTrain] = useState()
  const updateTrain=(e)=> setTrain(e);

    return (
        
        <ManagerContext.Provider
        
            value={{
                train,
                setTrain,
                updateTrain
            }}
        >
            {/* {props.children} */}
        </ManagerContext.Provider>
    );
}

export default ManagerContext;