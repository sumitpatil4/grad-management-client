import React, { useContext, useState } from "react"

const InternContext=React.createContext();

export const Intern=(props)=>{

  const [internSchedulesList, setinternSchedulesList] = useState([]);

  const updateinternSchedulesList=(e)=> setinternSchedulesList(e);



    return (
        <InternContext.Provider        
            value={{
                internSchedulesList,
                updateinternSchedulesList,
            }}
        >
            {props.children}
        </InternContext.Provider>
    );
}

export default InternContext;