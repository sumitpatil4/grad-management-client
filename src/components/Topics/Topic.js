import React, { useContext, useEffect, useState } from 'react'
import "./topic.css"
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from "axios";
const Topic = () => {
    const managercontext=useContext(ManagerContext);
    const {train,topicsList,updateTopicsList}=managercontext;
    const [completedList,setcompletedList]=useState([]);
    const [reamainingList,setreamainingList]=useState([]);
    const [completedCheck,setcompletedCheck]=useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [AddPopup, setAddPopup] = useState(false);
    const [editTopic, setEditTopic] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showinfo, setShowInfo] = useState(false);
    const [useeffectreload, setUseeffectreload] = useState(false)
    const [topicName,setTopicName] = useState("");
    const [topicTemp,setTopicTemp] = useState("");
    const [completePopup,setCompletePopup] = useState(false);
    const [compTemp,setCompTemp] = useState(null);
    const [remainingPopup,setRemainingPopup] = useState(false);
    const [topicMeetings,setTopicMeetings] = useState([]);


    useEffect(()=>{
        // settopicList([
        //     {topicId:1,topicName:"M Sai Krupananda",isCompleted:true},
        //     {topicId:2,topicName:"Ashish Tripathy",isCompleted:false},
        //     {topicId:3,topicName:"Sumit",isCompleted:true},
        //     {topicId:4,topicName:"Sai Krupananda",isCompleted:false},
        //     {topicId:5,topicName:"Sai Krupananda",isCompleted:true},
        //     {topicId:6,topicName:"Sai Krupananda",isCompleted:false},
        //     {topicId:7,topicName:"Sai Krupananda",isCompleted:true},
        //     {topicId:8,topicName:"Sai Krupananda",isCompleted:true},
        // ])
        axios.get(`http://localhost:8090/topic/getTopics/${train.trainingId}`)
        .then((res)=>{
          console.log(res);
          updateTopicsList(res.data.topicList);
          console.log(topicsList);
          setcompletedList(res.data.topicList.filter((t) => t.completed && t.active));
          setreamainingList(res.data.topicList.filter((t) => !t.completed && t.active));
          console.log(completedList);
          console.log(reamainingList);
        })
    },[useeffectreload])
    const activeClass=(e)=>{
        let btns = document.getElementsByClassName("topicBtns");
        let x=[...btns]
        x.forEach((t)=>t.className="topicBtns")
        e.target.className+=" active";
    }
    const unCompltedfilteredList = reamainingList.filter(
      (t) =>
          t.topicName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const compltedfilteredList = completedList.filter(
      (t) =>
          t.topicName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const handleTopicCompletion = () => {
    console.log(compTemp);
    axios.put(`http://localhost:8090/topic/updateCompleted/${compTemp.topicId}/0`)
    .then((res)=>{
      console.log(res);
      setUseeffectreload(!useeffectreload);
    })
    setCompletePopup(false);
  };
  const handleTopicUncompletion = () => {
    axios.put(`http://localhost:8090/topic/updateCompleted/${compTemp.topicId}/1`)
    .then((res)=>{
      console.log(res);
      setUseeffectreload(!useeffectreload);
    })
    setRemainingPopup(false);
  };
  const handleAdd = () =>{
      console.log(topicName);
      axios.post(`http://localhost:8090/topic/createTopic/${train.trainingId}`,{
        "topicName":topicName
    })
      .then((res)=>{
        console.log(res);
        setUseeffectreload(!useeffectreload);
      })
      setAddPopup(false);
  }
  const handleEditSubmit = ()=>{
    console.log(editTopic);
    axios.put(`http://localhost:8090/topic/updateTopic/${editTopic.topicId}`,{
      "topicName":editTopic.topicName
  }).then((res)=>{
    console.log(res);
    setUseeffectreload(!useeffectreload);
    setShowEditForm(false);
  })
  }
  const handleDelete = () =>{
    axios.delete(`http://localhost:8090/topic/deleteTopic/${deleteId}`)
    .then((res)=>{
      console.log(res);
      setUseeffectreload(!useeffectreload);
      setDeletePopup(false);
    })
  }



  const handleInfoPopup = (t) =>{
    setShowInfo(true);
    setTopicTemp(t);
    // axios.get(`http://localhost:8090/meetings/getMeeting/${t.topicId}`)
    // .then((res)=>{
    //   console.log(res.data.availability);
    //   setTopicMeetings(res.data.availability);
    //   console.log(userAvailability)
    // })
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
                <p
                  className="topicAdd"
                  onClick={(e) => {
                    setAddPopup(true);
                  }}
                >
                  Add&nbsp;Topic
                </p>
              </div>
            </div>
          </div>
          <div className="topicsdiv">

            {completedCheck &&
              (searchQuery !== "" ? compltedfilteredList : completedList).map(
                (t) => (
                  <div className="topicbar">
                    <form>
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => {
                          setCompletePopup(true);
                          setCompTemp(t);
                        }}
                      />
                    </form>
                    <p>{t.topicName}</p>
                    <div>
                      <BsFillInfoCircleFill
                        onClick={() => handleInfoPopup(t)}
                        className="info-icon"
                      />
                    </div>
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
                          setDeletePopup(true);
                          setDeleteId(t.topicId);
                        }}
                      />
                    </div>
                  </div>
                )
              )}

            {!completedCheck &&
              (searchQuery !== ""
                ? unCompltedfilteredList
                : reamainingList
              ).map((t) => (
                <div className="topicbar">
                  <form>
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => {
                        setRemainingPopup(true);
                        setCompTemp(t);
                      }}
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
                        setDeletePopup(true);
                        setDeleteId(t.topicId);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {completePopup && (
          <div className="popupContainer">
            <div className="popup-boxd">
              <div className="popupHeader">
                <h2>Are you sure you want to mark it as uncomplete?</h2>
              </div>
              <div className="buttonsContainer">
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleTopicCompletion}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setCompletePopup(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

{remainingPopup && (
          <div className="popupContainer">
            <div className="popup-boxd">
              <div className="popupHeader">
                <h2>Are you sure you want to mark it as &nbsp; complete?</h2>
              </div>
              <div className="buttonsContainer">
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleTopicUncompletion}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setRemainingPopup(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}


        {deletePopup && (
          <div className="popupContainer">
            <div className="popup-boxd">
              <div className="popupHeader">
                <h2>Are you sure to delete this topic?</h2>
              </div>
              <div className="buttonsContainer">
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  type="button"
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

        {showinfo && (
          <form>
            <div
              className="popupContainer1"
              onClick={() => {
                setShowInfo(false);
              }}
            >
              <div className="popup-boxd1" onClick={(e) => e.stopPropagation()}>
                <div className="popupHeader1">
                  <h2>Topic info</h2>
                </div>
                <div className="inputContainer1">
                  <div className="input-group1">
                    <label>Name </label>
                    <p>{topicTemp.topicName}</p>
                  </div>

                  <div className="input-group1">
                    <label>Meetings </label>
                    <div className="availability">
                      <table className="availablityTable">
                        <thead>
                          <tr className="availablitytr">
                            <th>Date</th>
                            <th>From&nbsp;Time</th>
                            <th>To&nbsp;Time</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {topicMeetings.map((item) => (
                        <tr className="topictr">
                          <td className="topictd">{item.date}</td>
                          <td className="topictd">{item.fromTime}</td>
                          <td className="topictd">{item.toTime}</td>
                          <td className="topictd">{item.description}</td>
                        </tr>
                      ))} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
                      <input
                        type="text"
                        id="topic-name"
                        value={editTopic.topicName}
                        onChange={(e) => {
                          setEditTopic({
                            ...editTopic,
                            topicName: e.target.value,
                          });
                        }}
                        />
                      {/* <p id="val">{validMsg}</p> */}
                    </div>
                  </div>
                </div>
                <div className="buttonsContainer">
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleEditSubmit}
                    >
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
            {/* <div
              className="popupContainer"
              onClick={() => {
                setAddPopup(false);
              }}
            > */}
              <div className="popupContainer">
                <div className="popup-boxd">
                  <div className="popupHeader">
                    <h2>Add Topic</h2>
                  </div>
                  <div className="inputContainer">
                    <div className="input-group">
                      <label htmlFor="name">Name </label>
                      <div>
                        <input
                          type="text"
                          id="topic-name"
                          onChange={(e) => setTopicName(e.target.value)}
                        />
                        {/* <p id="val">{validMsg}</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="buttonsContainer">
                    <button
                      type="button"
                      className="submit-btn"
                      onClick={(e) => {
                        handleAdd(e);
                      }}
                    >
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
            {/* </div> */}
          </form>
        )}
      </div>
    );
}
export default Topic;