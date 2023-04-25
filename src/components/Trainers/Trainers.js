import "./trainers.css";
import React, { useState ,useContext, useEffect} from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { RiFileExcel2Fill } from "react-icons/ri";
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import axios from "axios";

const Trainers = () => {
  const managercontext=useContext(ManagerContext);
  const {updateTrainerList,trainerList}=managercontext;
  const authcontext=useContext(AuthContext);
  const {userid}=authcontext;
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setuserList] = useState([]);
  const [trainerTemp, settrainerTemp] = useState({});
  const [availabilityTemp, setAvailabilityTemp] = useState({});
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [isOpenAvlDel, setIsOpenAvlDel] = useState(false);
  const [trainerId, settrainerId] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isAvailabilty, setIsAvaliabilty] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditAvailability, setIsEditAvailability] = useState(false);
  const [Name, setName] = useState("");
  const [Skill, setSkill] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [validMsg,setValidMsg] = useState("");
  const [defaultEmailList,setdefaultEmailList] = useState([]);
  const [isOpenSelectMail,setisOpenSelectMail] = useState(false);
  const [useeffectreload, setUseeffectreload] = useState(false)
  const [userAvailability, setUserAvailability] = useState([]);
  const [avlId,setAvlId] =useState("");


  const [selectedTrainerId, setSelectedTrainerId] = useState(2);
  useEffect(()=>{
    axios.get(`http://localhost:8090/trainer/getTrainersById/${userid}`)
    .then((res)=>{
      console.log(res);
      updateTrainerList(res.data.trainers);
    });
    axios.get(`http://localhost:8090/user/getUsers`).then((res)=>{
      console.log(res.data);
      setuserList(res.data.userList.filter((user)=>user.role==="ROLE_MANAGER"));
      // console.log(res.data.userList.filter((user)=>user.role==="ROLE_MANAGER"));
    })
  },[useeffectreload])

  const handleAddList=(chk,id)=>{
    if(chk.target.checked)
    {
        defaultEmailList.push(id);
        setdefaultEmailList(defaultEmailList);
        console.log(defaultEmailList)
    }
    else{
        if(defaultEmailList.includes(id))
        {
            defaultEmailList.splice(defaultEmailList.indexOf(id), 1);
            setdefaultEmailList(defaultEmailList);
            console.log(defaultEmailList)
        }
    }
  }
  
  const handleClick = () => {
      axios.post(`http://localhost:8090/trainer/createTrainer/${userid}`,{
        "trainerName":Name,
        "email":Email,
        "phoneNumber":Phone,
        "skill":Skill
    }).then((res)=>{
        console.log(res);
        setUseeffectreload(!useeffectreload)
      })
      setIsAdd(false);
      setName('');
      setSkill('');
      setEmail('');
      setPhone('');
  };

  const handleEditSubmitClick = () => {
    axios.put(`http://localhost:8090/trainer/updateTrainer`,{
      "trainerId":trainerTemp.trainerId,
      "trainerName":Name,
      "email":Email,
      "phoneNumber":Phone,
      "skill":Skill
  }).then((res)=>{
      console.log(res);
      setUseeffectreload(!useeffectreload)
    })
    setIsEdit(false);
    setName('');
    setSkill('');
    setEmail('');
    setPhone('');
};

const handleEditSubmitAvailability = () => {
  console.log(date,toTime,fromTime);
  axios.put(`http://localhost:8090/availability/updateAvailability/${availabilityTemp.availabilityId}`,{
    "date":date,
    "fromTime":fromTime,
    "toTime":toTime,
}).then((res)=>{
    console.log(res);
    axios.get(`http://localhost:8090/availability/getAvailability/${trainerTemp.trainerId}`)
    .then((res)=>{
      console.log(res.data.availability);
      setUserAvailability(res.data.availability);
      setUseeffectreload(!useeffectreload);
      console.log(userAvailability)
    })
  })
  setIsEditAvailability(false);
  setDate('');
  setFromTime('');
  setToTime('');
};

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
  };

  const handleToTimeChange = (e) => {
    setToTime(e.target.value);
  };

  const handleDeletePopup = (trainerId) => {
    setIsOpenCon(true);
    settrainerId(trainerId);
  };

  const handleDelete = (trainerId) => {
    if(!isOpenProfile){
      axios.delete(`http://localhost:8090/trainer/deleteTrainer/${trainerId}`)
        .then((res)=>{
          console.log(res);
          setUseeffectreload(!useeffectreload);
        })
    }
    else{
      axios.delete(`http://localhost:8090/availability/deleteAvailability/${avlId}`)
        .then((res)=>{
          console.log(res);
          handleProfile(trainerTemp);
          setUseeffectreload(!useeffectreload);
        })
    }
    setIsOpenCon(false);
    setIsOpenAvlDel(false);
  };

  const handleAvlDeletePopup = (avlId) =>{
    setAvlId(avlId);
    setIsOpenAvlDel(true);
  }

  const handleProfile = (trainer) => {
    setIsOpenProfile(true);
    settrainerTemp(trainer);
    axios.get(`http://localhost:8090/availability/getAvailability/${trainer.trainerId}`)
    .then((res)=>{
      console.log(res.data.availability);
      setUserAvailability(res.data.availability);
      console.log(userAvailability)
      setUseeffectreload(!useeffectreload)
    })
  };

  const handleAddPopup = () => {
    setIsAdd(true);
  };

  const handleAvaliabiltyPopup = () => {
    setIsAvaliabilty(true);
  };

  const handleAddAvailability = () =>{
    console.log(date,fromTime,toTime)
    axios.post(`http://localhost:8090/availability/createAvailability/${trainerTemp.trainerId}`,{
      "date":date,
      "fromTime":fromTime,
      "toTime":toTime
  }).then((res)=>{
    console.log(res);
    handleProfile(trainerTemp);
    setUseeffectreload(!useeffectreload)
  })
  setIsAvaliabilty(false);
  setDate('');
  setFromTime('');
  setToTime('');
  }

  const handleEdit = (trainer) => {
    setIsEdit(true);
    settrainerTemp(trainer);
    setName(trainer.trainerName);
    setEmail(trainer.email);
    setSkill(trainer.skill);
    setPhone(trainer.phoneNumber);
  };

  const handleEditAvailablity = (item) => {
    console.log(item);
    setIsEditAvailability(true);
    setAvailabilityTemp(item);
    setDate(item.date);
    setFromTime(item.fromtime);
    setToTime(item.totime);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTrainers = trainerList.filter(
    (trainer) =>
      trainer.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMailSender=()=>{
    dummyTrainersList = [];
    for (let i = 0; i < trainerList.length; i++) {
      let obj = {};
      for (const key in trainerList[i]) {
        if (key !== "availabilityList" && key !== "trainerId" && key !=="active") {
          obj[key.toUpperCase()] = trainerList[i][key];
        } else if (key === "availabilityList") {
          let availabilities = [];
          for (let j = 0; j < trainerList[i][key].length; j++) {
            availabilities.push(
              `Date:${trainerList[i][key][j].date}    FromTime:${trainerList[i][key][j].fromTime}     ToTime:${trainerList[i][key][j].toTime}`
            );
          }
          obj["AVAILABILITY LIST"] = availabilities.join("\n");
        }
      }
      dummyTrainersList.push(obj);
      console.log(dummyTrainersList);
    }
    const ws = XLSX.utils.json_to_sheet(dummyTrainersList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "xlsx" });
    console.log(dataBlob);
    const formData = new FormData();
    formData.append('file', dataBlob, 'TrainerFile');
    console.log(formData);
    console.log(defaultEmailList);
    let mailStr="";
    defaultEmailList.forEach((str,i)=>{
      if(i===defaultEmailList.length-1)
        mailStr+=str;
      else mailStr+=str+",";
    });
    console.log(mailStr)
    axios.post(`http://localhost:8090/trainer/sendMails`,formData,{
      params:{
        str:mailStr,
      }
    }).then((res)=>{
      console.log(res);
      setdefaultEmailList([]);
    });
    setisOpenSelectMail(false);
  }

  let dummyTrainersList = [];
  const fileType = "xlsx";
  const handleFileDownload=()=>{
      dummyTrainersList = [];
      for (let i = 0; i < trainerList.length; i++) {
        let obj = {};
        for (const key in trainerList[i]) {
          if (key !== "availabilityList" && key !== "trainerId" && key !=="active") {
            obj[key.toUpperCase()] = trainerList[i][key];
          } else if (key === "availabilityList") {
            let availabilities = [];
            for (let j = 0; j < trainerList[i][key].length; j++) {
              availabilities.push(
                `Date:${trainerList[i][key][j].date}    FromTime:${trainerList[i][key][j].fromTime}     ToTime:${trainerList[i][key][j].toTime}`
              );
            }
            obj["AVAILABILITY LIST"] = availabilities.join("\n");
          }
        }
        dummyTrainersList.push(obj);
        console.log(dummyTrainersList);
      }
      const ws = XLSX.utils.json_to_sheet(dummyTrainersList);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "xlsx" });
      console.log(data);
      FileSaver.saveAs(data, "TrainersFile" + ".xlsx");
  }

  return (
    <>
    <div className='trainersHeader' >
      <h1>Trainers</h1>
    </div>
    <div className="trainernavbar">
      <div>
        <button className="add-button" onClick={handleAddPopup}>
          Add&nbsp;Trainer
        </button>
      </div>
      <div>
        <div className="buttonContainer2">
            <FiShare title="Share Excel File To Mails" className="shareIcon" onClick={()=>setisOpenSelectMail(true)}/>
            <RiFileExcel2Fill title="Download Excel File" className="ExcelIcon shareIcon" onClick={handleFileDownload}/>
            <div className="search-bar2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                />
            </div>
            <div type="submit" className="searchdiv" onClick={handleSearchInputChange}>
              <FaSearch className="searchIcon"/>
            </div>
        </div>
      </div>
      </div>
      <div className="trainerContainer">
        <table>
          <thead>
            <tr>
              <th>TrainerName</th>
              <th>Skill</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(searchQuery !== "" ? filteredTrainers : trainerList).map(
              (trainer) => (
                <tr>
                  <td>{trainer.trainerName}</td>
                  <td>{trainer.skill}</td>
                  <td>
                    <div className="actionButton">
                      <FaUserAlt
                        onClick={() => handleProfile(trainer)}
                        className="profileIconButton"
                      />
                      <MdEdit
                        onClick={() => handleEdit(trainer)}
                        className="edit-icon"
                      />
                      <MdDelete
                        onClick={() => handleDeletePopup(trainer.trainerId)}
                        className="del_icon"
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {isOpenAvlDel && (
        <div className="popupContainer">
          <div id="avldelpop" className="popup-boxd">
            <div className="popupHeader">
              <h2>Are you sure to delete this availability?</h2>
            </div>
            <div className="buttonsContainer">
              <button
                type="submit"
                className="submit-btn"
                onClick={() => handleDelete(trainerId)}
              >
                Yes
              </button>
              <button
                type="reset"
                className="cancel-btn"
                onClick={() => setIsOpenAvlDel(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isAvailabilty && (
        <form>
          <div
            id="avlpop"
            className="popupContainer"
            onClick={() => {
              setIsAvaliabilty(false);
              setDate('');
              setFromTime('');
              setToTime('');
            }}
          >
            <div
              id="avlpop"
              className="popup-boxd"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popupHeader">
                <h2>Add Availability</h2>
              </div>
              <div className="inputContainer">
                <div className="input-group">
                  <label>Date:</label>
                  <input type="date" value={date} onChange={handleDateChange} />
                </div>

                <div className="input-group">
                  <label>From Time:</label>
                  <input
                    type="time"
                    step="2"
                    value={fromTime}
                    onChange={handleFromTimeChange}
                  />
                </div>

                <div className="input-group">
                  <label>To Time:</label>
                  <input
                    type="time"
                    step="2"
                    value={toTime}
                    onChange={handleToTimeChange}
                  />
                </div>

                <div className="buttonsContainer">
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleAddAvailability}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsAvaliabilty(false);
                      setDate('');
                      setFromTime('');
                      setToTime('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}


{isEditAvailability && (
        <form>
          <div
            id="avlpop"
            className="popupContainer"
            onClick={() => {
              setIsEditAvailability(false);
              setDate('');
              setFromTime('');
              setToTime('');
            }}
          >
            <div
              id="avlpop"
              className="popup-boxd"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popupHeader">
                <h2>Edit Availability</h2>
              </div>
              <div className="inputContainer">
                <div className="input-group">
                  <label>Date:</label>
                  <input type="date" Value={availabilityTemp.date}
                      onChange={(event) => {
                      setDate(event.target.value);
                    }} />
                </div>
                <div className="input-group">
                  <label>From Time:</label>
                  <input
                    type="time"
                    step="2"
                    Value={availabilityTemp.fromTime}
                    onChange={(event) => {
                      setFromTime(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group">
                  <label>To Time:</label>
                  <input
                    type="time"
                    step="2"
                    Value={availabilityTemp.toTime}
                    onChange={(event) => {
                      setToTime(event.target.value);
                    }}
                  />
                </div>

                <div className="buttonsContainer">
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleEditSubmitAvailability}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditAvailability(false);
                      setDate('');
                      setFromTime('');
                      setToTime('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}


      {isAdd && (
        <form>
          <div
            className="popupContainer"
            onClick={() => {
              setIsAdd(false);
            }}
          >
            <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
              <div className="popupHeader">
                <h2>Add New Trainer</h2>
              </div>
              <div className="inputContainer">
                <div className="input-group">
                  <label>Name </label>
                    <input
                      type="text"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    {/* <p id="val">{validMsg}</p> */}
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <input
                    type="text"
                    onChange={(event) => {
                      setSkill(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <input
                    type="text"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <input
                    type="text"
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>

                <div className="buttonsContainer">
                  <button
                    type="submit"
                    onClick={handleClick}
                    className="submit-btn"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsAdd(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {isEdit && (
        <form>
          <div
            className="popupContainer"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
              <div className="popupHeader">
                <h2>Edit Trainer</h2>
              </div>
              <div className="inputContainer">
                <div className="input-group">
                  <label>Name </label>
                  <input
                    type="text"
                    Value={trainerTemp.trainerName}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <input
                    type="text"
                    defaultValue={trainerTemp.skill}
                    onChange={(event) => {
                      setSkill(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <input
                    type="text"
                    defaultValue={trainerTemp.email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <input
                    type="text"
                    defaultValue={trainerTemp.phoneNumber}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>

                <div className="buttonsContainer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={handleEditSubmitClick}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {isOpenProfile && (
        <form>
          <div
            className="popupContainer"
            onClick={() => {
              setIsOpenProfile(false);
              setUserAvailability([]);
            }}
          >
            <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
              <div className="popupHeader">
                <h2>Profile</h2>
              </div>
              <div className="inputContainer">
                <div className="input-group">
                  <label>Name </label>
                  <p>{trainerTemp.trainerName}</p>
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <p>{trainerTemp.skill}</p>
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <p>{trainerTemp.email}</p>
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <p>{trainerTemp.phoneNumber}</p>
                </div>
                </div>
                <div className="availabilityContainer">
                  <h2>Availabilty </h2>
                  <div className="availability">
                  <table className="popuptable">
                    <thead className="popuphead">
                      <tr className="popuptr">
                        <th className="popupth">Date</th>
                        <th className="popupth">From&nbsp;Time</th>
                        <th className="popupth">To&nbsp;Time</th>
                        <th className="popupth">Action</th>
                      </tr>
                    </thead>
                    <tbody className="popupbody">
                      {userAvailability.map((item) => (
                        <tr className="popuptr">
                          <td className="popuptd">{item.date}</td>
                          <td className="">{item.fromTime}</td>
                          <td className="popuptd">{item.toTime}</td>
                          <td className="popuptd">
                            <MdDelete
                              onClick={() => handleAvlDeletePopup(item.availabilityId)}
                              className="del_icon"
                            />
                              <MdEdit
                              onClick={() => handleEditAvailablity(item)}
                              className="edit_icon"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="buttonsContainer">
                  <button type="button" onClick={handleAvaliabiltyPopup}>
                       Add&nbsp;Availability
                  </button>
                  <button type="button" onClick={()=>setIsOpenProfile(false)}>
                       Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {isOpenSelectMail && <form><div className='popupContainer'>
                <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Share Trainer File</h2>
                </div>
                <div className='inputContainer'>
                    <h2>Select Mails</h2>
                    <div className='internWrapperDiv'>
                        {
                            userList.map((e)=><div className='ListInternWrapper'>
                                <form>
                                    <input onClick={(x)=>handleAddList(x,e.email)} type="checkbox"/>
                                </form>
                                <p>{e.email}</p>
                            </div>)
                        }
                    </div>
                </div>
                <div className='buttonsContainer'>
                    <button type="button" className="submit-btn" onClick={()=>handleMailSender()}>
                        Submit
                    </button>
                    <button type="button" className="cancel-btn" onClick={()=>{setisOpenSelectMail(false);setdefaultEmailList([]);}}>
                        Cancel
                    </button>
                </div>
                </div>
            </div></form>}

      {isOpenCon && (
        <div className="popupContainer">
          <div className="popup-boxd">
            <div className="popupHeader">
              <h2>Are you sure to delete this Trainer?</h2>
            </div>
            <div className="buttonsContainer">
              <button
                type="submit"
                className="submit-btn"
                onClick={() => handleDelete(trainerId)}
              >
                Yes
              </button>
              <button
                type="reset"
                className="cancel-btn"
                onClick={() => setIsOpenCon(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trainers;
