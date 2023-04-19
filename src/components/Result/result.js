import React, { useContext, useEffect, useState } from 'react'
import { MdEdit, MdDelete, MdOutlineAddCircle, MdOutlineAddCircleOutline, MdAddCircle } from 'react-icons/md';
import {BsFillInfoCircleFill} from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa';

const Result = () => {
    const [searchQuery,setSearchQuery] = useState("");  
    const [completedTopicsList,setCompletedTopicsList] = useState([]); 


    const filteredList = completedTopicsList.filter(
      (t) =>
          t.topicName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <h2 className='scheduleHeader'>Leadership</h2>
    <div className='scheduleContainer'>
        <div className="scheduleWrapper">
            <div className='scheduleNavbar'>
                <div className='SchbuttonsWrapper'>
                    <p className='headerText' >Completed Topics</p>
                </div>
                <div className="schsearchWrapper">
              <div className="buttonContainer3">
                <div className="search-bar2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <FaSearch className="searchIcon" />
                </div>
              </div>
            </div>
        </div>

        <div className='schedules'>        
            {/* {topicList.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topicName}</h3>
                </div>
            </div>
            )} */}
            {
              (searchQuery !== "" ? filteredList : completedTopicsList).map(
                (t) => (
                  <div className="topicbar">
                    <p>{t.topicName}</p>
                    <div>
                      <BsFillInfoCircleFill
                        className="info-icon"
                      />
                    </div>
                    <div>
                      <MdEdit
                        className="edit-icon"
                        
                      />
                    </div>
                    <div>
                      <MdDelete
                        className="del_icon"
                       
                      />
                    </div>
                  </div>
                )
              )}
            
        </div> 
    </div>
    <div className='scheduleDetails'>

            <h1>Ashish</h1>






    </div>
    </div>  

{/* {isOpenCon && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Are you sure to delete this schedule?</h2>
        </div>
        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn">
                Yes
            </button>
            <button type="reset" className="cancel-btn" >
                No
            </button>
        </div>
    </div>
</div>
} */}
</>        
    )
}

export default Result;