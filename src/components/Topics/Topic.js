// import "./topic.css";
// import React, { useState ,useContext, useEffect} from "react";
// import { FaSearch, FaUserAlt } from "react-icons/fa";
// import { ImCheckboxChecked } from "react-icons/im";
// import { MdEdit, MdDelete } from "react-icons/md";

// const Topic = () => {

    

//     const [searchQuery,setSearchQuery] = useState("");
//     const [checkValue,setCheckValue] = useState();
//     const [showAllTopics, setShowAllTopics] = useState(false);
//     const [filter, setFilter] = useState("All"); 

//     const [topics, setTopics] = useState([
//         {
//             topicId:1,
//             topicName:"Java Core"
//         },
//         {
//             topicId:2,
//             topicName:"Advanced Java"
//         },
//         {
//             topicId:3,
//             topicName:"Multithreading"
//         },
//         {
//             topicId:4,
//             topicName:"Generics"
//         },
//       ]);

//       const handleAddPopup = () => {

//       }



//       const handleEditPopup = () => {

//       }

 


//         const handleShowAllTopics = () => {
//             setShowAllTopics(true);
//           }; 

//           const handleDeletePopup = (topicId) => {
//             setTopics(topics.filter((topic) => topic.topicId !== topicId));
//           };
        
//           const handleCheckbox = (topicId) => {
//             setTopics(
//               topics.map((topic) =>
//                 topic.topicId === topicId ? { ...topic, completed: !topic.completed } : topic
//               )
//             );
//           };

//           const filteredTopics = topics.filter((topic) => {
//             if (filter === "All") {
//               return true; 
//             } else if (filter === "Completed") {
//               return topic.completed; 
//             } else {
//               return !topic.completed; 
//             }
//         });
   
//     return (
//       <>
//         <div className="topicContainer">
//           <div className="heading">
//              <div>
//                 <button className="comp-button"  onClick={() => setFilter("All")}
//               disabled={filter === "All"}>
//                   ALL
//                 </button>
//               </div>
//               <div>
//                 <button className="comp-button" onClick={() => setFilter("Completed")}
//               disabled={filter === "Completed"}>
//                   Completed
//                 </button>
//               </div>
//               <div>
//                 <button className="comp-button" onClick={() => setFilter("NotCompleted")}
//               disabled={filter === "NotCompleted"}
// >
//                   NotCompleted
//                 </button>
//               </div>
//               <div>
//                 <button className="addbutton" onClick={handleAddPopup}>
//                   Add&nbsp;Topic
//                 </button>
//               </div>

//               <div className="searchbar">
//                 <input
//                   type="text"
//                   placeholder="Search..."
                  
//                 />
//                 <button type="submit" >
//                   <FaSearch />
//                 </button>
//               </div>
//             </div>
//           <div className="topicContents">
//           {filteredTopics.map((topic) => (
//             <div key={topic.topicId} className="topic">
//               <div className="topicCheckbox">
//                 <input
//                   type="checkbox"
//                   checked={topic.completed}
//                   onChange={() => handleCheckbox(topic.topicId)}
//                 />
//                 <label>{topic.topicName}</label>
//               </div>
//               <div className="topicButtons">
//                      <MdEdit
//                         onClick={() => handleEditPopup(topic)}
//                         className="edit-icon"
//                       />
//                       <MdDelete
//                         onClick={() =>  handleDeletePopup(topic.topicId)}
//                         className="del_icon"
//                       />
//               </div>
//             </div>
//           ))}
//           </div>
//         </div>
//       </>
//     );


//   }         

// export default Topic;

import React, { useContext, useEffect, useState } from 'react'
import "./topic.css"
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const Topic = () => {

    const [topicList,settopicList]=useState([]);
    const [completedList,setcompletedList]=useState([]);
    const [reamainingList,setreamainingList]=useState([]);
    const [completedCheck,setcompletedCheck]=useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [AddPopup, setAddPopup] = useState(false);
    const [editTopic, setEditTopic] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);


    useEffect(()=>{
        settopicList([
            {topicId:1,topicName:"M Sai Krupananda",isCompleted:true},
            {topicId:2,topicName:"Ashish Tripathy",isCompleted:false},
            {topicId:3,topicName:"Sumit",isCompleted:true},
            {topicId:4,topicName:"Sai Krupananda",isCompleted:false},
            {topicId:5,topicName:"Sai Krupananda",isCompleted:true},
            {topicId:6,topicName:"Sai Krupananda",isCompleted:false},
            {topicId:7,topicName:"Sai Krupananda",isCompleted:true},
            {topicId:8,topicName:"Sai Krupananda",isCompleted:true},
        ])

        setcompletedList(filteredList.filter((t) => t.isCompleted));
        setreamainingList(filteredList.filter((t) => !t.isCompleted));
        
    },[topicList])

    

    const activeClass=(e)=>{
        let btns = document.getElementsByClassName("topicBtns");
        let x=[...btns]
        x.forEach((t)=>t.className="topicBtns")
        e.target.className+=" active";
    }

    const filteredList = topicList.filter(
      (t) =>
          t.topicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTopicCompletion = (topic) => {
    const updatedTopicList = topicList.map((t) => {
      if (t.id === topic.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    settopicList(updatedTopicList);
  };


  const handleAdd = (topic) =>{
    const updateRemainingList = topicList.map((t) => {
      if (t.topicName != topic.topicName){
        // setreamainingList[...remainingList,topic]
      }
    })

  }
  



    return (
      <div className="topicContainer">
        <div className="topicWrapper">
          <h2>Topics</h2>
          <div className="topicNavbar">
            <div className="buttonsWrapper">
              <p
                onClick={(e) => {
                  setcompletedCheck(true);
                  activeClass(e);
                }}
                className="topicBtns"
              >
                Completed
              </p>
              <p
                onClick={(e) => {
                  setcompletedCheck(false);
                  activeClass(e);
                }}
                className="topicBtns active"
              >
                Remaining
              </p>
            </div>
            <div className="searchWrapper">
              <div className="buttonContainer2">
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
              <div>
                <p className="topicAdd"
                            onClick={(e) => {
                              setAddPopup(true);
                            }}
                >Add&nbsp;Topic</p>
              </div>
            </div>
          </div>
          <div className="topicsdiv">
            {completedCheck &&
              completedList.map((t) => (
                <div className="topicbar">
                  <form>
                    <input
                      type="checkbox"
                      checked={t.isCompleted}
                      onChange={() => handleTopicCompletion(t)}
                    />
                  </form>
                  <p>{t.topicName}</p>
                  <div>
                    <MdEdit
                      className="edit-icon"
                      onClick={() => {
                        setEditTopic(t);
                        setShowEditForm(true);
                      }}
                      />
                  </div>
                  <div>
                    <MdDelete
                      className="del_icon"
                      onClick={() => {
                        setDeleteId(t.topicId);
                        setDeletePopup(true);
                      }}
                    />
                  </div>
                </div>
              ))}
            {!completedCheck &&
              reamainingList.map((t) => (
                <div className="topicbar">
                  <form>
                    <input type="checkbox" />
                  </form>
                  <p>{t.topicName}</p>
                  <div>
                    <MdEdit className="edit-icon" />
                  </div>
                  <div>
                    <MdDelete className="del_icon" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {deletePopup && (
          <div className="popupContainer">
            <div className="popup-boxd">
              <div className="popupHeader">
                <h2>Are you sure to delete this user?</h2>
              </div>
              <div className="buttonsContainer">
                <button
                  type="submit"
                  className="submit-btn"
                  onClick={() => {
                    settopicList(
                      topicList.filter((t) => t.topicId !== deleteId)
                    );
                    setDeletePopup(false);
                  }}
                  >
                  Yes
                </button>
                <button
                  type="reset"
                  className="cancel-btn"
                  onClick={() => {
                    setDeletePopup(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditForm && (
          <form>
            <div className="popupContainer">
              <div className="popup-boxd">
                <div className="popupHeader">
                  <h2>Edit Topic</h2>
                </div>
                <div className="inputContainer">
                  <div className="input-group">
                    <label htmlFor="name">Name </label>
                    <div>
                    <input type="text" id="topic-name" value={editTopic.topicName} onChange={(e) => {
                      setEditTopic({
                    ...editTopic,
                    topicName: e.target.value
                });
            }} />
                      {/* <p id="val">{validMsg}</p> */}
                    </div>
                  </div>
                </div>
                <div className="buttonsContainer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      // update the topic in the list
                      // setTopicList(topicList.map((t) => t.topicId === editTopic.topicId ? editTopic : t));
                      // close the edit form popup
                      setShowEditForm(false);
                    }}>
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="cancel-btn"
                    onClick={() => setShowEditForm(false)}
                    >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}


{AddPopup && (
  <form>
            <div className="popupContainer">
              <div className="popup-boxd">
                <div className="popupHeader">
                  <h2>Add Topic</h2>
                </div>
                <div className="inputContainer">
                  <div className="input-group">
                    <label htmlFor="name">Name </label>
                    <div>
                    <input type="text" id="topic-name" />
                      {/* <p id="val">{validMsg}</p> */}
                    </div>
                  </div>
                </div>
                <div className="buttonsContainer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setAddPopup(false);
                      handleAdd(e);
                    }}>
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="cancel-btn"
                    onClick={() => setAddPopup(false)}
                    >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}


        </div>
    );
}

export default Topic;