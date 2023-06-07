import React, { useContext, useEffect, useRef, useState } from 'react'
import "./topic.css"
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { TbReportAnalytics, TbHistory } from 'react-icons/tb';
import { BsFillInfoCircleFill } from "react-icons/bs";
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from "axios";
import { PuffLoader } from 'react-spinners';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io';
import * as XLSX from "xlsx";
import { Chart } from "react-google-charts";


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
    const fileInput = useRef(null);
    const [uploadPopUp,setuploadPopUp] = useState(false);
    const [topicInstance,settopicInstance]=useState({});
    const [maxScore,setmaxScore]=useState("");
    const [uploaded, setUploaded] = useState(false);
    const [showMeets, setShowMeets] = useState(false);
    const [showScores, setshowScores] = useState(false);
    const [allScores,setallScores] = useState([]);
    const [data,setdata] = useState([
      ["Category", "No Of Interns"],
      ["Above (75%)", 0],
      ["Between (50-75%)", 0],
      ["Below (50%)", 0],
    ]);

    const getScores=(topicId)=>{
      setIsLoading(true);
      axios.get(`http://localhost:8090/scores/getScores/${topicId}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then((res)=>{
        setallScores(res.data.batch.sort((a,b)=>b.score-a.score))
        setIsLoading(false);
        let cnt1=0,cnt2=0,cnt3=0;
        res.data.batch.forEach((scr)=>{
          let percentage=(scr.score*100)/scr.totalScore;
          if(percentage>=75)
            cnt1++;
          else if(percentage>=50 && percentage<75)
            cnt2++;
          else if(percentage<50)
            cnt3++;
        })
        data[1][1]=cnt1;
        data[2][1]=cnt2;
        data[3][1]=cnt3;
        setdata(data);
      });
    }

    const handleScores=(topic)=>{
      setdata([
        ["Category", "No Of Interns"],
        ["Above (75%)", 0],
        ["Between (50-75%)", 0],
        ["Below (50%)", 0],
      ])
      setShowMeets(false);
      setshowScores(true);
      setallScores([])
      settopicInstance(topicTemp);
      getScores(topicTemp.topicId)
    }

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
    setShowMeets(true);
    setshowScores(false);
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

  const handleMeets = () => {
    setShowMeets(true);
    setshowScores(false);
  }

  const handleFileSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior
    ScoresExcel(fileInput.current.files[0]);
    
  };

  const ScoresExcel = (file) => {
    setuploadPopUp(false);
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const scoresData = XLSX.utils.sheet_to_json(worksheet);
      console.log(scoresData)
      const idList=[],scoresList=[]
      setIsLoading(true);
      axios.get(`http://localhost:8090/meeting/getMeetings/${train.trainingId}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then((res)=>{
        console.log(res)
        const filteredRes=res.data.meeting.filter((meet)=>meet.topic.topicId===topicInstance.topicId)
        console.log(filteredRes)
        const batchArr=[];
          filteredRes.forEach((rec)=>{
            rec.batchList.forEach((bcth)=>{
              if(!batchArr.includes(bcth.batchId))
                batchArr.push(bcth.batchId)
            })
          })

          console.log(batchArr)

          axios.get(`http://localhost:8090/intern/getInterns/${train.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then((interns)=>{
              scoresData.forEach((record)=>{
              const row=interns.data.intern.filter((x)=>x.email===record.Email && batchArr.includes(x.batch.batchId))
              if(row.length===1)
              {
                  idList.push(row[0].internId);
                  scoresList.push(parseInt(record.Scores));
              }
              else{
                  //stop everything and show invalid excel file
              }
            })
            console.log(idList,scoresList)
            axios.post(`http://localhost:8090/scores/createScores/${topicInstance.topicId}`,{
                    idList:idList,
                    scoresList:scoresList,
                    totalScore:parseInt(maxScore)
                },{
                    headers:{
                      "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                    }
                  }).then((res)=>{
                    console.log(res)
                    settopicInstance({});
                    setmaxScore("");
                    setIsLoading(false);
                    setUploaded(true);
                }).catch((err)=>{
                    setResMessage(err.response.data.message);
                    settopicInstance({});
                    setmaxScore("");
                    setResPopUp(true);
                    setIsLoading(false);
                });
          })
      }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
      });
    }
    reader.readAsBinaryString(file);
  };

    return (
      <>
      {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
      <div className="topicContainer">
        <div className="topicWrapper">
          <div className='internHeader' style={{width:"54.8vw"}}>
                <span><IoMdArrowRoundBack title='Go Back To Previous Page' onClick={()=>navigate(-1)} className='backButton'/></span>
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
                  <div className="topicbar" title='View History & Scores' onClick={() => handleInfoPopup(t)} key={i}>
                    <form>
                      <input
                        type="checkbox"
                        title="checkbox"
                        checked={t.completed}
                        onClick={(x)=>x.stopPropagation()}
                        onChange={(x) => { setCompletePopup(true); setCompTemp(t);x.stopPropagation(); }}
                      />
                    </form>
                    <p>{t.topicName}</p>
                    <div>
                      <FiUpload title='Upload Scores' className='uploadIcon' onClick={(x) => {settopicInstance(t);setuploadPopUp(true);x.stopPropagation();}}/>
                    </div>
                    <div>
                      <MdEdit
                        className="edit-icon"
                        title='Edit Topic'
                        onClick={(x) => {setEditTopic(t);setShowEditForm(true);x.stopPropagation();}}
                      />
                    </div>
                    <div>
                      <MdDelete
                        className="del_icon"
                        title='Delete Topic'
                        onClick={(x) => {setDeletePopup(true);setDeleteId(t.topicId);x.stopPropagation();}}
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
                      title="checkbox"
                      checked={t.completed}
                      onChange={() => {setRemainingPopup(true);setCompTemp(t);}}
                    />
                  </form>
                  <p>{t.topicName}</p>
                  <div></div>
                  <div>
                    <MdEdit
                      className="edit-icon"
                      title='Edit Topic'
                      onClick={() => {setEditTopic(t);setShowEditForm(true);}}
                    />
                  </div>
                  <div>
                    <MdDelete
                      className="del_icon"
                      title='Delete Topic'
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
                  <h2>{topicTemp.topicName}    </h2>
                </div>
                  {showMeets && (<div className="availabilityContainer">
                    <div className='scrHeader'>
                      <h2>Scheduled Date & Time</h2>            
                      <span> 
                        <TbReportAnalytics
                          className="scoreBtn"
                          title='Score Analysis'
                          onClick={()=>handleScores(topicTemp)}
                        />
                      </span>
                  </div>
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
                )}
                {showScores && ( <div className='barchartContainer'>
                  <div className='scrHeader'>
                    <h2>Scores Analysis</h2>            
                    <span> 
                      <TbHistory
                        className="scoreBtn"
                        title='Meetings'
                        onClick={()=>handleMeets()}
                      />
                    </span>
                  </div>
                    {
                      allScores.length===0 ? <div className='noTrainers'>-- Score Not Yet Updated --</div>:<>
                      <div className="availabilityContainer">
                        {/* <h2>Pie Chart</h2> */}
                        <Chart
                          backgroundColor={"gray"}
                          chartType="PieChart"
                          data={data}
                          options= {{
                            backgroundColor:"whitesmoke"}
                          }
                          className="pieChart"
                        />
                      </div>

                      <div className="availabilityContainer">
                        <h2>Score Board</h2>
                        <div className="availability">
                        <table className="popuptable">
                          <thead className="popuphead">
                            <tr className="popuptr">
                              <th className="popupth">Rank</th>
                              <th className="popupth">Name</th>
                              <th className="popupth">Batch</th>
                              <th className="popupth">Score</th>
                            </tr>
                          </thead>
                          <tbody className="popupbody">
                            {allScores.map((scr,i) => (
                              <tr className="popuptr" key={i}>
                                <td className="popuptd">{i+1}</td>
                                <td className="">{scr.intern.internName}</td>
                                <td className="popuptd">{scr.intern.batch.batchName}</td>
                                <td className="popuptd">{scr.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                  </div></>}
                </div>            
        )}
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
                        pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                        title="Please enter a valid name"
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
                          pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                          title="Please enter a valid name"
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

      {uploadPopUp && <div className='popupContainer'>
          <div className='popup-boxd'>
              <div className='popupHeader'>
                  <h2>Topic Scores</h2>
              </div>

              <form className="attendance-form" onSubmit={(e)=>{handleFileSubmit(e)}}>
              <div className="inputContainer">
                    <div className="input-group">
                      <label htmlFor="name">Max&nbsp;Score</label>
                        <input
                          type="number"
                          id="topic-name"
                          name="maxScore"
                          // pattern="[0-9]" 
                          // title="Please enter a number"
                          onChange={(e)=>setmaxScore(e.target.value)}
                          required={true}
                        />
                    </div>
                  </div>
                  <div>
                      <label htmlFor="attendance"> Upload Excel File</label>
                      <input
                        type="file"
                        id="file"
                        ref={fileInput}
                        name="file"
                      />
                  </div>        

              <div className='buttonsContainer'>
              <button type="submit" className="submit-btn">
                  Upload
              </button>
              <button type="reset" className="cancel-btn" onClick={() =>{setuploadPopUp(false);} }>
                  Cancel
              </button>
              </div>
              </form>
          </div>
      </div>}

      {uploaded && <div className='popupContainer'>
          <div className='popup-boxd'>
              <div className='popupHeader'>
                  <h2>File Uploaded</h2>
              </div>
              <div className='buttonsContainer'>
                  <button type="submit" className="submit-btn" onClick={() => {setUploaded(false)}}>
                      Ok
                  </button>
              </div>
          </div>
      </div>}

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