import React, { useContext, useEffect, useState } from 'react'
import "./topic.css"
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from "axios";
import { PuffLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io';

const Topic = () => {
    const navigate=useNavigate();
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
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);


    useEffect(()=>{
      setIsLoading(true);
        axios.get(`http://localhost:8090/topic/getTopics/${train.trainingId}`,{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then((res)=>{
          updateTopicsList(res.data.topicList);
          setcompletedList(res.data.topicList.filter((t) => t.completed && t.active));
          setreamainingList(res.data.topicList.filter((t) => !t.completed && t.active));
          setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
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
    setIsLoading(true);
    axios.put(`http://localhost:8090/topic/updateCompleted/${compTemp.topicId}/0`,null,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((res)=>{
      setUseeffectreload(!useeffectreload);
      setIsLoading(false);
    }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    });
    setCompletePopup(false);
  };
  const handleTopicUncompletion = () => {
    setIsLoading(true);
    axios.put(`http://localhost:8090/topic/updateCompleted/${compTemp.topicId}/1`,null,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((res)=>{
      setUseeffectreload(!useeffectreload);
      setIsLoading(false);
    }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    });
    setRemainingPopup(false);
  };
  const handleAdd = () =>{
      setIsLoading(true);
      axios.post(`http://localhost:8090/topic/createTopic/${train.trainingId}`,{
        "topicName":topicName
      },{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((res)=>{
        setUseeffectreload(!useeffectreload);
        setIsLoading(false);
      }).catch((err)=>{
          setResMessage(err.response.data.message);
          setResPopUp(true);
          setIsLoading(false);
      });
      setAddPopup(false);
  }
  const handleEditSubmit = ()=>{
    setIsLoading(true);
    axios.put(`http://localhost:8090/topic/updateTopic/${editTopic.topicId}`,{
      "topicName":editTopic.topicName
    },{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res)=>{
      setUseeffectreload(!useeffectreload);
      setShowEditForm(false);
      setIsLoading(false);
    }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    });
  }
  const handleDelete = () =>{
    setIsLoading(true);
    axios.delete(`http://localhost:8090/topic/deleteTopic/${deleteId}`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((res)=>{
      setUseeffectreload(!useeffectreload);
      setDeletePopup(false);
      setIsLoading(false);
    }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    });
  }


  const handleInfoPopup = (t) =>{
    setShowInfo(true);
    setTopicTemp(t);
    setIsLoading(true);
    axios.get(`http://localhost:8090/meeting/getMeetings/${train.trainingId}`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((res)=>{
      const filteredRes=res.data.meeting.filter((meet)=>meet.topic.topicId===t.topicId)
      setTopicMeetings(filteredRes);
      setIsLoading(false);
    }).catch((err)=>{
      setResMessage(err.response.data.message);
      setResPopUp(true);
      setIsLoading(false);
  });
  }

    return (
      <>
      {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
      <div className="topicContainer">
        <div className="topicWrapper">
          <div className='internHeader' style={{width:"54.8vw"}}>
                <span><IoMdArrowRoundBack onClick={()=>navigate(-1)} className='backButton'/></span>
                <h2>Topics</h2>
          </div>
          <div className="topicNavbar">
            <div className="buttonsWrapper">
              <p
                onClick={(e) => { setcompletedCheck(false); activeClass(e); }}
                className="topicBtns active"
              >
                Remaining
              </p>
              <p
                onClick={(e) => {setcompletedCheck(true); activeClass(e); }}
                className="topicBtns"
              >
                Completed
              </p>
            </div>
            <div className="searchWrapper">
              <div className="buttonContainer3">
                <div className="search-bar2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="searchdiv">
                  <FaSearch className="searchIcon" />
                </div>
              </div>
              <div>
                <p className="topicAdd" onClick={(e) => {setAddPopup(true); }} >
                  Add&nbsp;Topic
                </p>
              </div>
            </div>
          </div>
          <div className="topicsdiv">

            {completedCheck &&
              (searchQuery !== "" ? compltedfilteredList : completedList).map((t,i) => (
                  <div className="topicbar" key={i}>
                    <form>
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => { setCompletePopup(true); setCompTemp(t); }}
                      />
                    </form>
                    <p>{t.topicName}</p>
                    <div>
                      <BsFillInfoCircleFill onClick={() => handleInfoPopup(t)} className="info-icon" />
                    </div>
                    <div>
                      <MdEdit
                        className="edit-icon"
                        onClick={() => {setEditTopic(t);setShowEditForm(true);}}
                      />
                    </div>
                    <div>
                      <MdDelete
                        className="del_icon"
                        onClick={() => {setDeletePopup(true);setDeleteId(t.topicId);}}
                      />
                    </div>
                  </div>
                )
              )}

            {!completedCheck &&
              (searchQuery !== "" ? unCompltedfilteredList : reamainingList).map((t,i) => (
                <div className="topicbar" key={i}>
                  <form>
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => {setRemainingPopup(true);setCompTemp(t);}}
                    />
                  </form>
                  <p>{t.topicName}</p>
                  <div></div>
                  <div>
                    <MdEdit
                      className="edit-icon"
                      onClick={() => {setEditTopic(t);setShowEditForm(true);}}
                    />
                  </div>
                  <div>
                    <MdDelete
                      className="del_icon"
                      onClick={() => {setDeletePopup(true);setDeleteId(t.topicId);}}
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
                <h2>Mark it as Uncomplete</h2>
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
                  onClick={() => {setCompletePopup(false);}}
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
                <h2>Mark it as Complete</h2>
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
                  onClick={() => {setRemainingPopup(false); }}>
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
                  onClick={() => {setDeletePopup(false);}}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showinfo && (
          <form>
            <div className="popupContainer" onClick={() => {setShowInfo(false);}} >
              <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
                <div className="popupHeader">
                  <h2>Scheduled Date & Time</h2>
                </div>
                  <div className="availabilityContainer">
                  <h2>{topicTemp.topicName}</h2>
                  <div className="availability">
                  <table className="popuptable">
                    <thead className="popuphead">
                      <tr className="popuptr">
                        <th className="popupth">Date</th>
                        <th className="popupth">From&nbsp;Time</th>
                        <th className="popupth">To&nbsp;Time</th>
                      </tr>
                    </thead>
                        <tbody className="popupbody">
                          {topicMeetings.map((meet,i)=>
                          <tr key={i} className="popuptr">
                            <td className="popuptd">{meet.date}</td>
                            <td className="popuptd">{meet.fromTime}</td>
                            <td className="popuptd">{meet.toTime}</td>
                          </tr>)
                        }
                        </tbody>
                      </table>
                    </div>
                </div>
                <div className="buttonsContainer">
                  <button type="button" onClick={()=>setShowInfo(false)}>
                       Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {showEditForm && (
          <form onSubmit={(e)=>{e.preventDefault();handleEditSubmit()}}>

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
                        onChange={(e) => {setEditTopic({ ...editTopic, topicName: e.target.value,});}}
                        required={true}
                      />
                      {/* <p id="val">{validMsg}</p> */}
                    </div>
                  </div>
                </div>
                <div className="buttonsContainer">
                  <button
                    type="submit"
                    className="submit-btn"
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
          <form onSubmit={(e) => {handleAdd(e); }}>

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
                          required={true}
                        />
                        {/* <p id="val">{validMsg}</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="buttonsContainer">
                    <button
                      type="submit"
                      className="submit-btn"
                    >
                      Submit
                    </button>
                    <button
                      type="reset"
                      className="cancel-btn"
                      onClick={() => setAddPopup(false)} >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

          </form>
        )}
      </div>

      {resPopUp && <div className='popupContainer'>
            <div className='popup-boxd'>
                <div className='popupHeader'>
                <h2>Opps Something went wrong!!</h2>
                </div>
                <div className='msgContainer'>
                    <p>{resMessage}</p>
                </div>
                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" onClick={() => setResPopUp(false)}>
                    Ok
                    </button>
                </div>
            </div>
            </div>}
      </>
    );
}
export default Topic;