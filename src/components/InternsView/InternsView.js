import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import './InternsView.css';
import InternContext from '../Contextapi/InternContext';

const InternsView = () => {

    const interncontext=useContext(InternContext);
    const {internSchedulesList}=interncontext;


    const [scheduleList, setscheduleList] = useState([
        {
        // meetId: 1,
        topicName: "Python",
        date: "2020-02-20",
        fromTime: "10:00",
        toTime: "05:00PM",
        trainerName: "Tanuja",
            // meetGroups: defaultGroupList,
            meetLink: "meet1",
            assessmentLink: "assessment2",
            feedbackLink: "feedback3",
            descriptionLink: "description4"
        },
        {
        // meetId: 2,
        topicName: "Java",
        date: "2021-02-20",
        fromTime: "10:00",
        toTime: "05:00PM",
        trainerName: "Nikita",
            // meetGroups: defaultGroupList,
            meetLink: "meet2",
            assessmentLink: "assessment1",
            feedbackLink: "feedback2",
            descriptionLink: "description2"
        },
        {
        // meetId: 3,
        topicName: "C++",
        date: "2023-04-19",
        fromTime: "10:00",
        toTime: "05:00PM",
        trainerName: "Devki",
            // meetGroups: defaultGroupList,
            meetLink: "meet3",
            assessmentLink: "assessment3",
            feedbackLink: "feedback1",
            descriptionLink: "description3"
        },
        {
        // meetId: 4,
        topicName: "JavaScript",
        date: "2024-04-15",
        fromTime: "10:00",
        toTime: "05:00PM",
        trainerName: "Jyothi",
            // meetGroups: defaultGroupList,
            meetLink: "meet4",
            assessmentLink: "assessment4",
            feedbackLink: "feedback4",
            descriptionLink: "description1"
        },
    ]);
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
        scheduleList.sort((a, b) => a.date.localeCompare(b.Date));
        const currDate = getCurrentDate(); //To get the Current Date

        setPresent(scheduleList.filter(obj => obj.date === currDate));

        setPast(scheduleList.filter(obj => compareDates(obj.date, currDate) === -1));

        setFuture(scheduleList.filter(obj => compareDates(obj.date, currDate) === 1));

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
        console.log(e)
        handleDetsSch();
    }


  return (<>
    <h2 className='scheduleHeader'>Schedules</h2>
    <div className='scheduleContainer'>
        <div className="scheduleWrapper">
            <div className='scheduleNavbar'>
                <div className='SchbuttonsWrapper'>
                    <p className='headerText active' onClick={(e) => {handleClickToday(e)}}>Today</p>
                    <p className='headerText' onClick={(e) => {handleClickCompleted(e)}}>Completed</p>
                    <p className='headerText' onClick={(e) => {handleClickUpcoming(e)}}>Upcoming</p>
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
            {pastCheck && past.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainerName}</p>
                    {/* {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })} */}
                    <p>Groups</p>
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>

            </div>
            )}

            {presentCheck && present.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainerName}</p>
                    {/* {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })} */}
                    <p>Groups</p>
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>

            </div>
            )}

            {futureCheck && future.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainerName}</p>
                    {/* {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })} */}
                    <p>Groups</p>
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>

            </div>
            )}
            
        </div> 
    </div>
    <div className='scheduleDetails'>
    
    {isOpenDef && <div className='defText'>
        <h1>Hi user!</h1>
        </div>}

    {isOpenDets && <div className="sch_popup-boxd">
            <div className='sch_popupHeader'>
                <h2>Details Of schedule</h2>
            </div>
            <div className="sch_input_box">
                <div className='sch_inputContainer'>
                    <div className="sch_input-group">
                        <label>Topic </label>                                                            
                        <p>{viewList.topicName}</p>                                                            
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
                        <p>{viewList.trainerName}</p>                                                             
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Meet Link</label>
            
                        <p>{viewList.meetingLink}</p>                                                              
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Assessment Link</label>
                        <p>{viewList.assessmentLink}</p>                                                              
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Feedback Link</label>
                        {/* <p>{feedback}</p>                                                             */}
                        <p>{viewList.feedbackLink}</p>                                                              
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Description</label>
                        {/* <p>{description}</p>                                                             */}
                        <p>{viewList.meetingDesc}</p>                                                             
                    </div>

                    <div className="sch_input-group">
                        <label htmlFor="name">Selected Groups</label>
                        {/* <div className='sch_internWrapperDiv'>
                            {
                                viewList.batchList.map((e)=><div className='sch_ListInternWrapper'>
                                    <p>{e.batchName}</p>
                                </div>)
                            }
                        </div>                                                            */}
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
    </div>
    </>
  )
}

export default InternsView;
