import React, { useContext, useState } from "react"

const InternContext=React.createContext();

export const Intern=(props)=>{

    const [internDetails, setInternDetails] = useState([]);
    const [internSchedulesList, setinternSchedulesList] = useState([]);
    const [internTopicList, setInternTopicList] = useState([]);
    const updateInternDetails = (e) => setInternDetails(e);
    const updateinternSchedulesList=(e)=> setinternSchedulesList(e);
    const updateInternTopicList=(e)=> setInternTopicList(e);



    return (
        <InternContext.Provider        
            value={{
                internDetails,
                updateInternDetails,
                internSchedulesList,
                updateinternSchedulesList,
                internTopicList,
                updateInternTopicList,
            }}
        >
            {props.children}
        </InternContext.Provider>
    );
}

export default InternContext;