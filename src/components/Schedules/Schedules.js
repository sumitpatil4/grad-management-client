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
    const [checkFlag,setcheckFlag] = useState(false);
    const [checkedArr,setCheckedArr] = useState([]);
    const [grpAvlValueArr,setGrpAvlValueArr] = useState([]);
    const [selectTrainerCheck,setselectTrainerCheck] = useState(false);
    const [defBatchName,setDefBatchName] = useState(train.trainingName+"_"+train.trainingId);
    const [calendarFlag,setCalendarFlag] = useState(true);
    const [calendarPopUp,setCalendarPopUp] = useState(false);

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
        setCheckedArr([]);
        setfinalList([]);
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
                setavlList(res.data.sort((a,b)=>{
                    return new Date(a.date)-new Date(b.date);
                }));
                console.log(res.data);
                console.log(avlList);
                setselectTrainerCheck(true)
            })
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
        console.log("Adding",r)
        console.log("Final List",finalList)
        console.log("Checked",checkedArr)
        setInstance(e);
        let from = document.getElementById(`time${i}${j}${k}0`).value;
        let to = document.getElementById(`time${i}${j}${k}1`).value;
        const temp_r = {...r}
        temp_r.fromTime=from;
        temp_r.toTime=to;
        console.log(temp_r,"--->",r)
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
            console.log(obj)
            const list=scheduleList.filter((temp)=>{
                // if(temp.date.localeCompare(r.date)===0 && ((r.toTime>=temp.fromTime) || (temp.toTime>=r.fromTime)))
                //     return true;
                // else return false;

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
            if(!defaultGroupIdList.includes(id)){
                defaultGroupIdList.push(id);
                setdefaultGroupIdList(defaultGroupIdList);
                console.log(defaultGroupIdList);
            }
        }
        else{
            if(defaultGroupIdList.includes(id))
            {
                defaultGroupIdList.splice(defaultGroupIdList.indexOf(id), 1);
                setdefaultGroupIdList(defaultGroupIdList);
                console.log(defaultGroupIdList);
            }
            document.getElementById('group_checkbox').checked=false;
        }
    }
    
    const handleFromTimeChange = (e) => {
        // setFromTime(fromTime);
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

    function handleCalenderClick(){
        tokenClient.requestAccessToken();
    }

    
    
    const handleClick = () => {
        console.log(finalList)
        console.log("Finally")
        console.log(topic);
        console.log(trainer)
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
            axios.post(`http://localhost:8090/meeting/createMeeting`,data)
            .then((res)=>{
                console.log(res);
                const meet = res.data.meeting;
                const batchArr = [];
                meet.batchList.forEach((batch)=>{
                    batchArr.push(batch.batchId);
                })
                axios.post(`http://localhost:8090/batch/getInternsByBatch`,{
                    "batchList":batchArr
                }).then((res)=>{
                    console.log(res)
                    const interArr=[];
                    res.data.interns.forEach((intern)=>{
                        interArr.push({'email':intern.email});
                    })
                    console.log(interArr);
                    // interArr.push({'email':meet.trainer.email})
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
                    console.log(TEST_EVENT)
                    console.log("Creating Schedule");
                    console.log(accessToken)
                    fetch ('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',{
                        method: 'POST',
                        headers: {
                            'Authorization':'Bearer '+accessToken
                        },
                        body:JSON.stringify(TEST_EVENT)
                    }).then((data) => {
                        return data.json();
                    }).then((data) => {
                        console.log(data);
                        alert('event created check google calendar')
                    })
                    setUseEffectReload(!useEffectReload)
                    // handleSetEmpty();
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
        // setCheckedArr([]);
        // console.log(finalList)
        // return;
        finalList.forEach((lst,i)=>{
            console.log(lst)
            axios.post(`http://localhost:8090/batch/getInternsByBatch`,{
                "batchList":lst.batchList
            }).then((res)=>{
                console.log(res)
                const interArr=[];
                res.data.interns.forEach((intern)=>{
                    interArr.push({'email':intern.email});
                })
                // interArr.push({'email':lst.trainerId.email})
                interArr.push({'email':usermail});
                console.log(interArr);
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
                console.log(EVENT)
                fetch ('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',{
                    method: 'POST',
                    headers: {
                        'Authorization':'Bearer '+accessToken
                    },
                    body:JSON.stringify(EVENT)
                }).then((data) => {
                    return data.json();
                }).then((data) => {
                    console.log(data);
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
                    axios.post(`http://localhost:8090/meeting/createMeeting`,obj)
                    .then((res)=>{
                        console.log(res);
                        handleCancelForAdd();
                        setfinalList([]);
                        setCheckedArr([]);
                        handleCreateSch();
                        if(i===finalList.length-1){
                            setPopUp(true);
                        }
                    })
                })
            })  
        })
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

    const handleSelectAll = (e)=>{
        const boxes = document.getElementsByName('group_checkbox');
        boxes.forEach((box)=>{
            handleEachAddList(e,parseInt(box.id));
            box.checked = e.target.checked;
        })
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
        if(localStorage.getItem('calendarToken')!=null){
            setIsOpenCon(true);
        }
        else{
            setCalendarPopUp(true);
        }
    }

    const handleRemoveClick = () => {
        fetch (`https://www.googleapis.com/calendar/v3/calendars/primary/events/${meetingObj.eventId}?sendUpdates=all`,{
            method: 'DELETE',
            headers: {
                'Authorization':'Bearer '+accessToken
            }
        }).then((res)=>{
            axios.delete(`http://localhost:8090/meeting/deleteMeeting/${meetingObj.meetingId}`)
            .then((res)=>{
                console.log(res)
                setIsOpenCon(false);
                setUseEffectReload(!useEffectReload);
                handleCreateSch();
            })
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
        console.log(train.trainingId)
        axios.get(`http://localhost:8090/meeting/getMeetings/${train.trainingId}`)
        .then((res)=>{
            console.log(res);
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

    useEffect(()=>{
        /* global google */
        const google = window.google;
        setTokenClient(
            google.accounts.oauth2.initTokenClient({
              client_id:"994239778897-qed7j3c4duls2vsten5eaqj5vsi13na0.apps.googleusercontent.com",
              access_type:"offline",
              scope:"openid email profile https://www.googleapis.com/auth/calendar",
              callback:(tokenResponse)=>{
                console.log(tokenResponse);
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
            console.log(res);
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
        setUseEffectReload(!useEffectReload);
    }

    const filteredList = (list)=>{
        console.log(searchQuery)
        console.log(list)
        const filteredList = list.filter(
            (meet) =>
              meet.topic.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              meet.trainer.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        console.log(filteredList)
        return filteredList;
    }

    return (<>
    <h2 className='scheduleHeader'>Schedules</h2>
    <div className='scheduleContainer'>
        <div className="scheduleWrapper">
            <div className='scheduleNavbar'>
                <div className='SchbuttonsWrapper'>
                    <p className='headerText active' onClick={(e) => {handleClickToday(e)}}>Today</p>
                    <p className='headerText' onClick={(e) => {handleClickUpcoming(e)}}>Upcoming</p>
                    <p className='headerText' onClick={(e) => {handleClickCompleted(e)}}>Completed</p>
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
            {pastCheck && (searchQuery!==""?filteredList(past):past).map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
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

            {presentCheck && (searchQuery!==""?filteredList(present):present).map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
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

            {futureCheck && 
            
            (searchQuery!==""?filteredList(future):future).map((e, i) => <div className='schedule' onClick={() => handleView(e, i)}>
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
                    <select onClick={(e)=>{
                        setTopic(e.target.value.substring(0,e.target.value.indexOf('_')));
                        setTopicName(e.target.value.substring(e.target.value.indexOf('_')+1))
                    }} required={true}>
                    <option selected={true} hidden={true} disabled={true}>Select one Topic </option>
                        {topicList.filter(topic=>topic.completed==false).map((e,i)=>{
                            return(
                            <option value={`${e.topicId}_${e.topicName}`}>{e.topicName}</option>
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
                        {avlList.map((list,k)=>
                        <div className='avlContainer'>
                            <h4>{list.date}</h4>
                            <div>
                                {list.trainer.length!==0 ? list.trainer.map((row,i)=>
                                        row.availabilityList.map((r,j)=><div className='avl_tile'>
                                            <div className='avl_List'>
                                                <input onClick={(e)=>handleAvlCheckBox(r,e,i,j,k,row)} id={`check${i}${j}${k}`} type='checkbox'/>
                                                <p onClick={()=>console.log("hi")}>{row.trainerName}</p>
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
            
                {tempGroupList.length!=0?(
                <div className='ListInternWrapper'>
                    <input id='group_checkbox' onChange={(e)=>handleSelectAll(e)} type="checkbox"/>
                    <p>{train.trainingName} - All</p> 
                </div>)
                :<div className='ListInternWrapper'>
                    <p>No Groups Available</p> 
                </div>}  
                {
                    tempGroupList.map((e)=><div className='ListInternWrapper'>
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
</>     
    )
}

export default Schedules;