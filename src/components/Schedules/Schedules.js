import React, { useContext, useEffect, useState } from 'react'
import './Schedules.css'
import { MdEdit, MdDelete, MdOutlineAddCircle, MdOutlineAddCircleOutline, MdAddCircle } from 'react-icons/md';
import {BsFillInfoCircleFill} from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa';
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';
import Select from "react-select";
import DatePicker from "react-multi-date-picker";


const Schedules = () => {
    const options = [
        { value: "blues", label: "Blues" },
        { value: "rock", label: "Rock" },
        { value: "jazz", label: "Jazz" },
        { value: "orchestra", label: "Orchestra" },
      ];
    const managerContext = useContext(ManagerContext);
    const authContext = useContext(AuthContext);
    const {train} = managerContext;
    const {userid} = authContext;
    const [scheduleList, setscheduleList] = useState([]);
    const [avlList, setavlList] = useState([]);
    const [instance, setInstance] = useState("");
    const [temp, setTemp] = useState({})
    const [arrId, setArrId] = useState()
    const [validMsg,setValidMsg] = useState("");
    const [isOpen, setIsOpen] = useState(true)
    const [isOpenCon, setIsOpenCon] = useState(false)
    const [isOpenDets, setIsOpenDets] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenGroups, setIsOpenGroups] = useState(false)
    const [topic, setTopic] = useState();
    const [date, setDate] = useState('');
    const [dateArr, setDateArr] = useState("");
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [trainer, setTrainer] = useState();
    const [defaultGroupList, setdefaultGroupList] = useState([]);
    const [tempGroupList, settempGroupList] = useState([]);
    const [defaultGroupIdList,setdefaultGroupIdList]=useState([]);
    const [availGroups,setavailGroups]=useState([]);
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
    const [currentTrainerInstance, setcurrentTrainerInstance] = useState({});
    const [finalList, setfinalList] = useState([]);
    const [useEffectReload, setUseEffectReload] = useState(false);
    const [useEffectReload1, setUseEffectReload1] = useState(false);
    const [topicList,setTopicList] = useState([]);
    const [trainerList,setTrainerList] = useState([]);
    const [meetingObj,setMeetingObj] = useState(null);
    const [popUp,setPopUp] = useState(false);
    const [checkFlag,setcheckFlag] = useState(false);
    const [checkedArr,setCheckedArr] = useState([]);
    const [grpAvlValueArr,setGrpAvlValueArr] = useState([]);
    const [selectTrainerCheck,setselectTrainerCheck] = useState(false);
    const [defBatchName,setDefBatchName] = useState(train.trainingName+"_"+train.trainingId);

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

    const handleCancelForAdd=()=>{
        const x=document.getElementById("datePicker");
        console.log(x)
        x.value="";
        x.selected="";
        console.log(x.value)
        setCheckedArr([])
        setDateArr([])
        setselectTrainerCheck(false)
        handleSetEmpty();
    }



    const handleGetTrainersByDate = () => {
        // setDate(date);
        setavlList([]);
        const arr=dateArr.split(" ");
        console.log(arr)
        let newarr=[];
        arr.forEach((d)=>newarr.push(d.replaceAll("/","-")))
        console.log(newarr)
        // arr.forEach((date,i)=>{
        //     axios.post(`http://localhost:8090/trainer/getTrainersByAvlAndSkill/${userid}`,{
        //         "topicId":topic,
        //         "date":new Date(date)
        //     }).then((res)=>{
        //         const newlist={
        //             "date":date,
        //             "trainers":res.data.trainers
        //         }
        //         // console.log(newlist)
        //         if(i===0){
        //             avlList.length=0;
        //             setavlList([]);
        //             console.log(avlList);
        //         }
        //         avlList.push(newlist);
        //         setavlList(avlList);
        //         if(i+1===arr.length)
        //             setselectTrainerCheck(true)
        //     })
        // })
        axios.post(`http://localhost:8090/trainer/getTrainersByAvlAndSkill/${userid}`,{
                "topicId":topic,
                "dateList":newarr
            }).then((res)=>{
                setavlList(res.data);
                console.log(res.data);
                console.log(avlList);
                setselectTrainerCheck(true)
            })
    }

    const handleAvlCheck=(r,e,i,j)=>{
        let inp1 = document.getElementById(`time${i}${j}0`);
        let inp2 = document.getElementById(`time${i}${j}1`);
        console.log(inp1.checkValidity())
        console.log(inp2.checkValidity());
        if(inp1.checkValidity() && inp2.checkValidity()){
            document.getElementById(`check${i}${j}`).disabled=false;
        }
        else{
            document.getElementById(`check${i}${j}`).checked=false;
            document.getElementById(`check${i}${j}`).disabled=true;
        }
    }

    const handleAvlCheckBox=(r,e,i,j,row)=>{
        console.log("H")
        console.log(r)
        setInstance(e);
        console.log(checkedArr)
        if(e.target.checked){
            if(checkedArr.length==0){
                setCheckedArr([...checkedArr,r])
                handleTrainerSelect(e,r,row)
            }
            else{
                const filteredArr = checkedArr.filter(avl=>avl.date==r.date);
                let flag=0;
                filteredArr.forEach(avl=>{
                    if(r.fromTime>=avl.fromTime && r.fromTime<avl.toTime){
                        flag=1;
                    }
                    if(r.toTime>avl.fromTime && r.toTime<=avl.toTime){
                        flag=1;
                    }
                    if(r.fromTime<=avl.fromTime && r.toTime>=avl.toTime){
                        flag=1;
                    }
                })
                console.log(flag)
                if(flag!=1){
                    setCheckedArr([...checkedArr,r]);
                    handleTrainerSelect(e,r,row)
                }
                else{
                    document.getElementById(`check${i}${j}`).checked=false;
                    setcheckFlag(true);
                }
            }
        }
        else{
            
            console.log("row",r)
            e.target.parentElement.nextSibling.innerHTML="";
            setfinalList(finalList.filter((meet)=>{
                console.log("meet",meet.availablityId)
                return meet.availablityId!==r.availabilityId
            }))
            console.log("uncheck",finalList)
            setCheckedArr(checkedArr.filter(avl=>avl!=r));
        }
    }

    const handleTrainerSelect=(e,r,row)=>{
        if(e.target.checked){
            console.log("iam here")
            console.log(r,row,topic)
            console.log(defaultGroupList)
            console.log(scheduleList)
            const obj={
                "meetingDesc":description,
                "date":r.date,
                "fromTime":r.fromTime,
                "toTime":r.toTime,
                "meetingLink":"link",
                "feedbackLink":"link",
                "assessmentLink":"link",
                "topicId":topic,
                "trainingId":train.trainingId,
                "trainerId":row.trainerId,
                "availablityId":r.availabilityId,
                "batchList":null
            }
            setcurrentTrainerInstance(obj);
            
            const list=scheduleList.filter((temp)=>{
                if(temp.date.localeCompare(r.date)===0 && ((r.toTime>=temp.fromTime) || (temp.toTime>=r.fromTime)))
                    return true;
                else return false;
            })
            console.log(list)
            const arr=[];
            list.forEach((tmp)=>{
                tmp.batchList.forEach((b)=>{
                    if(!arr.includes(b.batchId))
                        arr.push(b.batchId);
                })
            })
            console.log(arr)
            const availGrps=defaultGroupList.filter((temp)=>!arr.includes(temp.batchId))
            console.log(availGrps)
            tempGroupList.length=0;
            availGrps.forEach((x)=>tempGroupList.push(x));
            settempGroupList(tempGroupList);
            setIsOpenGroups(true);
        }
        else{
            console.log("unchecked")
        }
    }

    const handleScheduleEachTrainer=()=>{
        currentTrainerInstance.batchList=defaultGroupIdList;
        setcurrentTrainerInstance(currentTrainerInstance)
        const avlGroups=defaultGroupList.filter((temp)=>defaultGroupIdList.includes(temp.batchId))
        console.log(avlGroups);
        setavailGroups(avlGroups);
        console.log(instance.target.parentElement.nextSibling);
        let str="Groups - ";
        avlGroups.forEach((b,i)=>{
            if(i===avlGroups.length-1)
                str+=`<span>${b.batchName}</span>`
            else
                str+=`<span>${b.batchName}</span>,`
        });
        console.log(str);
        instance.target.parentElement.nextSibling.innerHTML=str;
        // const x=document.getElementById(`grps${currentTrainerInstance.availabilityId}`);
        // console.log(x)
        // x.style.display="block";
        console.log(currentTrainerInstance,defaultGroupIdList)
        finalList.push(currentTrainerInstance);
        setfinalList(finalList);
        setIsOpenGroups(false);
        setcurrentTrainerInstance([]);
        setdefaultGroupIdList([]);
        // handleSetEmpty();
    }

    const handleCancelForEachAvlGrps=()=>{
        console.log(currentTrainerInstance.availablityId)
        setCheckedArr(checkedArr.filter(avl=>avl.availabilityId!=currentTrainerInstance.availablityId));
        instance.target.checked=false;
        setIsOpenGroups(false);
    }

    const handleEachAddList=(chk,id)=>{
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
            const data = {
                "meetingDesc":description,
                "date":date,
                "fromTime":fromTime,
                "toTime":toTime,
                "meetingLink":meet,
                "feedbackLink":feedback,
                "assessmentLink":assessment,
                "topicId":topic,
                "trainingId":train.trainingId,
                "trainerId":trainer,
                "batchList":defaultGroupIdList
            }
            axios.post(`http://localhost:8090/batch/checkBatchAvailability/${id}`,data)
            .then((res)=>{
                console.log(res);
                if(res.data.result==1){
                    setGrpAvlValueArr([...grpAvlValueArr,id]);
                }
                defaultGroupIdList.push(id);
                setdefaultGroupIdList(defaultGroupIdList);
                console.log(defaultGroupIdList)
            })
        }
        else{
            setGrpAvlValueArr(grpAvlValueArr.filter(val=>val!=id));
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
        console.log(finalList)
        console.log("Finally")
        console.log(topic);
        console.log(trainer)
        setCheckedArr([]);
        finalList.forEach((lst)=>{
            const data = {
                "meetingDesc":lst.meetingDesc,
                "date":lst.date,
                "fromTime":lst.fromTime,
                "toTime":lst.toTime,
                "meetingLink":lst.meetingLink,
                "feedbackLink":lst.feedbackLink,
                "assessmentLink":lst.assessmentLink,
                "topicId":lst.topicId,
                "trainingId":lst.trainingId,
                "trainerId":lst.trainerId,
                "batchList":lst.batchList
            }
            axios.post(`http://localhost:8090/meeting/createMeeting`,data)
            .then((res)=>{
                console.log(res);
                setUseEffectReload(!useEffectReload)
                // handleSetEmpty();
                setCheckedArr([]);
                handleCreateSch();
                setPopUp(true);
            })
        })
        handleCancelForAdd();
        setfinalList([]);
        setCheckedArr([]);
    };

    const handleView = (e, i) => {
        setViewList(e);
        console.log(e)
        handleDetsSch();
    }

    // handle click event of the Edit button
    const handleEdit = (e,i) => {
        // setTopic(e.meetTopic);
        // setDate(e.Date);
        // setFromTime(e.from_time);
        console.log(e)
        setMeetingObj(e)
        handleEditSch();
        // handleSetEmpty();
        // setUseEffectReload(!useEffectReload)
        // setViewList(e);
        // setArrId(i);
        // setViewList('');
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
    const handleRem =  (e,i) => {
        console.log(e);
        setMeetingObj(e);
        setIsOpenCon(true);
    }

    const handleRemoveClick = () => {
        axios.delete(`http://localhost:8090/meeting/deleteMeeting/${meetingObj.meetingId}`)
        .then((res)=>{
            console.log(res)
            setIsOpenCon(false);
            setUseEffectReload(!useEffectReload)
        })
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
            // console.log("-1")
            return -1;
        }
        if (d1DateOnly.getTime() > d2DateOnly.getTime()) {
            // console.log("1")
            return 1;
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8090/meeting/getMeetings/${train.trainingId}`)
        .then((res)=>{
            setscheduleList(res.data.meeting);
            const currDate = getCurrentDate(); //To get the Current Date
            scheduleList.sort((a, b) => a.date.localeCompare(b.date));
            setPresent(res.data.meeting.filter(obj => obj.date == currDate));
            setPast(res.data.meeting.filter(obj => compareDates(obj.date, currDate) == -1));
            setFuture(res.data.meeting.filter(obj => compareDates(obj.date, currDate) == 1));
        })
        axios.get(`http://localhost:8090/topic/getTopics/${train.trainingId}`)
        .then((res)=>{
            console.log(res);
            setTopicList(res.data.topicList)
        })
        axios.get(`http://localhost:8090/trainer/getTrainersById/${userid}`)
        .then((res)=>{
            console.log(res);
            setTrainerList(res.data.trainers)
        })
        axios.get(`http://localhost:8090/batch/getBatch/${train.trainingId}`)
        .then((res)=>{
            console.log(res);
            setdefaultGroupList(res.data.batch);
            console.log("GROUPS ",res.data.batch)
        })
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

    const handlePopUpOk = ()=>{
        setPopUp(false);
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
                    <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    {/* <p>{e.batchList[0].batchName}</p> */}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >
                        {/* <div className='infoSchedule'>
                            <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                        </div> */}
                        <div>
                            <MdEdit className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                        </div>
                        <div>
                            <MdDelete className="close-icon" onClick={(x)=>{handleRem(e,i);x.stopPropagation();}}/>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {presentCheck && present.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    {/* <p>{e.batchList[0].batchName}</p> */}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >
                    {/* <div className='infoSchedule'>
                        <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                    </div> */}
                        <MdEdit className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                    </div>
                    <div>
                        <MdDelete className="close-icon" onClick={(x)=>{handleRem(e,i);x.stopPropagation();}}/>
                    </div>
                </div>
            </div>
            )}

            {futureCheck && future.map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    {/* <p>{e.batchList[0].batchName}</p> */}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
                <div className='iconContainer'>
                    {/* <div className='infoSchedule'>
                        <BsFillInfoCircleFill className='info_icon' onClick={() => handleView(e, i)}/>
                    </div> */}
                    <div className='edit_icon_wrapper' >
                        <MdEdit className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                    </div>
                    <div >
                        <MdDelete className="close-icon" onClick={(x)=>{handleRem(e,i);x.stopPropagation();}}/>
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
            <div className="sch_input_box">
            <div className='sch_inputContainer'>
                <div className="sch_input-group">
                    <label>Topic </label>
                    <select onClick={(e)=>setTopic(e.target.value)} required={true}>
                    <option selected={true} hidden={true} disabled={true}>Select one Topic </option>
                        {topicList.filter(topic=>topic.completed==false).map((e,i)=>{
                            return(
                            <option value={e.topicId}>{e.topicName}</option>
                            )
                        })}
                        </select>                                                            
                </div>

                <div className="sch_input-group">
                    <label> Date </label>
                    {isOpen &&
                    <DatePicker id='datePicker' placeholder='Select dates'
                            onChange={(arr)=>setDateArr(arr.join(" "))}
                            multiple={true}                         
                            minDate={new Date()}
                        />
                    }
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Description</label>
                    <textarea  onChange={handleDescription}  value={description} >{description}</textarea>                                                                                                                     
                </div>

                <button className='selectBtn' onClick={()=>handleGetTrainersByDate()}>Select&nbsp;Trainers</button>                                                                                                                     

                {
                    selectTrainerCheck && (
                        <>
                        <div className='avlWrapper'>
                        {avlList.map((list)=>
                        <div className='avlContainer'>
                            <h4>{list.date}</h4>
                            <div>
                                {list.trainer.length!==0 ? list.trainer.map((row,i)=>
                                        row.availabilityList.map((r,j)=><div className='avl_tile'>
                                            <div className='avl_List'>
                                                <input onClick={(e)=>handleAvlCheckBox(r,e,i,j,row)} id={`check${i}${j}`} type='checkbox'/>
                                                <p onClick={()=>console.log("hi")}>{row.trainerName}</p>
                                                <input id={`time${i}${j}0`} onChange={(e)=>handleAvlCheck(r,e,i,j)} min={r.fromTime} max={r.toTime} defaultValue={r.fromTime} step="1" type="time"/>
                                                <input id={`time${i}${j}1`} onChange={(e)=>handleAvlCheck(r,e,i,j)} min={r.fromTime} max={r.toTime} defaultValue={r.toTime} step="1" type="time"/>
                                            </div>
                                            <div className='selectedGroups' id={`grps${r.availabilityId}`}></div>
                                        </div>
                                        )
                                ):(<div className='noTrainers'>-- No Trainers Available For This Date --</div>)}
                            </div>
                        </div>)}</div></>)
                }


            </div>
            <div className='sch_buttonsContainer'>
                <button type="submit" className="submit-btn" onClick={()=>{handleClick()}}>
                    Create
                </button>
                <button type="reset" className="cancel-btn" onClick={() =>{handleCancelForAdd()}}>
                    Cancel
                </button>
            </div>
            </div>
        </div>}


        {isOpenEdit && <div className="sch_popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className='sch_popupHeader'>
                <h2>Edit meeting details</h2>
            </div>
            <div className="sch_input_box">
            <div className='sch_inputContainer'>
                <div className="sch_input-group">
                    <label>Topic</label>
                    <select onClick={(e)=>console.log(e.target.value)} value={topic} required={true}>
                    {topicList.map((e,i)=>{
                            return(
                            <option value={e.topicName}>{e.topicName}</option>
                            )
                        })}
                    </select>                                                         
                </div>

                <div className="sch_input-group">
                    <label> Date </label>
                    {/* <input type="date" value={date} onChange={handleDateChange} /> */}
                </div>

                <div className="sch_input-group">
                    <label> Start Time </label>
                    <input step="2" value={fromTime} type="time" onChange={handleFromTimeChange}/>                    
                </div>

                <div className="sch_input-group">
                    <label> End Time </label>
                    <input  type="time" value={toTime} onChange={handleToTimeChange} />                 
                </div>

                <div className="sch_input-group">
                    <label>Trainer </label>
                    <select onClick={(e)=>setTrainer(e.target.value)} defaultValue={trainer} required={true}>
                    {trainerList.map((e,i)=>{
                            return(
                            <option value={e.trainerName}>{e.trainerName}</option>
                            )
                        })}
                    </select>                                                            
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Meet Link</label>
                    <input type="text" id="link" onChange={handleMeet} value={meet}/>                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Assessment Link</label>
                    <input type="text" id="link" onChange={handleAssessment} value={assessment}/>                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Feedback Link</label>
                    <input type="text" id="link" onChange={handleFeedback} value={feedback}/>                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Description</label>
                    <textarea  onChange={handleDescription} value={description}>{description}</textarea>                                                             
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
            </div>
        </div>}


        {isOpenDets && <div className="sch_popup-boxd">
            <div className='sch_popupHeader'>
                <h2>Details Of schedule</h2>
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
                    <div className='sch_internWrapperDiv'>
                        {
                            viewList.batchList.map((e)=><div className='sch_ListInternWrapper'>
                                <p>{e.batchName}</p>
                            </div>)
                        }
                    </div>                                                           
                </div>
            </div>
            {/* <div className='sch_buttonsContainer'>
                <button type="submit" className="submit-btn" onClick={() => {handleEditSch();}}>
                    Edit
                </button>
                <button type="reset" className="cancel-btn" onClick={() => {handleCreateSch();handleSetEmpty();}}>
                    Close
                </button>
            </div> */}
        </div>
        </div>
        }


    </div>
    </div>  

{isOpenCon && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Are you sure to delete this schedule?</h2>
        </div>
        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={() => handleRemoveClick()}>
                Yes
            </button>
            <button type="reset" className="cancel-btn" onClick={() => setIsOpenCon(false)}>
                No
            </button>
        </div>
    </div>
</div>}

{isOpenGroups && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Select Groups</h2>
        </div>

        <div className='inputContainer'>
            <div className='internWrapperDiv'>
                {
                    tempGroupList.map((e)=><div className='ListInternWrapper'>
                        <form>
                            <input  onClick={(x)=>handleEachAddList(x,e.batchId)} type="checkbox"/>
                        </form>
                        <p>{e.batchName}</p>
                    </div>)
                }
            </div>
        </div>

        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={() => handleScheduleEachTrainer()}>
                Submit
            </button>
            <button type="reset" className="cancel-btn" onClick={() => handleCancelForEachAvlGrps()}>
                Cancel
            </button>
        </div>
    </div>
</div>}

{popUp && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Schedule Created</h2>
        </div>
        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={() => handlePopUpOk()}>
                Ok
            </button>
        </div>
    </div>
</div>}

{checkFlag && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Conflict With Selected Timings</h2>
        </div>
        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={() => setcheckFlag(false)}>
                Ok
            </button>
        </div>
    </div>
</div>}
</>     
    )
}

export default Schedules;