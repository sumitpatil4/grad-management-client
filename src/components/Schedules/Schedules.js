import React, { useContext, useEffect, useState, useRef } from 'react'
import './Schedules.css'
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from 'axios';
import DatePicker from "react-multi-date-picker";
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { PuffLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io';

const Schedules = () => {
    const navigate=useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [tokenClient,setTokenClient] = useState({});
    const [accessToken,setAccessToken] = useState("");
    const managerContext = useContext(ManagerContext);
    const authContext = useContext(AuthContext);
    const {train} = managerContext;
    const {userid,usermail,username} = authContext;
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
    const [topicName, setTopicName] = useState("");
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
    const [editPopUp,setEditPopUp] = useState(false);
    const [checkFlag,setcheckFlag] = useState(false);
    const [checkedArr,setCheckedArr] = useState([]);
    const [grpAvlValueArr,setGrpAvlValueArr] = useState([]);
    const [selectTrainerCheck,setselectTrainerCheck] = useState(false);
    const [defBatchName,setDefBatchName] = useState(train.trainingName+"_"+train.trainingId);
    const [calendarFlag,setCalendarFlag] = useState(true);
    const [calendarPopUp,setCalendarPopUp] = useState(false);
    const [uploadPopUp,setuploadPopUp] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [internInstance,setinternInstance] = useState([]);
    const fileInput = useRef(null);
    const [resPopUp,setResPopUp] = useState(false);
    const [resMessage,setResMessage] = useState("");

    const handleFileSubmit = (e) => {
        e.preventDefault(); // prevent default form submission behavior
        AttendanceExcel(fileInput.current.files[0]);
        
      };

    const handleCreateSch=()=>{
        setIsOpen(true);
        setselectTrainerCheck(false);
        setDescription("");
        setDateArr([]);
        setTopic("");
        setTopicName("");
        setIsOpenEdit(false);
        setIsOpenDets(false);
    }

    const handleEditSch=()=>{
        setIsOpen(false);
        setIsOpenEdit(true);
        setselectTrainerCheck(false);
        setIsOpenDets(false);
        // setViewList()
    }

    const handleDetsSch=()=>{
        setIsOpen(false);
        setIsOpenEdit(false);
        setselectTrainerCheck(false);
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
        x.value="";
        x.selected="";
        setCheckedArr([])
        setDateArr([])
        setselectTrainerCheck(false)
        handleSetEmpty();
    }



    const handleGetTrainersByDate = () => {
        setavlList([]);
        setCheckedArr([]);
        setfinalList([]);
        const arr=dateArr.split(" ");

        let newarr=[];
        arr.forEach((d)=>newarr.push(d.replaceAll("/","-")))
        setIsLoading(true);
        axios.post(`http://localhost:8090/trainer/getTrainersByAvlAndSkill/${userid}`,{
            "topicId":topic,
            "dateList":newarr
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then((res)=>{
            setavlList(res.data.sort((a,b)=>{
                return new Date(a.date)-new Date(b.date);
            }));
            setselectTrainerCheck(true);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
    }

    const handleAvlCheck=(r,e,i,j,k)=>{
        let inp1 = document.getElementById(`time${i}${j}${k}0`);
        let inp2 = document.getElementById(`time${i}${j}${k}1`);
        if(inp1.checkValidity() && inp2.checkValidity()){
            document.getElementById(`check${i}${j}${k}`).disabled=false;
        }
        else{
            setfinalList(finalList.filter((meet)=>{
                return meet.availablityId!==r.availabilityId
            }))
            setCheckedArr(checkedArr.filter(avl=>avl.availabilityId!=r.availabilityId));
            document.getElementById(`check${i}${j}${k}`).checked=false;
            document.getElementById(`check${i}${j}${k}`).disabled=true;
        }
    }

    const handleAvlCheckBox=(r,e,i,j,k,row)=>{

        setInstance(e);
        let from = document.getElementById(`time${i}${j}${k}0`).value;
        let to = document.getElementById(`time${i}${j}${k}1`).value;
        const temp_r = {...r}
        temp_r.fromTime=from;
        temp_r.toTime=to;

        if(e.target.checked){
            if(checkedArr.length==0){
                setCheckedArr([...checkedArr,temp_r])
                handleTrainerSelect(e,temp_r,row,i,j,k)
            }
            else{
                const filteredArr = checkedArr.filter(avl=>avl.date==r.date);
                let flag=0;
                filteredArr.forEach(avl=>{
                    if(temp_r.fromTime>=avl.fromTime && temp_r.fromTime<avl.toTime){
                        flag=1;
                    }
                    if(temp_r.toTime>avl.fromTime && temp_r.toTime<=avl.toTime){
                        flag=1;
                    }
                    if(temp_r.fromTime<=avl.fromTime && temp_r.toTime>=avl.toTime){
                        flag=1;
                    }
                })
                if(flag!=1){
                    setCheckedArr([...checkedArr,temp_r]);
                    handleTrainerSelect(e,temp_r,row,i,j,k)
                }
                else{
                    document.getElementById(`check${i}${j}${k}`).checked=false;
                    setcheckFlag(true);
                }
            }
        }
        else{
            e.target.parentElement.nextSibling.innerHTML="";
            setfinalList(finalList.filter((meet)=>{
                return meet.availablityId!==r.availabilityId;
            }))
            setCheckedArr(checkedArr.filter(avl=>avl.availabilityId!=r.availabilityId));
        }
    }

    const handleTrainerSelect=(e,r,row,i,j,k)=>{
        if(e.target.checked){
            let from = document.getElementById(`time${i}${j}${k}0`).value;
            let to = document.getElementById(`time${i}${j}${k}1`).value;
            const obj={
                "meetingDesc":description,
                "date":r.date,
                "fromTime":from,
                "toTime":to,
                "meetingLink":"link",
                "feedbackLink":"link",
                "assessmentLink":"link",
                "topicId":topic,
                "trainingId":train.trainingId,
                "trainerId":row,
                "availablityId":r.availabilityId,
                "batchList":null
            }
            setcurrentTrainerInstance(obj);

            const list=scheduleList.filter((temp)=>{

                if(temp.date.localeCompare(r.date)===0)
                {
                    if(from>=temp.fromTime && from<temp.toTime){
                        return true;
                    }
                    if(to>temp.fromTime && to<=temp.toTime){
                        return true;
                    }
                    if(from<=temp.fromTime && to>=temp.toTime){
                        return true;
                    }
                    return false;
                }
                else return false;
            })
            const arr=[];
            list.forEach((tmp)=>{
                tmp.batchList.forEach((b)=>{
                    if(!arr.includes(b.batchId))
                        arr.push(b.batchId);
                })
            })
            const availGrps=defaultGroupList.filter((temp)=>!arr.includes(temp.batchId) && (temp.batchName!=defBatchName))
            tempGroupList.length=0;
            availGrps.forEach((x)=>tempGroupList.push(x));
            settempGroupList(tempGroupList);
            setIsOpenGroups(true);
        }
    }

    const handleScheduleEachTrainer=()=>{
        currentTrainerInstance.batchList=defaultGroupIdList;
        setcurrentTrainerInstance(currentTrainerInstance)
        const avlGroups=defaultGroupList.filter((temp)=>defaultGroupIdList.includes(temp.batchId))

        setavailGroups(avlGroups);

        let str="Groups - ";
        avlGroups.forEach((b,i)=>{
            if(i===avlGroups.length-1)
                str+=`<span>${b.batchName}</span>`
            else
                str+=`<span>${b.batchName}</span>,`
        });

        instance.target.parentElement.nextSibling.innerHTML=str;

        finalList.push(currentTrainerInstance);
        setfinalList(finalList);
        setIsOpenGroups(false);
        setcurrentTrainerInstance([]);
        setdefaultGroupIdList([]);

    }

    const handleCancelForEachAvlGrps=()=>{

        setCheckedArr(checkedArr.filter(avl=>avl.availabilityId!=currentTrainerInstance.availablityId));
        instance.target.checked=false;
        setIsOpenGroups(false);
    }

    const handleEachAddList=(chk,id)=>{
        if(chk.target.checked)
        {
            if(!defaultGroupIdList.includes(id)){
                defaultGroupIdList.push(id);
                setdefaultGroupIdList(defaultGroupIdList);
            }
        }
        else{
            if(defaultGroupIdList.includes(id))
            {
                defaultGroupIdList.splice(defaultGroupIdList.indexOf(id), 1);
                setdefaultGroupIdList(defaultGroupIdList);
            }
            document.getElementById('group_checkbox').checked=false;
        }
    }

    const handleDateChange = (e) => {
        // setDate(date);
        setDate(e.target.value);
    }
    
    const handleFromTimeChange = (e) => {
        setFromTime(e);
    }
    
    const handleToTimeChange = (e) => {
        setToTime(e);
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
            setIsLoading(true);
            axios.post(`http://localhost:8090/batch/checkBatchAvailability/${id}`,data,{
                headers:{
                  "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                }
              })
            .then((res)=>{
                if(res.data.result==1){
                    setGrpAvlValueArr([...grpAvlValueArr,id]);
                }
                defaultGroupIdList.push(id);
                setdefaultGroupIdList(defaultGroupIdList);
                setIsLoading(false);
            }).catch((err)=>{
                setResMessage(err.response.data.message);
                setResPopUp(true);
                setIsLoading(false);
            });
        }
        else{
            setGrpAvlValueArr(grpAvlValueArr.filter(val=>val!=id));
            if(defaultGroupIdList.includes(id))
            {
                defaultGroupIdList.splice(defaultGroupIdList.indexOf(id), 1);
                setdefaultGroupIdList(defaultGroupIdList);
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

    function handleCalenderClick(){
        tokenClient.requestAccessToken();
    }

    
    
    const handleClick = () => {
        setCheckedArr([]);
        finalList.forEach((lst,i)=>{
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
            axios.post(`http://localhost:8090/meeting/createMeeting`,data,{
                headers:{
                  "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                }
              })
            .then((res)=>{
                const meet = res.data.meeting;
                const batchArr = [];
                meet.batchList.forEach((batch)=>{
                    batchArr.push(batch.batchId);
                })
                axios.post(`http://localhost:8090/batch/getInternsByBatch`,{
                    "batchList":batchArr
                },{
                    headers:{
                      "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                    }
                  }).then((res)=>{
                    const interArr=[];
                    res.data.interns.forEach((intern)=>{
                        interArr.push({'email':intern.email});
                    })
                    interArr.push({'email':meet.trainer.email})
                    interArr.push({'email':usermail})
                    const TEST_EVENT = {
                        'summary': meet.topic.topicName,
                        'description': meet.meetingDesc,
                        'start': {
                          'dateTime': `${meet.date}T${meet.fromTime}`,
                          'timeZone': 'Asia/Calcutta'
                        },
                        'end': {
                          'dateTime': `${meet.date}T${meet.toTime}`,
                          'timeZone': 'Asia/Calcutta'
                        },
                        'guestsCanInviteOthers':false,
                        'guestsCanModify':false,
                        "conferenceData": {
                          "createRequest": {
                            "conferenceSolutionKey": {
                              "type": "hangoutsMeet"
                            },
                            "requestId": "abcd"
                          }
                        },
                        'attendees': interArr,
                        'reminders': {
                          'useDefault': false,
                          'overrides': [
                            {'method': 'email', 'minutes': 60 },
                            {'method': 'popup', 'minutes': 10}
                          ]
                        }
                      };
                    fetch ('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',{
                        method: 'POST',
                        headers: {
                            'Authorization':'Bearer '+accessToken
                        },
                        body:JSON.stringify(TEST_EVENT)
                    }).then((data) => {
                        return data.json();
                    }).then((data) => {
                        alert('event created check google calendar')
                    }).catch((err)=>{
                        setResMessage(err.response.data.message);
                        setResPopUp(true);
                    });
                    setUseEffectReload(!useEffectReload)

                    setCheckedArr([]);
                    handleCreateSch();
                    if(i===finalList.length-1){
                        setPopUp(true);
                    }
                })
            })
        })
        handleCancelForAdd();
        setfinalList([]);
        setCheckedArr([]);
    };

    const newhandleClick = () => {
        finalList.forEach((lst,i)=>{
            setIsLoading(true);
            axios.post(`http://localhost:8090/batch/getInternsByBatch`,{
                "batchList":lst.batchList
            },{
                headers:{
                  "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                }
              }).then((res)=>{
                const interArr=[];
                res.data.interns.forEach((intern)=>{
                    interArr.push({'email':intern.email});
                })
                // interArr.push({'email':lst.trainerId.email})
                interArr.push({'email':usermail});

                const EVENT = {
                    'summary': topicName,
                    'description': lst.meetingDesc,
                    'start': {
                      'dateTime': `${lst.date}T${lst.fromTime}`,
                      'timeZone': 'Asia/Calcutta'
                    },
                    'end': {
                      'dateTime': `${lst.date}T${lst.toTime}`,
                      'timeZone': 'Asia/Calcutta'
                    },
                    'guestsCanInviteOthers':false,
                    'guestsCanModify':false,
                    "conferenceData": {
                      "createRequest": {
                        "conferenceSolutionKey": {
                          "type": "hangoutsMeet"
                        },
                        "requestId": "abcd"
                      }
                    },
                    'attendees': interArr,
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 60 },
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                };
                fetch ('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',{
                    method: 'POST',
                    headers: {
                        'Authorization':'Bearer '+accessToken
                    },
                    body:JSON.stringify(EVENT)
                }).then((data) => {
                    return data.json();
                }).then((data) => {
                    const obj = {
                        "meetingDesc":lst.meetingDesc,
                        "date":lst.date,
                        "fromTime":lst.fromTime,
                        "toTime":lst.toTime,
                        "meetingLink":data.hangoutLink,
                        "feedbackLink":lst.feedbackLink,
                        "assessmentLink":lst.assessmentLink,
                        "topicId":lst.topicId,
                        "trainingId":lst.trainingId,
                        "trainerId":lst.trainerId.trainerId,
                        "batchList":lst.batchList,
                        "eventId":data.id,
                        "availabilityUsed":lst.availablityId
                    }
                    axios.post(`http://localhost:8090/meeting/createMeeting`,obj,{
                        headers:{
                          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                        }
                      })
                    .then((res)=>{
                        setIsLoading(false);
                        handleCancelForAdd();
                        setfinalList([]);
                        setCheckedArr([]);
                        handleCreateSch();
                        if(i===finalList.length-1){
                            setPopUp(true);
                        }
                    }).catch((err)=>{
                        setResMessage(err.response.data.message);
                        setResPopUp(true);
                        setIsLoading(false);
                    });
                }).catch((err)=>{
                    setResMessage(err.response.data.message);
                    setResPopUp(true);
                    setIsLoading(false);
                });
            }).catch((err)=>{
                setResMessage(err.response.data.message);
                setResPopUp(true);
                setIsLoading(false);
            });  
        })
    };

    const handleView = (e, i) => {
        setViewList(e);
        setinternInstance([]);
        handleDetsSch();
    }

    // handle click event of the Edit button
    const handleEdit = (e,i) => {
        setMeetingObj(e)
        handleEditSch();
    }

    const handleSelectAll = (e)=>{
        const boxes = document.getElementsByName('group_checkbox');
        boxes.forEach((box)=>{
            handleEachAddList(e,parseInt(box.id));
            box.checked = e.target.checked;
        })
    }

    const handleEditClick = () => {
        const arr=[]
        meetingObj.batchList.forEach((batch)=>arr.push(batch.batchId));
        const data={
            "meetingId": meetingObj.meetingId,
            "meetingDesc":description,
            "date":meetingObj.date,
            "fromTime":meetingObj.fromTime,
            "toTime":meetingObj.toTime,
            "meetingLink":meetingObj.meetingLink,
            "feedbackLink":meetingObj.feedbackLink,
            "assessmentLink":meetingObj.assessmentLink,
            "topicId":meetingObj.topic.topicId,
            "trainingId":meetingObj.training.trainingId,
            "trainerId":meetingObj.trainer.trainerId,
            "batchList":arr,
            "eventId":meetingObj.eventId,
            "availabilityUsed":meetingObj.availabilityUsed
        }
        setIsLoading(true);
        axios.put(`http://localhost:8090/meeting/updateMeeting`,data,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            setUseEffectReload(!useEffectReload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setEditPopUp(true);
        setIsOpenEdit(false);
        // setIsOpenDets(true);
        handleSetEmpty();
        // setUseEffectReload(!useEffectReload)
    };

    // handle click event of the Remove button
    const handleRem =  (e,i) => {
        setMeetingObj(e);
        if(localStorage.getItem('calendarToken')!=null){
            setIsOpenCon(true);
        }
        else{
            setCalendarPopUp(true);
        }
    }

    const handleRemoveClick = () => {
        setIsLoading(true);
        fetch (`https://www.googleapis.com/calendar/v3/calendars/primary/events/${meetingObj.eventId}?sendUpdates=all`,{
            method: 'DELETE',
            headers: {
                'Authorization':'Bearer '+accessToken
            }
        }).then((res)=>{
            axios.delete(`http://localhost:8090/meeting/deleteMeeting/${meetingObj.meetingId}`,{
                headers:{
                  "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                }
              })
            .then((res)=>{
                setIsOpenCon(false);
                setUseEffectReload(!useEffectReload);
                handleCreateSch();
                setIsLoading(false);
            }).catch((err)=>{
                setResMessage(err.response.data.message);
                setResPopUp(true);
                setIsLoading(false);
            });
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
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
            return -1;
        }
        if (d1DateOnly.getTime() > d2DateOnly.getTime()) {
            return 1;
        }
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8090/meeting/getMeetings/${train.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            setscheduleList(res.data.meeting);
            const currDate = getCurrentDate(); //To get the Current Date
            // res.data.meeting.sort((a, b) => {
            //     const dateComparison = a.date.localeCompare(b.date);
            //     if (dateComparison === 0) {
            //         return a.time.localeCompare(b.time);
            //       }
            //       return dateComparison;
            // });
            // res.data.meeting.sort((a, b) => a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
            res.data.meeting.sort((a, b) => a.date.localeCompare(b.date));
            setPresent(res.data.meeting.filter(obj => obj.date == currDate));
            setPast(res.data.meeting.filter(obj => compareDates(obj.date, currDate) == -1));
            setFuture(res.data.meeting.filter(obj => compareDates(obj.date, currDate) == 1));
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setIsLoading(true);
        axios.get(`http://localhost:8090/topic/getTopics/${train.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            setTopicList(res.data.topicList);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setIsLoading(true);
        axios.get(`http://localhost:8090/trainer/getTrainersById/${userid}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            setTrainerList(res.data.trainers);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setIsLoading(true);
        axios.get(`http://localhost:8090/batch/getBatch/${train.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            setdefaultGroupList(res.data.batch);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
    }, [useEffectReload])

    useEffect(()=>{
        /* global google */
        const google = window.google;
        setTokenClient(
            google.accounts.oauth2.initTokenClient({
              client_id:"994239778897-qed7j3c4duls2vsten5eaqj5vsi13na0.apps.googleusercontent.com",
              access_type:"offline",
              scope:"openid email profile https://www.googleapis.com/auth/calendar",
              callback:(tokenResponse)=>{

                setAccessToken(tokenResponse.access_token);
                localStorage.setItem('calendarToken',tokenResponse.access_token);
                localStorage.setItem('calendarTokenInit',new Date());
                setCalendarFlag(false);
                setCalendarPopUp(false);
              }
            })
          )
    },[])

    useEffect(()=>{
        if(localStorage.getItem('calendarToken')!=null){
            let t1 = new Date(localStorage.getItem('calendarTokenInit')).getTime();
            let t2 = new Date().getTime();
            let diff = t2-t1;
            let res = Math.round(diff / 60000);

            if(res > 30){
                localStorage.removeItem('calendarToken');
                localStorage.removeItem('calendarTokenInit');
                setCalendarFlag(true);
                setCalendarPopUp(false);
            }
            else{
                setAccessToken(localStorage.getItem('calendarToken'));
                setCalendarFlag(false);
            }
        }
        else{
            localStorage.removeItem('calendarToken');
            localStorage.removeItem('calendarTokenInit');
            setCalendarFlag(true);
        }
    },[localStorage,useEffectReload])

    const activeClass=(e,str)=>{
        let btns = document.getElementsByClassName(str);
        let x=[...btns]
        x.forEach((t)=>t.className=str)
        e.target.className+=" active";
    }

    const handleClickCompleted=(e,str)=>{
        setPastCheck(true);
        setPresentCheck(false);
        setFutureCheck(false);
        activeClass(e,str);
    }

    const handleClickToday=(e,str)=>{
        setPastCheck(false);
        setPresentCheck(true);
        setFutureCheck(false);
        activeClass(e,str);
    }

    const handleClickUpcoming=(e,str)=>{
        setPastCheck(false);
        setPresentCheck(false);
        setFutureCheck(true);
        activeClass(e,str);
    }

    const handlePopUpOk = ()=>{
        setPopUp(false);
        setUseEffectReload(!useEffectReload);
    }

    const handleEditPopUpOk = ()=>{
        setEditPopUp(false);
        setUseEffectReload(!useEffectReload);
    }

    const handleUploadPopUpOk = () => {
        setUploaded(false);
        setUseEffectReload(!useEffectReload);
    }

    const filteredList = (list)=>{

        const filteredList = list.filter(
            (meet) =>
              meet.topic.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              meet.trainer.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        return filteredList;
    }

    const handleGetInternsByBatchId=(batchId,meetId,e,str)=>{
        activeClass(e,str);
        setIsLoading(true);
        axios.post(`http://localhost:8090/batch/getInternsByBatch`,{
            "batchList":[batchId],
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            res.data.interns.forEach((intern)=>{
                intern.attendanceList=intern.attendanceList.filter((att)=>att.meeting.meetingId===meetId);
            })
            setinternInstance(res.data.interns)
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
    }

    const [meetIdAtt,setmeetIdAtt]=useState({});

    const AttendanceExcel = (file) => {
        setuploadPopUp(false);
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const attendanceData = XLSX.utils.sheet_to_json(worksheet);
          const idList=[],attendanceList=[],currentMeetBatch=[];
          setIsLoading(true);
          axios.get(`http://localhost:8090/intern/getInterns/${train.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
            .then((res)=>{
                console.log(res.data,meetIdAtt)
                meetIdAtt.batchList.forEach((bch)=>{
                    currentMeetBatch.push(bch.batchId)
                })
                attendanceData.forEach((record)=>{
                    const row=res.data.intern.filter((x)=>x.email===record.Email && currentMeetBatch.includes(x.batch.batchId))
                    if(row.length===1)
                    {
                        idList.push(row[0].internId);
                        attendanceList.push(record.Attendance?true:false);
                    }
                    else{
                        //stop everything and show invalid excel file
                    }
                })
                console.log(idList)
                axios.post(`http://localhost:8090/attendance/createAttendance/${meetIdAtt.meetingId}`,{
                    idList:idList,
                    attendanceList:attendanceList,
                },{
                    headers:{
                      "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                    }
                  }).then((res)=>{
                    setmeetIdAtt({});
                    setIsLoading(false);
                    setUploaded(true);
                }).catch((err)=>{
                    setResMessage(err.response.data.message);
                    setResPopUp(true);
                    setIsLoading(false);
                });
            }).catch((err)=>{
                setResMessage(err.response.data.message);
                setResPopUp(true);
                setIsLoading(false);
            });
        };
        reader.readAsBinaryString(file);
      };

    return (<>
    {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
    <div className='internHeader' style={{width:"95vw"}}>
        <span><IoMdArrowRoundBack title='Go Back To Previous Page' onClick={()=>navigate(-1)} className='backButton'/></span>
        <h2>Schedules</h2>
    </div>
    <div className='scheduleContainer'>
        <div className="scheduleWrapper">
            <div className='scheduleNavbar'>
                <div className='SchbuttonsWrapper'>
                    <p className='headerText active' onClick={(e) => {handleClickToday(e,'headerText')}}>Today</p>
                    <p className='headerText' onClick={(e) => {handleClickUpcoming(e,'headerText')}}>Upcoming</p>
                    <p className='headerText' onClick={(e) => {handleClickCompleted(e,'headerText')}}>Completed</p>
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
                  <FaSearch className="searchIcon"/>
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
            {pastCheck && (searchQuery!==""?filteredList(past):past).map((e, i) => <div key={i} className='schedule' title='View Meet Details' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span key={i}>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    {/* <p>{e.batchList[0].batchName}</p> */}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >

                        <div>
                            <FiUpload title='Upload Attendance' style={{color:"black"}} className='edit_icon' onClick={(x) => {setmeetIdAtt(e);setuploadPopUp(true);x.stopPropagation();}}/>
                        </div>
                        <div>
                            <MdEdit title='Edit Meet' className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                        </div>
                        <div>
                            <MdDelete title='Delete Meet' className="close-icon" onClick={(x)=>{handleRem(e,i);x.stopPropagation();}}/>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {presentCheck && (searchQuery!==""?filteredList(present):present).map((e, i) => 
            <div key={i} className='schedule' title='View Meet Details' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span key={i}>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    {/* <p>{e.batchList[0].batchName}</p> */}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper' >
                    <div></div>
                    <div>
                        <MdEdit title='Edit Meet' className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                    </div>
                    <div>
                        <MdDelete title='Delete Meet' className="close-icon" onClick={(x)=>{handleRem(e,i);x.stopPropagation();}}/>
                    </div>
                </div>
            </div>
            </div>
            )}

            {futureCheck && 
            
            (searchQuery!==""?filteredList(future):future).map((e, i) => <div key={i} className='schedule' title='View Meet Details' onClick={() => handleView(e, i)}>
                <div className='schedulesText'>
                    <h3>{e.topic.topicName}</h3>
                    <p>Trainer&nbsp;-&nbsp;{e.trainer.trainerName}</p>
                    {e.batchList.map((batch,i)=>{
                        return(
                            // <span>{batch.batchName}&nbsp;</span>
                            <span key={i}>{i==e.batchList.length-1?batch.batchName:batch.batchName+", "}</span>
                        )
                    })}
                    {/* <p>{e.batchList[0].batchName}</p> */}
                    <div>Date&nbsp;-&nbsp;{e.date}</div>
                    <div>Timing&nbsp;-&nbsp;{e.fromTime}&nbsp;to&nbsp;{e.toTime}</div>
                </div>
                <div className='iconContainer'>
                    <div className='edit_icon_wrapper'>
                        <div></div>
                        <div>
                            <MdEdit title='Edit Meet' className='edit_icon' onClick={(x) => {handleEdit(e,i);x.stopPropagation();}}/>
                        </div>
                        <div >
                            <MdDelete title='Delete Meet' className="close-icon" onClick={(x)=>{handleRem(e,i);x.stopPropagation();}}/>
                        </div>
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
                    <select onClick={(e)=>{
                        setTopic(e.target.value.substring(0,e.target.value.indexOf('_')));
                        setTopicName(e.target.value.substring(e.target.value.indexOf('_')+1))
                    }} required={true}>
                    <option selected={true} hidden={true} disabled={true} value="">Select one Topic</option>
                        {topicList.filter(topic=>topic.completed==false).map((e,i)=>{
                            return(
                            <option key={i} value={`${e.topicId}_${e.topicName}`}>{e.topicName}</option>
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
                    <textarea  onChange={handleDescription}  
                               pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                               title="Please enter a valid description"
                               value={description} >{description}</textarea>                                                                                                                     
                </div>

                <button className='selectBtn' onClick={()=>handleGetTrainersByDate()}>Select&nbsp;Trainers</button>                                                                                                                     

                {
                    selectTrainerCheck && (
                        <>
                        <div className='avlWrapper'>
                        {avlList.map((list,k)=>
                        <div className='avlContainer' key={k}>
                            <h4>{list.date}</h4>
                            <div>
                                {list.trainer.length!==0 ? list.trainer.map((row,i)=>
                                        row.availabilityList.map((r,j)=><div className='avl_tile' key={j}>
                                            <div className='avl_List'>
                                                <input onClick={(e)=>handleAvlCheckBox(r,e,i,j,k,row)} id={`check${i}${j}${k}`} type='checkbox'/>
                                                <p>{row.trainerName}</p>
                                                <input id={`time${i}${j}${k}0`} onChange={(e)=>{handleAvlCheck(r,e,i,j,k)}} min={r.fromTime} max={r.toTime} defaultValue={r.fromTime} step="1" type="time"/>
                                                <input id={`time${i}${j}${k}1`} onChange={(e)=>{handleAvlCheck(r,e,i,j,k)}} min={r.fromTime} max={r.toTime} defaultValue={r.toTime} step="1" type="time"/>
                                            </div>
                                            <div className='selectedGroups' id={`grps${r.availabilityId}`}></div>
                                        </div>
                                        )
                                ):(<div className='noTrainers'>-- No Trainers Available For This Date --</div>)}
                            </div>
                        </div>)}</div></>)
                }

            <div className='sch_calendarAccess'>
                <p>Google Calendar Access</p>
                <p> --- </p>
                {calendarFlag?<button type="submit" className="accessBtn" onClick={()=>{handleCalenderClick()}}>
                    Allow Access
                </button>:<p>Access Granted&#9989;</p>}
            </div>
            </div>
            <div className='sch_buttonsContainer'>
                <button type="submit" className="submit-btn" disabled={calendarFlag} onClick={()=>{newhandleClick()}}>
                    Create Schedule
                </button>
                <button type="reset" className="cancel-btn" onClick={() =>{handleCancelForAdd()}}>
                    Cancel
                </button>
            </div>
            </div>
        </div>}


        {isOpenEdit && <form onSubmit={(e)=>{e.preventDefault();handleEditClick()}}>
        <div className="sch_popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className='sch_popupHeader'>
                <h2>Edit meeting details</h2>
            </div>
            <div className="sch_input_box">
            <div className='sch_inputContainer'>
                <div className="sch_input-group">
                    <label>Topic</label>
                    <input value={meetingObj.topic.topicName} required={true} readOnly={true}>
                    {/* {topicList.map((e,i)=>{
                            return(
                            <option key={i} value={e.topicName}>{e.topicName}</option>
                            )
                        })} */}
                    </input>                                                         
                </div>

                <div className="sch_input-group">
                    <label> Date </label>
                    <input type="date" value={meetingObj.date} onChange={handleDateChange} readOnly={true}/>
                </div>

                <div className="sch_input-group">
                    <label> Start Time </label>
                    <input step="2" value={meetingObj.fromTime} type="time" onChange={handleFromTimeChange} readOnly={true}/>                    
                </div>

                <div className="sch_input-group">
                    <label> End Time </label>
                    <input step="2" value={meetingObj.toTime} type="time" onChange={handleToTimeChange} readOnly={true}/>                 
                </div>

                <div className="sch_input-group">
                    <label>Trainer </label>
                    <input onClick={(e)=>setTrainer(e.target.value)} defaultValue={meetingObj.trainer.trainerName} required={true} readOnly={true}>
                    {/* {trainerList.map((e,i)=>{
                            return(
                            <option key={i} value={e.trainerName}>{e.trainerName}</option>
                            )
                        })} */}
                    </input>                                                            
                </div>

                {/* <div className="sch_input-group">
                    <label htmlFor="name">Meet Link</label>
                    <input type="text" id="link" onChange={handleMeet} value={meet} readOnly={true}/>                                                             
                </div> */}

                {/* <div className="sch_input-group">
                    <label htmlFor="name">Assessment Link</label>
                    <input type="text" id="link" onChange={handleAssessment} value={assessment}/>                                                             
                </div> */}

                {/* <div className="sch_input-group">
                    <label htmlFor="name">Feedback Link</label>
                    <input type="text" id="link" onChange={handleFeedback} value={feedback}/>                                                             
                </div> */}

                <div className="sch_input-group">
                    <label htmlFor="name">Description</label>
                    <textarea onChange={handleDescription} 
                              pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                              title="Please enter a valid description"
                              defaultValue={meetingObj.meetingDesc}></textarea>                                                             
                </div>

                <div className="sch_input-group">
                    <label htmlFor="name">Select Groups</label>
                    <div className='sch_internWrapperDiv'>
                        {
                            meetingObj.batchList.map((e,i)=><div key={i} className='sch_ListInternWrapper'>
                                {/* <form>
                                    <input onClick={(x)=>handleAddList(x,e.batchId)} type="checkbox"/>
                                </form> */}
                                <p>{e.batchName}</p>
                            </div>)
                        }
                    </div>                                                             
                </div>        
            </div>

            <div className='sch_buttonsContainer'>
                <button type="submit" className="submit-btn" >
                    Submit
                </button>
                <button type="reset" className="cancel-btn" onClick={() => {handleCreateSch();handleSetEmpty();setTemp('');}}>
                    Cancel
                </button>
            </div>
            </div>
        </div>
        </form>}


        {isOpenDets && <div className="sch_popup-boxd">
            <div className='sch_popupHeader'>
                <h2>Details Of schedule</h2>
            </div>

            <div className='Detail_schedulesText'>
                    <h3>{viewList.topic.topicName}</h3>
                    <p>{viewList.meetingDesc}</p>
                    <p>Trainer&nbsp;-&nbsp;{viewList.trainer.trainerName}</p>
                    <div>Date&nbsp;-&nbsp;{viewList.date}</div>
                    <div>Timing&nbsp;-&nbsp;{viewList.fromTime}&nbsp;to&nbsp;{viewList.toTime}</div>
                    <p>Meet Link - <Link className='meetLink' target={"_blank"} to={viewList.meetingLink}>{viewList.meetingLink}</Link></p>
            </div>
            <h2 className='groupHead'>Groups</h2>
            <div className='meetBatchContainer'>
        
                <div className='batchNavbar'>
                    {viewList.batchList.map((batch,i)=><p key={i} className={`grpText${viewList.meetingId}`} onClick={(e)=>handleGetInternsByBatchId(batch.batchId,viewList.meetingId,e,`grpText${viewList.meetingId}`)}>{batch.batchName}</p>)}
                </div>
                <div className='meetBatchContent'>
                    {internInstance.map((intern,i)=><div key={i} className='attendanceContainer'>
                        <p>{intern.internName}</p>
                        <p style={{fontStyle:"italic"}}>{intern.attendanceList.length===1 ? <>{intern.attendanceList[0].present ? "Present":"Absent"}</> : <>NA</>}</p>
                    </div>)}
                </div>
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
            
                {tempGroupList.length!=0?(
                <div className='ListInternWrapper'>
                    <input id='group_checkbox' onChange={(e)=>handleSelectAll(e)} type="checkbox"/>
                    <p>{train.trainingName} - All</p> 
                </div>)
                :<div className='ListInternWrapper'>
                    <p>No Groups Available</p> 
                </div>}  
                {
                    tempGroupList.map((e,i)=><div key={i} className='ListInternWrapper'>
                        <form>
                            <input name='group_checkbox' id={e.batchId} onChange={(x)=>handleEachAddList(x,e.batchId)} type="checkbox"/>
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

{editPopUp && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Schedule Edited</h2>
        </div>
        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={() => handleEditPopUpOk()}>
                Ok
            </button>
        </div>
    </div>
</div>}

{uploaded && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>File Uploaded</h2>
        </div>
        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={() => handleUploadPopUpOk()}>
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
            <button type="submit" className="submit-btn" onClick={() =>setcheckFlag(false)}>
                Ok
            </button>
        </div>
    </div>
</div>}

{uploadPopUp && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Upload Attendance</h2>
        </div>

        <form className="attendance-form">
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
        <button type="submit" className="submit-btn" onClick={(e)=>{handleFileSubmit(e)}}>
            Upload
        </button>
        <button type="reset" className="cancel-btn" onClick={() =>{setmeetIdAtt("");setuploadPopUp(false);} }>
            Cancel
        </button>
        </div>
        </form>
    </div>
</div>}

{calendarPopUp && <div className='popupContainer'>
    <div className='popup-boxd'>
        <div className='popupHeader'>
            <h2>Google Calendar Access</h2>
        </div>
        <div className='buttonsContainer'>
        <button type="submit" className="submit-btn" onClick={()=>{handleCalenderClick()}}>
                Allow Access
        </button>
        <button type="reset" className="cancel-btn" onClick={() => setCalendarPopUp(false)}>
            Cancel
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
    )
}

export default Schedules;