import React, { useContext, useState } from "react"

const Leadercontext=React.createContext();

export const Leader=(props)=>{

  const [managerInstance, setmanagerInstance] = useState([]);

  const updatemanagerInstance=(e)=> setmanagerInstance(e);

    return (
        <Leadercontext.Provider        
            value={{
                managerInstance,
                updatemanagerInstance,
            }}
        >
            {props.children}
        </Leadercontext.Provider>
    );
}

export default Leadercontext;