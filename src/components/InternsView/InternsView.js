import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import './InternsView.css';
import InternContext from '../Contextapi/InternContext';
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';
import { RiFileExcel2Fill } from "react-icons/ri";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { PuffLoader } from 'react-spinners';
import { Link } from 'react-router-dom';



const InternsView = () => {

    const interncontext=useContext(InternContext);
    const {internSchedulesList,updateinternSchedulesList}=interncontext;
    const authContext = useContext(AuthContext);
    const {username,usermail,userid} = authContext;
    const [scheduleList, setscheduleList] = useState([]);
    const [past, setPast] = useState([]);
    const [present, setPresent] = useState([]);
    const [future, setFuture] = useState([]);
    const [presentCheck, setPresentCheck] = useState(true);
    const [pastCheck, setPastCheck] = useState(false);
    const [futureCheck, setFutureCheck] = useState(false);
    const [viewList, setViewList] = useState({}); 
    const [isOpenDef, setIsOpenDef] = useState(true);
    const [isOpenDets, setIsOpenDets] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [useEffectReload, setUseEffectReload] = useState(false);
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const date = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${date}`;
      };

    const compareDates = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const d1DateOnly = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
        const d2DateOnly = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
        if (d1DateOnly.getTime() < d2DateOnly.getTime()) {
            return -1;
        }
        if (d1DateOnly.getTime() > d2DateOnly.getTime()) {
            return 1;
        }
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8090/meeting/getMeetingsByIntern/${userid}`)
        .then((res)=>{
            updateinternSchedulesList(res.data.meeting);
            
            const currDate = getCurrentDate(); //To get the Current Date
            res.data.meeting.sort((a, b) => b.date.localeCompare(a.date));
            setPresent(res.data.meeting.filter(obj => obj.date === currDate).sort((a, b) => a.date.localeCompare(b.Date)));

            setPast(res.data.meeting.filter(obj => compareDates(obj.date, currDate) === -1).sort((a, b) => a.date.localeCompare(b.Date)));

            setFuture(res.data.meeting.filter(obj => compareDates(obj.date, currDate) === 1).sort((a, b) => a.date.localeCompare(b.Date)));
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
    }, [useEffectReload])

    const activeClass=(e)=>{
        let btns = document.getElementsByClassName("headerText");
        let x=[...btns]
        x.forEach((t)=>t.className="headerText")
        e.target.className+=" active";
    }

    const handleClickCompleted=(e)=>{
        setPastCheck(true);
        setPresentCheck(false);
        setFutureCheck(false);
        activeClass(e);
    }

    const handleClickToday=(e)=>{
        setPastCheck(false);
        setPresentCheck(true);
        setFutureCheck(false);
        activeClass(e);
    }

    const handleClickUpcoming=(e)=>{
        setPastCheck(false);
        setPresentCheck(false);
        setFutureCheck(true);
        activeClass(e);
    }

    const handleDetsSch=()=>{
        setIsOpenDef(false);
        setIsOpenDets(true);
    }

    const handleView = (e, i) => {
        setViewList(e);
        handleDetsSch();
    }

    const filteredList = (list)=>{
        const filteredList = list.filter(
            (meet) =>
              meet.topic.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              meet.trainer.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        return filteredList;
    }

  let dummyMeetingList = [];
  const fileType = "xlsx";
  const handleFileDownload=()=>{
      dummyMeetingList = [];
      for (let i = 0; i < internSchedulesList.length; i++) {
        let obj = {};
        for (const key in internSchedulesList[i]) {
          if (key == "date" || key == "fromTime" || key == "toTime"|| key == "meetingDesc" || key == "meetingLink") {
            obj[key.toUpperCase()] = internSchedulesList[i][key];
          } else if (key === "batchList") {
            for (let j = 0; j < internSchedulesList[i][key].length; j++) {
              obj["BATCH"] = internSchedulesList[i][key][j].batchName ;
            } 
          }else if (key === "topic") {
            obj["TOPIC"] = internSchedulesList[i][key].topicName;
          }
          else if (key === "trainer") {
            obj["TRAINER"] = internSchedulesList[i][key].trainerName;
            dummyMeetingList.push(obj);
          }
        }
      }
      const ws = XLSX.utils.json_to_sheet(dummyMeetingList);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "xlsx" });
      FileSaver.saveAs(data, "MeetingsFile" + ".xlsx");
  }


  return (<>
  {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
    <h2 className='scheduleHeader'>Your&nbsp;Schedules</h2>
    <div className='scheduleContainer'>
        <div className="scheduleWrapper">
            <div className='scheduleNavbar'>
                <div className='SchbuttonsWrapper'>
                    <p className='headerText active' onClick={(e) => {handleClickToday(e)}}>Today</p>
                    <p className='headerText' onClick={(e) => {handleClickUpcoming(e)}}>Upcoming</p>
                    <p className='headerText' onClick={(e) => {handleClickCompleted(e)}}>Completed</p>
                </div>
                <div className="excel">
                <RiFileExcel2Fill title="Download Excel File" className="Excel-Icon shareIcon" onClick={handleFileDownload}/>

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
            {pastCheck && (searchQuery!==""?filteredList(past):past).map((e, i) => <div key={i} className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    <p className='grp'>Groups&nbsp;-&nbsp;</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span key={i}>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
            </div>
            )}

            {presentCheck && (searchQuery!==""?filteredList(present):present).map((e, i) => <div key={i} className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    <p className='grp'>Groups&nbsp;-&nbsp;</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span key={i}>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>

            </div>
            )}

            {futureCheck && (searchQuery!==""?filteredList(future):future).map((e, i) => <div key={i} className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    <p className='grp'>Groups&nbsp;-&nbsp;</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span key={i}>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
            </div>
            )}
            
        </div> 
    </div>

    <div className='scheduleDetails'>
    
        {isOpenDef && <div className='defText'>
            <h1>Hi {username}!</h1>
        </div>}

        {isOpenDets && <div className="sch_popup-boxd">
            <div className='sch_popupHeader'>
                <h2 id="popUp">Details Of schedule</h2>
            </div>
            <div className="sch_input_box">
                <div className='sch_inputContainer'>
                    <div className="sch_input-group">
                        <label>Topic </label>                                                            
                        <p>{viewList.topic.topicName}</p>                                                            
                    </div>

                    <div className="sch_input-group">
                        <label> Date </label>                                                          
                        <p>{viewList.date}</p> 
                    </div>

                    <div className="sch_input-group">
                        <label> Start Time: </label>                                                           
                        <p>{viewList.fromTime}</p>                     
                    </div>

                    <div className="sch_input-group">
                        <label> End Time: </label>                                                           
                        <p>{viewList.toTime}</p>                     
                    </div>

                    <div className="sch_input-group">
                        <label>Trainer </label>                                                            
                        <p>{viewList.trainer.trainerName}</p>                                                             
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Meet Link</label>
                        <p><Link className='meetLink'>{viewList.meetingLink}</Link></p>                                                              
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Description</label>
                        <p>{viewList.meetingDesc}</p>                                                             
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Selected Groups</label>
                        <div className='sch_internWrapperDiv'>
                            {
                                viewList.batchList.map((e,i)=><div key={i} className='sch_ListInternWrapper'>
                                    <p>{e.batchName}</p>
                                </div>)
                            }
                        </div>                                                           
                    </div>
                </div>
            </div>
        </div>
        }
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

export default InternsView;
