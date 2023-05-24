import React, { useContext, useEffect, useState } from 'react'
import { MdEdit, MdDelete, MdOutlineAddCircle, MdOutlineAddCircleOutline, MdAddCircle } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { TbReportAnalytics } from 'react-icons/tb';
import { MdLeaderboard } from 'react-icons/md';
import Leadercontext from '../Contextapi/Leadercontext';
import {BsFillInfoCircleFill} from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import "./Leadership.css";
import Barchart from './Barchart';
import { PuffLoader } from 'react-spinners';
import { Chart } from "react-google-charts";


const Result = () => {
    const [searchQuery,setSearchQuery] = useState("");  
    const [topicInstance,settopicInstance] = useState({});  
    const [completedList,setcompletedList]=useState([]);
    const [trigger,settrigger]=useState(false);
    const [reamainingList,setreamainingList]=useState([]);
    const [topicsList,settopicsList] = useState([]); 
    const [trainingsList,settrainingsList] = useState([]); 
    const [attendanceReport,setattendanceReport] = useState([]); 
    const [allScores,setallScores] = useState([]); 
    const [trainingInstance,settrainingInstance] = useState({}); 
    const leadercontext=useContext(Leadercontext);
    const {managerInstance}=leadercontext; 
    const [data,setdata] = useState([
      ["Category", "No Of Interns"],
      ["Above (75%)", 0],
      ["Between (50-75%)", 0],
      ["Below (50%)", 0],
    ]);
    const [isLoading,setIsLoading] = useState(false);
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");
    const [overallScorePopup,setoverallScorePopup] = useState(true);
    const [attendanceReportView,setattendanceReportView] = useState(false);
    const [reportAnalysisView,setreportAnalysisView] = useState(false);
    const [topicPiechart,settopicPiechart] = useState([]);
    const [overallScoresArray,setoverallScoresArray] = useState([]);

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

  const checkMeets=(meets,topicId)=>{
    const list=meets.filter((meet)=>meet.topic.topicId===topicId)
    if(list.length>0)
      return true;
    return false;
  }

  const checkIntern=(scoresArr,internId)=>{
    const x=scoresArr.filter((scr)=>scr.internId===internId);
    if(x.length!==0)
      return true;
    return false;
  }

  const overallScores=(topicList)=>{
      setIsLoading(true);
      let allScoresArr=[],newScoresArr=[];
      topicList.forEach((topic,index)=>{

        axios.get(`http://localhost:8090/scores/getScores/${topic.topicId}`,{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then((res)=>{
          res.data.batch.forEach((scr)=>{
            allScoresArr.push(scr)
          })
          if(index===topicList.length-1){
            setTimeout(()=>{
              console.log(allScoresArr);
              allScoresArr.forEach((scr)=>{
                if(checkIntern(newScoresArr,scr.intern.internId)){
                  newScoresArr.forEach((temp)=>{
                    if(temp.internId===scr.intern.internId)
                    {
                      temp.percentage=((temp.percentage+parseInt((scr.score*100)/scr.totalScore))/2)
                    }
                  })
                }
                else{
                  const x={
                    internId:scr.intern.internId,
                    internName:scr.intern.internName,
                    batchId:scr.intern.batch.batchId,
                    batchName:scr.intern.batch.batchName,
                    percentage:parseInt((scr.score*100)/scr.totalScore),
                  }
                  newScoresArr.push(x);
                }

              })
              console.log(newScoresArr);
              setoverallScoresArray(newScoresArr.sort((a,b)=>b.percentage-a.percentage));
              //completed just do html part bro

            },100)
            setIsLoading(false);
          }
        });
      })
  }

    const handleTraining=(e,trng)=>{
      setSearchQuery("")
      settopicPiechart([])
      setoverallScoresArray([])
      settrainingInstance(trng);
      setattendanceReportView(false);
      setoverallScorePopup(true);
      setreportAnalysisView(false);
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
          console.log(res.data.topicList)
          axios.get(`http://localhost:8090/meeting/getMeetings/${trng.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((meets)=>{
            const completedtemp=res.data.topicList.filter((t) => t.completed && t.active).length;
            console.log([completedtemp,res.data.topicList.length-completedtemp]);
            settopicPiechart([completedtemp,res.data.topicList.length-completedtemp]);
            setcompletedList(res.data.topicList.filter((t) => t.completed && t.active));
            setreamainingList(res.data.topicList.filter((t) => !t.completed && t.active && checkMeets(meets.data.meeting,t.topicId)));
            overallScores(res.data.topicList)
            setIsLoading(false);
          })
          
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
                console.log(res.data.interns)
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
                      setattendanceReport(tempAttdReport.sort((a,b)=>new Date(a.meetDate)-new Date(b.meetDate)))
                      setTimeout(() => {
                        settrigger(!trigger)
                      }, 500);
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
    setattendanceReportView(false);
    setoverallScorePopup(false);
    setreportAnalysisView(true);
    setallScores([])
    settopicInstance(topic);
    getScores(topic.topicId)
  }

  const handleAttendance=(topic)=>{
    setdata([
      ["Category", "No Of Interns"],
      ["Above (75%)", 0],
      ["Between (50-75%)", 0],
      ["Below (50%)", 0],
    ])
    attendanceReport.length=0;
    setreportAnalysisView(false);
    setoverallScorePopup(false);
    setattendanceReportView(true);
    setattendanceReport([])
    settopicInstance(topic);
    calcPercentage(topic.topicId)
  }

  const handleOverallscores=()=>{
    setreportAnalysisView(false);
    setoverallScorePopup(true);
    setattendanceReportView(false);
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
                          <div className='overHeader'>
                              <h2>Topics</h2>         
                              <span> 
                                <MdLeaderboard
                                  className="overallscoreBtn"
                                  title="Overall Training Report"
                                  onClick={()=>{handleOverallscores()}}
                                />
                              </span>
                          </div>
                          <p className='noTrainers'>-- No Topics are There In This Training --</p>
                        </div>
                      </>:
                      <>
                      <div className='overHeader'>
                              <h2>Topics</h2>         
                              <span> 
                                <MdLeaderboard
                                  className="overallscoreBtn"
                                  title="Overall Training Report"
                                  onClick={()=>{handleOverallscores()}}
                                />
                              </span>
                          </div>
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
                                    title='Score Analysis'
                                    onClick={()=>handleScores(t)}
                                  />
                                </div>
                                <div>
                                  <HiDocumentReport
                                    className="attd_icon"
                                    title='Attendance Report'
                                    onClick={()=>handleAttendance(t)}
                                  />
                                </div>
                              </div>
                            )
                          )}
                      <h3 className='managerTopicheads'>In Progress</h3>
                      {  (searchQuery !== "" ? filteredList(reamainingList) : reamainingList).length===0 ? <p className='noTrainers'>-- No Topics Here --</p> :
                          (searchQuery !== "" ? filteredList(reamainingList) : reamainingList).map(
                            (t) => (
                              <div className="topicbar_ldr">
                                <p>{t.topicName}</p>
                                <div></div>
                                <div></div>
                                <div>
                                  <HiDocumentReport
                                    title='Attendance Report'
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

            {attendanceReportView && <div className='sch_popupHeader'>
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
              </div>}

              {reportAnalysisView && <div className='sch_popupHeader'>
                  <h2>Score Analysis</h2>
                  <div className='barchartContainer'>
                  <h1 className='leaderTopics'>{topicInstance.topicName}</h1>

                    {
                      allScores.length===0 ? <div className='noTrainers'>-- Score Not Yet Updated --</div>:<>
                      <div className="availabilityContainer">
                        <h2>Pie Chart</h2>
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
              </div>}

              {overallScorePopup && <div className='sch_popupHeader'>
                  <h2>Overall Training Report</h2>
                  <div className='barchartContainer'>

                    {
                      overallScoresArray.length===0 ? <div className='noTrainers'>-- Scores Not Yet Updated --</div>:<>
                      <div className="availabilityContainer">
                        <h2>Topics Progress</h2>
                        <Chart
                          backgroundColor={"gray"}
                          chartType="PieChart"
                          data={[
                            ["Category", "Count"],
                            ["Completed", topicPiechart[0]],
                            ["Incompleted", topicPiechart[1]],
                          ]}
                          options= {{
                            backgroundColor:"whitesmoke"}
                          }
                          className="pieChart"
                        />
                      </div>

                      <div className="availabilityContainer">
                        <h2>Overall Score Board</h2>
                        <div className="availability">
                        <table className="popuptable">
                          <thead className="popuphead">
                            <tr className="popuptr">
                              <th className="popupth">Rank</th>
                              <th className="popupth">Name</th>
                              <th className="popupth">Batch</th>
                              <th className="popupth">Percentage</th>
                            </tr>
                          </thead>
                          <tbody className="popupbody">
                            {overallScoresArray.map((scr,i) => (
                              <tr className="popuptr" key={i}>
                                <td className="popuptd">{i+1}</td>
                                <td className="">{scr.internName}</td>
                                <td className="popuptd">{scr.batchName}</td>
                                <td className="popuptd">{scr.percentage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                  </div></>}
                </div>
              </div>}

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