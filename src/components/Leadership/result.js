import React, { useContext, useEffect, useState } from 'react'
import { MdEdit, MdDelete, MdOutlineAddCircle, MdOutlineAddCircleOutline, MdAddCircle } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { TbReportAnalytics } from 'react-icons/tb';
import Leadercontext from '../Contextapi/Leadercontext';
import {BsFillInfoCircleFill} from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import "./Leadership.css";
import Barchart from './Barchart';
import { PuffLoader } from 'react-spinners';

const Result = () => {
    const [searchQuery,setSearchQuery] = useState("");  
    const [topicInstance,settopicInstance] = useState({});  
    const [completedList,setcompletedList]=useState([]);
    const [trigger,settrigger]=useState(false);
    const [reamainingList,setreamainingList]=useState([]);
    const [topicsList,settopicsList] = useState([]); 
    const [trainingsList,settrainingsList] = useState([]); 
    const [attendanceReport,setattendanceReport] = useState([]); 
    const [trainingInstance,settrainingInstance] = useState({}); 
    const leadercontext=useContext(Leadercontext);
    const {managerInstance}=leadercontext;
    const [isLoading,setIsLoading] = useState(false);
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");
    useEffect(()=>{
      setIsLoading(true);
      axios.get(`http://localhost:8090/training/getTrainingById/${managerInstance.userId}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
    })
      .then((res)=>{
        settrainingsList(res.data.training)
        setIsLoading(false);
      }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    })
    },[])

    const filteredList = (list)=>{
      const filteredList = list.filter(
        (t) =>
            t.topicName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filteredList;
  }

    const handleTraining=(e,trng)=>{
      setSearchQuery("")
      settrainingInstance(trng);
      settopicInstance({})
      attendanceReport.length=0;
      setattendanceReport([]);
      setIsLoading(true);
      axios.get(`http://localhost:8090/topic/getTopics/${trng.trainingId}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then((res)=>{
          settopicsList(res.data.topicList);
          setcompletedList(res.data.topicList.filter((t) => t.completed && t.active));
          setreamainingList(res.data.topicList.filter((t) => !t.completed && t.active));
          setIsLoading(false);
      }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    })
      activeClass(e);
    }

    const activeClass=(e)=>{
      let btns = document.getElementsByClassName("trainingName");
      let x=[...btns]
      x.forEach((t)=>t.className="trainingName")
      e.target.className+=" active";
  }

  useEffect(()=>{
    if(attendanceReport.length!==0)
      setattendanceReport(attendanceReport);
  },[trigger])

  const calcPercentage=(topicId)=>{
    setIsLoading(true);
    axios.get(`http://localhost:8090/meeting/getMeetings/${trainingInstance.trainingId}`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
      }
  })
    .then((res)=>{
      setIsLoading(false);
      const filteredRes=res.data.meeting.filter((meet)=>meet.topic.topicId===topicId)
      const tempAttdReport=[];
      filteredRes.forEach((meet,j)=>{
          const newBatchList=[],newPercentageList=[];
          meet.batchList.forEach((lst,i)=>{
            newBatchList.push(lst.batchName);
            setIsLoading(true)
            axios.post(`http://localhost:8090/batch/getInternsByBatch`,{
              "batchList":[lst.batchId],
            },{
              headers:{
                "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
              }
          })
            .then((res)=>{
                const total=res.data.interns.length;
                let cnt=0,meetcheck=0;
                res.data.interns.forEach((intern)=>{
                    intern.attendanceList.forEach((att)=>{
                      if(att.meeting.meetingId===meet.meetingId){
                        meetcheck++;
                         //after the above filter will give only one record for each intern for that particular meet
                        if(att.present)
                            cnt++;
                      }
                    })
                  })
                  if(cnt!==0)
                    newPercentageList.push((cnt*100)/total)
                  // intern.attendanceList=intern.attendanceList.filter((att)=>att.meeting.meetingId===meetId);
                  if(meet.batchList.length-1===i)
                  {
                    if(meetcheck===0)
                    {
                      const obj={
                        meetDate:meet.date,
                        report:false,
                      }
                      tempAttdReport.push(obj);
                    }
                    else{
                      const obj={
                        meetDate:meet.date,
                        batchList:newBatchList,
                        percentageList:newPercentageList,
                        report:true,
                      }
                      tempAttdReport.push(obj);
                    }
                    if(j===filteredRes.length-1)
                    {
                      setattendanceReport(tempAttdReport)
                    }
                  }
                  setIsLoading(false);
                }).catch((err)=>{
                    setResMessage(err.response.data.message);
                    setResPopUp(true);
                    setIsLoading(false);
                })
              })  
      })
    }).catch((err)=>{
        setResMessage(err.response.data.message);
        setResPopUp(true);
        setIsLoading(false);
    })
  }

  const handleAttendance=(topic)=>{
    attendanceReport.length=0;
    setattendanceReport([])
    settopicInstance(topic);
    calcPercentage(topic.topicId)
  }

    return (
        <>
            {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
            <h2 className='scheduleHeader'>Trainings Under {managerInstance.uname}</h2>
            <div className='managerContainer'>
              <div className='trainContainer'>
                  <h3>Trainings</h3>
                  <div>
                    {trainingsList.map((trng,i)=><div className='trainingName' onClick={(e)=>handleTraining(e,trng)}>{trng.trainingName}</div>)}
                  </div>
              </div>
              <div className="scheduleWrapper">
                  <div className='scheduleNavbar'>
                      <div className='SchbuttonsWrapper'>
                          <div className='headerText' >{(Object.keys(trainingInstance).length === 0) ? "TrainingName":trainingInstance.trainingName}</div>
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
                  {(Object.keys(trainingInstance).length === 0) ? <div className='noTrainers'>-- Select a Training --</div>:(
                    <div>
                      {(completedList.length===0 && reamainingList.length===0) ? <>
                        <div>
                          <h1 className='leaderTopics'>Topics</h1>
                          <p className='noTrainers'>-- No Topics are There In This Training --</p>
                        </div>
                      </>:
                      <>
                      <h1 className='leaderTopics'>Topics</h1>
                      <div className='ldr_topicContainer'>
                      <h3 className='managerTopicheads'>Completed</h3>
                        { (searchQuery !== "" ? filteredList(completedList) : completedList).length===0 ? <p className='noTrainers'>-- No Topics Here --</p> :
                          (searchQuery !== "" ? filteredList(completedList) : completedList).map(
                            (t) => (
                              <div className="topicbar_ldr">
                                <p>{t.topicName}</p>
                                <div></div>
                                <div>
                                  <TbReportAnalytics
                                    className="report-icon"
                                  />
                                </div>
                                <div>
                                  <HiDocumentReport
                                    className="attd_icon"
                                    onClick={()=>handleAttendance(t)}
                                  />
                                </div>
                              </div>
                            )
                          )}
                      <h3 className='managerTopicheads'>OnGoing</h3>
                      {  (searchQuery !== "" ? filteredList(reamainingList) : reamainingList).length===0 ? <p className='noTrainers'>-- No Topics Here --</p> :
                          (searchQuery !== "" ? filteredList(reamainingList) : reamainingList).map(
                            (t) => (
                              <div className="topicbar_ldr">
                                <p>{t.topicName}</p>
                                <div></div>
                                <div>
                                  <TbReportAnalytics
                                    className="report-icon"
                                    
                                  />
                                </div>
                                <div>
                                  <HiDocumentReport
                                    className="attd_icon"
                                    onClick={()=>handleAttendance(t)}
                                  />
                                </div>
                              </div>
                            )
                          )}
                          </div>
                    
                        </>}
                      </div> 
                      )}
                    </div> 
                </div>
          <div className='scheduleDetails'>
            <div className='sch_popupHeader'>
                  <h2>Attendance Report</h2>
                  <div className='barchartContainer'>
                    {
                      (Object.keys(topicInstance).length !== 0) ? <div>
                        <h1 className='leaderTopics'>{topicInstance.topicName}</h1>
                        <>{attendanceReport.length !==0 ?
                          attendanceReport.map((meetReport,i)=>{
                              if(meetReport.report){
                                return <>
                                  <h3 className='managerTopicheads'>{meetReport.meetDate}</h3>
                                  <Barchart batch={meetReport.batchList}  percentage={meetReport.percentageList}/>
                                </> 
                              }
                              else{
                                return <>
                                  <h3 className='managerTopicheads'>{meetReport.meetDate}</h3>
                                  <div className='noTrainers'>-- Attendance report not yet uploaded --</div>
                                </>
                              }
                            })
                            : <div className='noTrainers'>-- No Meetings Scheduled Yet --</div>
                        }</>
                        
                      </div>:<div className='noTrainers'>-- Select a Topic --</div>
                    }
                    
                  </div>
              </div>
          </div>
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
    )
}

export default Result;