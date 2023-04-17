import React, { useContext, useEffect, useState } from 'react'
import './Schedules.css'
import { MdEdit, MdDelete, MdOutlineAddCircle, MdOutlineAddCircleOutline, MdAddCircle } from 'react-icons/md';
import {BsFillInfoCircleFill} from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa';


const Schedules = () => {
    const [scheduleList, setscheduleList] = useState([
        {
        // meetId: 1,
        meetTopic: "Python",
        Date: "2020-02-20",
        from_time: "10:00",
        // to_time: "05:00PM"
            meetTrainer: "Tanuja",
            // meetGroups: defaultGroupList,
            meetLink: "meet1",
            assessmentLink: "assessment2",
            feedbackLink: "feedback3",
            descriptionLink: "description4"
        },
        {
        // meetId: 2,
        meetTopic: "Java",
        Date: "2021-02-20",
        from_time: "10:00",
        // to_time: "05:00PM"
            meetTrainer: "Nikita",
            // meetGroups: defaultGroupList,
            meetLink: "meet2",
            assessmentLink: "assessment1",
            feedbackLink: "feedback2",
            descriptionLink: "description2"
        },
        {
        // meetId: 3,
        meetTopic: "C++",
        Date: "2023-04-15",
        from_time: "10:00",
        // to_time: "05:00PM"
            meetTrainer: "Devki",
            // meetGroups: defaultGroupList,
            meetLink: "meet3",
            assessmentLink: "assessment3",
            feedbackLink: "feedback1",
            descriptionLink: "description3"
        },
        {
        // meetId: 4,
        meetTopic: "JavaScript",
        Date: "2024-04-15",
        from_time: "10:00",
        // to_time: "05:00PM"
            meetTrainer: "Jyothi",
            // meetGroups: defaultGroupList,
            meetLink: "meet4",
            assessmentLink: "assessment4",
            feedbackLink: "feedback4",
            descriptionLink: "description1"
        },
    ]);
    const [temp, setTemp] = useState({})
    const [arrId, setArrId] = useState()
    const [validMsg,setValidMsg] = useState("");
    const [isOpen, setIsOpen] = useState(true)
    const [isOpenCon, setIsOpenCon] = useState(false)
    const [isOpenDets, setIsOpenDets] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [trainer, setTrainer] = useState("");
    const [defaultGroupList, setdefaultGroupList] = useState([
        {batchId:5, batchName:"murex"},
        {batchId:7, batchName:"non-murex"}])
    const [defaultGroupIdList,setdefaultGroupIdList]=useState([]);
    const [meet, setMeet] = useState();
    const [assessment, setAssessmentt] = useState();
    const [feedback, setFeedback] = useState();
    const [description, setDescription] = useState();
    const [past, setPast] = useState([]);
    const [present, setPresent] = useState([]);
    const [future, setFuture] = useState([]);
    const [presentCheck, setPresentCheck] = useState(true);
    const [pastCheck, setPastCheck] = useState(false);
    const [futureCheck, setFutureCheck] = useState(false);
    const [viewList, setViewList] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [useEffectReload, setUseEffectReload] = useState(false);


    const handleCreateSch=()=>{
        setIsOpen(true);
        setIsOpenEdit(false);
        setIsOpenDets(false);
    }

    const handleEditSch=()=>{
        setIsOpen(false);
        setIsOpenEdit(true);
        setIsOpenDets(false);
        // setViewList()
    }

    const handleDetsSch=()=>{
        setIsOpen(false);
        setIsOpenEdit(false);
        setIsOpenDets(true);
    }

    const handleSetEmpty=()=>{
        setTopic("");
        setDate("");
        setFromTime("");
        setToTime("");
        setTrainer("");
        setMeet("");
        setAssessmentt("");
        setFeedback("");
        setDescription("");
    }

    const handleDateChange = (e) => {
        // setDate(date);
        setDate(e.target.value);
    }
    
    const handleFromTimeChange = (e) => {
        // setFromTime(fromTime);
        setFromTime(e.target.value);
    }
    
    const handleToTimeChange = (e) => {
        setToTime(e.target.value);
    }

    const handleAddList=(chk,id)=>{
        if(chk.target.checked)
        {
            defaultGroupIdList.push(id);
            setdefaultGroupIdList(defaultGroupIdList);
            console.log(defaultGroupIdList)
        }
        else{
            if(defaultGroupIdList.includes(id))
            {
                defaultGroupIdList.splice(defaultGroupIdList.indexOf(id), 1);
                setdefaultGroupIdList(defaultGroupIdList);
                console.log(defaultGroupIdList)
            }
        }
    }

    // const handleGroupAdd=()=>{
    //     console.log(defaultGroupIdList);
    //     //call the add interns to group api
    //     axios.post(`http://localhost:8090/intern/updateInternBatch/${currentGroup[0].batchId}`,{
    //         "internIdList":defaultInternIdList
    //     }).
    //     then((res)=>{
    //         console.log(res);
    //         setdefaultGroupIdList([]);
    //         setUseeffectreload1(!useeffectreload1);
    //         setDefaultCheck(false);
    //     })
    // }

    const handleMeet = event => {
        setMeet(event.target.value);  
    };

    const handleAssessment = event => {
        setAssessmentt(event.target.value);  
    };

    const handleFeedback = event => {
        setFeedback(event.target.value);  
    };

    const handleDescription = event => {
        setDescription(event.target.value);  
      };

    
    
    const handleClick = () => {
        if(temp=={}){
            setValidMsg("Invalid Entry!!");
            setTimeout(()=>{
                document.getElementById("val").style.display="none";
            },5000);
        }
        else{
            const x={
                meetTopic: topic,
                Date: date,
                from_time: fromTime,
            }
            console.log(x)
            setscheduleList(current => [...current, x]);
            setUseEffectReload(!useEffectReload)
            console.log(scheduleList)
            handleSetEmpty();
            handleCreateSch();
        }
    };

    const handleView = (e, i) => {
        console.log(e)
        setViewList(e);
        handleDetsSch();
        console.log(viewList)
    }

    // handle click event of the Edit button
    const handleEdit = (e,i) => {
        // setTopic(e.meetTopic);
        // setDate(e.Date);
        // setFromTime(e.from_time);
        setViewList(e);
    setArrId(i);
    handleEditClick();
    setTemp(scheduleList[arrId]);
    setViewList('');
    }

    const handleEditClick = (index) => {
        const list = [...scheduleList];
        console.log(arrId);
        const x={
            meetTopic: topic,
            Date: date,
            from_time: fromTime,
            meetTrainer: trainer,
            // meetGroups: defaultGroupList,
            meetLink: meet,
            assessmentLink: assessment,
            feedbackLink: feedback,
            descriptionLink: description
        }
        list[index] = x;
        setscheduleList(list);
        handleEditSch();
        handleSetEmpty();
        setUseEffectReload(!useEffectReload)
        console.log(list);
    };

    // handle click event of the Remove button
    const handleRem =  (i) => {
        // console.log(i);
        setArrId(i);
        setIsOpenCon(true);
    }

    const handleRemoveClick = (index) => {
        const list = [...scheduleList];
        console.log(arrId);
        list.splice(index, 1);
        setscheduleList(list);
        setIsOpenCon(false);
        setUseEffectReload(!useEffectReload)
        console.log(list);
    };

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
            console.log("-1")
            return -1;
        }
        if (d1DateOnly.getTime() > d2DateOnly.getTime()) {
            console.log("1")
            return 1;
        }
    }

    useEffect(() => {
        scheduleList.sort((a, b) => a.Date.localeCompare(b.Date));
        const currDate = getCurrentDate(); //To get the Current Date
        console.log(currDate);
        setPresent(scheduleList.filter(obj => obj.Date === currDate));
        console.log(present)
        setPast(scheduleList.filter(obj => compareDates(obj.Date, currDate) === -1));
        console.log(past)
        setFuture(scheduleList.filter(obj => compareDates(obj.Date, currDate) === 1));
        console.log(future)
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

    return (<>
    <h2 className='scheduleHeader'>Schedules</h2>
    <div className='scheduleContainer'>
        <div className="scheduleWrapper">
            <div className='scheduleNavbar'>
                <div className='SchbuttonsWrapper'>
                    <p className='headerText' onClick={(e) => {handleClickCompleted(e)}}>Completed</p>
                    <p className='headerText active' onClick={(e) => {handleClickToday(e)}}>Today</p>
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
              <div>

              <p className="topicAdd" title='Add New Schedule' onClick={() => {handleCreateSch();handleSetEmpty();}}>
                    Add
                </p>
              </div>
            </div>

        </div>

        <div className='schedules'>            
            {pastCheck && past.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.meetTopic}</h3>
                    <p>{e.meetTrainer}</p>
                    <p>Groups</p>
                    <div>{e.Date}&nbsp;&nbsp;{e.from_time}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >
                        <div className='infoSchedule'>
                            <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                        </div>
                        <div>
                            <MdEdit className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                        </div>
                        <div>
                            <MdDelete className="close-icon" onClick={(x)=>{handleRem(i);x.stopPropagation();}}/>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {presentCheck && present.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.meetTopic}</h3>
                    <p>{e.meetTrainer}</p>
                    <p>Groups</p>
                    <div>{e.Date}&nbsp;&nbsp;{e.from_time}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >
                    <div className='infoSchedule'>
                        <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                    </div>
                        <MdEdit className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                    </div>
                    <div >
                        <MdDelete className="close-icon" onClick={(x)=>{handleRem(i);x.stopPropagation();}}/>
                    </div>
                </div>
            </div>
            )}

            {futureCheck && future.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.meetTopic}</h3>
                    <p>{e.meetTrainer}</p>
                    <p>Groups</p>
                    <div>{e.Date}&nbsp;&nbsp;{e.from_time}</div>
                </div>
                <div className='iconContainer'>
                    <div className='infoSchedule'>
                        <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                    </div>
                    <div className='edit_icon_wrapper' >
                        <MdEdit className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                    </div>
                    <div >
                        <MdDelete className="close-icon" onClick={(x)=>{handleRem(i);x.stopPropagation();}}/>
                    </div>
                </div>
            </div>
            )}
            
        </div> 
    </div>
    <div className='scheduleDetails'>

        {isOpen && <div className="sch_popup-boxd">
            <div className='sch_popupHeader'>
                <h2>Add a new schedule</h2>
            </div>

            <div className='sch_inputContainer'>
                <div className="sch_input-group">
                    <label>Topic </label>
                    <select onClick={(e)=>setTopic(e.target.value)} required={true}>
                        <option value={"Spring"}>Spring</option>
                        <option value={"MySQL"}>MySQL</option>
                    </select>                                                            
                </div>

                <div className="sch_input-group">
                    <label> Date: </label>
                    <input type="date"  value={date} onChange={handleDateChange} />
                </div>

                <div className="sch_input-group">
                    <label> From Time: </label>
                    <input step="2" type="time" value={fromTime} onChange={handleFromTimeChange} />                    
                </div>

                {/* <div className="sch_input-group">
                    <label> To Time:  </label>
                    <input step="2" type="time"  value={toTime} onChange={handleToTimeChange} />                 
                </div> */}

                <div className="sch_input-group">
                    <label>Trainer </label>
                    <select onClick={(e)=>setTrainer(e.target.value)} required={true}>
                        <option value={"Aman"}>Aman</option>
                        <option value={"Kunal"}>Kunal</option>
                    </select>                                                            
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Meet Link</label>
                    <input type="text" id="link" onChange={handleMeet} value={meet} />                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Assessment Link</label>
                    <input type="text" id="link" onChange={handleAssessment} value={assessment} />                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Feedback Link</label>
                    <input type="text" id="link" onChange={handleFeedback} value={feedback} />                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Description</label>
                    <textarea  onChange={handleDescription}  value={description} >{description}</textarea>                                                                                                                     
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Select Groups</label>
                    <div className='sch_internWrapperDiv'>
                        {
                            defaultGroupList.map((e)=><div className='sch_ListInternWrapper'>
                                <form>
                                    <input onClick={(x)=>handleAddList(x,e.batchId)} type="checkbox"/>
                                </form>
                                <p>{e.batchName}</p>
                            </div>)
                        }
                    </div>                                                           
                </div>

            </div>
            <div className='sch_buttonsContainer'>
                <button type="submit" className="submit-btn" onClick={()=>{handleClick()}}>
                    Submit
                </button>
                <button type="reset" className="cancel-btn" onClick={() =>{handleSetEmpty()}}>
                    Cancel
                </button>
            </div>
        </div>}


        {isOpenEdit && <div className="sch_popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className='sch_popupHeader'>
                <h2>Edit meeting details</h2>
            </div>
        
            <div className='sch_inputContainer'>
                <div className="sch_input-group">
                    <label>Topic </label>
                    <select onClick={(e)=>setTopic(e.target.value)} value={temp.meetTopic} required={true}>
                        <option value={"Spring"}>Spring</option>
                        <option value={"MySQL"}>MySQL</option>
                    </select>                                                         
                </div>

                <div className="sch_input-group">
                    <label> Date </label>
                    <input type="date" onChange={handleDateChange} value={temp.Date} />
                </div>

                <div className="sch_input-group">
                    <label> From Time </label>
                    <input step="2" type="time" onChange={handleFromTimeChange} value={temp.fromTime} />                    
                </div>

                {/* <div className="sch_input-group">
                    <label> To Time </label>
                    <input  type="time" value={toTime} onChange={handleToTimeChange} />                 
                </div> */}

                <div className="sch_input-group">
                    <label>Trainer </label>
                    <select onClick={(e)=>setTrainer(e.target.value)} value={temp.trainer} required={true}>
                        <option value={"Aman"}>Aman</option>
                        <option value={"Kunal"}>Kunal</option>
                    </select>                                                            
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Meet Link</label>
                    <input type="text" id="link" onChange={handleMeet} value={temp.meet} />                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Assessment Link</label>
                    <input type="text" id="link" onChange={handleAssessment} value={temp.assessment} />                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Feedback Link</label>
                    <input type="text" id="link" onChange={handleFeedback} value={temp.feedback} />                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Description</label>
                    <textarea  onChange={handleDescription}  value={temp.description} >{description}</textarea>                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Select Groups</label>
                    <div className='sch_internWrapperDiv'>
                        {
                            defaultGroupList.map((e)=><div className='sch_ListInternWrapper'>
                                <form>
                                    <input onClick={(x)=>handleAddList(x,e.batchId)} type="checkbox"/>
                                </form>
                                <p>{e.batchName}</p>
                            </div>)
                        }
                    </div>                                                             
                </div>        
            </div>

            <div className='sch_buttonsContainer'>
                <button type="submit" className="submit-btn" onClick={() => handleEditClick(arrId)}>
                    Submit
                </button>
                <button type="reset" className="cancel-btn" onClick={() => {handleCreateSch();handleSetEmpty();setTemp('');}}>
                    Cancel
                </button>
            </div>
        </div>}


        {isOpenDets && scheduleList.map((e, i) => <div className="sch_popup-boxd">
            <div className='sch_popupHeader'>
                <h2>Details Of schedule</h2>
            </div>

            <div className='sch_inputContainer'>
                <div className="sch_input-group">
                    <label>Topic </label>                                                            
                    <p>{viewList.meetTopic}</p>                                                            
                </div>

                <div className="sch_input-group">
                    <label> Date </label>                                                          
                    <p>{viewList.Date}</p> 
                </div>

                <div className="sch_input-group">
                    <label> From Time: </label>                                                           
                    <p>{viewList.from_time}</p>                     
                </div>

                <div className="sch_input-group">
                    <label>Trainer </label>                                                            
                    <p>{viewList.meetTrainer}</p>                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Meet Link</label>
        
                    <p>{viewList.meetLink}</p>                                                              
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
                    <p>{viewList.descriptionLink}</p>                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Select Groups</label>
                    <div className='sch_internWrapperDiv'>
                        {
                            defaultGroupList.map((e)=><div className='sch_ListInternWrapper'>
                                <form>
                                    <input checked={true} type="checkbox"/>
                                </form>
                                <p>{e.batchName}</p>
                            </div>)
                        }
                    </div>                                                           
                </div>
            </div>
            <div className='sch_buttonsContainer'>
                <button type="submit" className="submit-btn" onClick={() => {handleEditSch();}}>
                    Edit
                </button>
                <button type="reset" className="cancel-btn" onClick={() => {handleCreateSch();handleSetEmpty();}}>
                    Close
                </button>
            </div>
        </div>
        )}


    </div>
    </div>  

{isOpenCon && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Are you sure to delete this schedule?</h2>
        </div>
        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={() => handleRemoveClick(arrId)}>
                Yes
            </button>
            <button type="reset" className="cancel-btn" onClick={() => setIsOpenCon(false)}>
                No
            </button>
        </div>
    </div>
</div>
}
</>     
    )
}

export default Schedules;