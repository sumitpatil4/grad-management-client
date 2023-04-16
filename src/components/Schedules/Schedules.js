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
        },
        {
        // meetId: 2,
        meetTopic: "Java",
        Date: "2021-02-20",
        from_time: "10:00",
        // to_time: "05:00PM"
        },
        {
        // meetId: 3,
        meetTopic: "C++",
        Date: "2023-04-15",
        from_time: "10:00",
        // to_time: "05:00PM"
        },
        {
        // meetId: 4,
        meetTopic: "JavaScript",
        Date: "2024-04-15",
        from_time: "10:00",
        // to_time: "05:00PM"
        },
    ]);
    const [temp, setTemp] = useState({})
    const [arrId, setArrId] = useState()
    const [validMsg,setValidMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCon, setIsOpenCon] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [fromTime, setFromTime] = useState('');
    // const [toTime, setToTime] = useState('');
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


    const handleDateChange = (e) => {
        // setDate(date);
        setDate(e.target.value);
    }
    
    const handleFromTimeChange = (e) => {
        // setFromTime(fromTime);
        setFromTime(e.target.value);
    }
    
    // const handleToTimeChange = (e) => {
    //     setToTime(e.target.value);
    // }

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
        setIsOpen(false);
        const x={
            meetTopic: topic,
            Date: date,
            from_time: fromTime,
        }
        console.log(x)
        setscheduleList(current => [...current, x]);
        setUseEffectReload(!useEffectReload)
        console.log(scheduleList)
        setTopic('');
        setDate('');
        setFromTime('');
        setTrainer('');
        setMeet('');
        setAssessmentt('');
        setFeedback('');
        setFeedback('');
        }
    };

    const handleView = (e, i) => {
        
        console.log(e)
        setViewList(e);
        
        console.log(viewList)
    }

    // handle click event of the Edit button
    const handleEdit = (e,i) => {
        setTopic(e.meetTopic);
        setDate(e.Date);
        setFromTime(e.from_time);
    setArrId(i);
    setIsOpenEdit(true);
    setTemp(scheduleList[arrId]);
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
    setIsOpenEdit(false);
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

    return (
    <div className='scheduleContainer'>
        <div className="scheduleWrapper">
            <h2>Schedules</h2>
        <div className='scheduleNavbar'>
            <div className='buttonsWrapper'>
            <p className='headerText' onClick={(e) => {
                  setPastCheck(true);
                  setPresentCheck(false);
                  setFutureCheck(false);
                  activeClass(e);
                }}>Completed</p>
            <p className='headerText active' onClick={(e) => {
                  setPastCheck(false);
                  setPresentCheck(true);
                  setFutureCheck(false);
                  activeClass(e);
                }}>Today</p>
            <p className='headerText' onClick={(e) => {
                  setPastCheck(false);
                  setPresentCheck(false);
                  setFutureCheck(true);
                  activeClass(e);
                }}>Upcoming</p>
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
                <p className="topicAdd" onClick={() => setIsOpen(true)}>
                    Add&nbsp;Topic</p>
                {/* <div onClick={() => setIsOpen(true)}>
            <MdAddCircle className='addSchedule'/>                           
        </div> */}
              </div>
            </div>

        </div>

        {/* onclick */}
        <div className='schedules'>            
            {pastCheck && past.map((e, i) => <div onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <div>{e.meetTopic}</div>
                    <div>{e.Date}</div>
                    <div>{e.from_time}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >
                    <div className='infoSchedule'>
                        <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                    </div>
                        <MdEdit className='edit_icon' onClick={() => handleEdit(e,i)}/>
                    </div>
                    <div >
                        <MdDelete className="close-icon" onClick={()=>handleRem(i)}/>
                    </div>
                </div>
            </div>
            )}

            {presentCheck && present.map((e, i) => <div onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <div>{e.meetTopic}</div>
                    <div>{e.Date}</div>
                    <div>{e.from_time}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >
                    <div className='infoSchedule'>
                        <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                    </div>
                        <MdEdit className='edit_icon' onClick={() => handleEdit(e,i)}/>
                    </div>
                    <div >
                        <MdDelete className="close-icon" onClick={()=>handleRem(i)}/>
                    </div>
                </div>
            </div>
            )}

            {futureCheck && future.map((e, i) => <div className='eachSchedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <div>{e.meetTopic}</div>
                    <div>{e.Date}</div>
                    <div>{e.from_time}</div>
                </div>
                <div className='iconContainer'>
                    <div className='infoSchedule'>
                        <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                    </div>
                    <div className='edit_icon_wrapper' >
                        <MdEdit className='edit_icon' onClick={() => handleEdit(e,i)}/>
                    </div>
                    <div >
                        <MdDelete className="close-icon" onClick={()=>handleRem(i)}/>
                    </div>
                </div>
            </div>
            )}
            
        </div> 
        

        </div>

        {isOpen && <form><div className='popupContainer'>
            <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Add a new schedule</h2>
                </div>

                <div className='inputContainer'>
                    <div className="input-group">
                        <label>Topic </label>
                        <select onClick={(e)=>setTopic(e.target.value)} required={true}>
                            <option value={"Spring"}>Spring</option>
                            <option value={"MySQL"}>MySQL</option>
                        </select>                                                            
                    </div>

                    <div className="input-group">
                        <label> Date: </label>
                        <input type="date"  value={date} onChange={handleDateChange} />
                    </div>

                    <div className="input-group">
                        <label> From Time: </label>
                        <input  type="time" value={fromTime} onChange={handleFromTimeChange} />                    
                    </div>

                    {/* <div className="input-group">
                        <label> To Time:  </label>
                        <input type="time"  value={toTime} onChange={handleToTimeChange} />                 
                    </div> */}

                    <div className="input-group">
                        <label>Trainer </label>
                        <select onClick={(e)=>setTrainer(e.target.value)} required={true}>
                            <option value={"Aman"}>Aman</option>
                            <option value={"Kunal"}>Kunal</option>
                        </select>                                                            
                    </div>

                    <div className='inputContainer'>
                        <h2>Select Groups</h2>
                        <div className='grpWrapperDiv'>
                            {
                                defaultGroupList.map((e)=><div className='grpInternWrapper'>
                                    <form>
                                        <input onClick={(x)=>handleAddList(x,e.batchId)} type="checkbox"/>
                                    </form>
                                    <p>{e.batchName}</p>
                                </div>)
                            }
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Meet Link</label>
                        <input type="text" id="link" onChange={handleMeet} value={meet} />                                                             
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Assessment Link</label>
                        <input type="text" id="link" onChange={handleAssessment} value={assessment} />                                                             
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Feedback Link</label>
                        <input type="text" id="link" onChange={handleFeedback} value={feedback} />                                                             
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Description</label>
                        <input type="text" id="link" onChange={handleDescription} value={description} />                                                             
                    </div>

                </div>
                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" onClick={handleClick}>
                        Submit
                    </button>
                    <button type="reset" className="cancel-btn" onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div></form>}

        {isOpenEdit && <form><div className='popupContainer'>
            <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Edit meeting details</h2>
                </div>
                
                <div className='inputContainer'>
                    <div className="input-group">
                        <label>Topic </label>
                        <select onClick={(e)=>setTopic(e.target.value)} required={true}>
                            <option value={"Spring"}>Spring</option>
                            <option value={"MySQL"}>MySQL</option>
                        </select>                                                         
                    </div>

                    <div className="input-group">
                        <label> Date </label>
                        <input type="date" onChange={handleDateChange} value={date} />
                    </div>

                    <div className="input-group">
                        <label> From Time </label>
                        <input type="time" onChange={handleFromTimeChange} value={fromTime} />                    
                    </div>

                    {/* <div className="input-group">
                        <label> To Time </label>
                        <input type="time" value={trainerTemp.to_time} onChange={handleToTimeChange} />                 
                    </div> */}

                    <div className="input-group">
                        <label>Trainer </label>
                        <select onClick={(e)=>setTrainer(e.target.value)} required={true}>
                            <option value={"Aman"}>Aman</option>
                            <option value={"Kunal"}>Kunal</option>
                        </select>                                                            
                    </div>

                    <div className='inputContainer'>
                        <h2>Select Groups</h2>
                        <div className='grpWrapperDiv'>
                            {
                                defaultGroupList.map((e)=><div className='grpInternWrapper'>
                                    <form>
                                        <input onClick={(x)=>handleAddList(x,e.batchId)} type="checkbox"/>
                                    </form>
                                    <p>{e.batchName}</p>
                                </div>)
                            }
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Meet Link</label>
                        <input type="text" id="link" onChange={handleMeet} value={meet} />                                                             
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Assessment Link</label>
                        <input type="text" id="link" onChange={handleAssessment} value={assessment} />                                                             
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Feedback Link</label>
                        <input type="text" id="link" onChange={handleFeedback} value={feedback} />                                                             
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Description</label>
                        <input type="text" id="link" onChange={handleDescription} value={description} />                                                             
                    </div>
                </div>

                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" onClick={() => handleEditClick(arrId)}>
                        Submit
                    </button>
                    <button type="reset" className="cancel-btn" onClick={() => {setIsOpenEdit(false);setTemp('');}}>
                        Cancel
                    </button>
                </div>
            </div>
        </div></form>}

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

        <div className='schedule Details'>
            hello 
            {viewList.meetTopic}
        </div>

    </div>       
    )
}

export default Schedules;