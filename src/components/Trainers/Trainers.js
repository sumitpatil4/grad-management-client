import "./trainers.css";
import React, { useState ,useContext, useEffect} from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import axios from "axios";

const Trainers = () => {
  const managercontext=useContext(ManagerContext);
  const {updateTrainerList,trainerList}=managercontext;
  const authcontext=useContext(AuthContext);
  const {userid}=authcontext;
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerTemp, settrainerTemp] = useState({});
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [trainerId, settrainerId] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isAvailabilty, setIsAvaliabilty] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [Name, setName] = useState("");
  const [Skill, setSkill] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [validMsg,setValidMsg] = useState("");
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
  },[useeffectreload])

  const [trainers, setTrainers] = useState([
    {
      trainersid: 1,
      trainersname: "Ashish Tripathy",
      skill: "Python",
      phone: "8630132801",
      email: "ashish@gmail.com",
    },
    {
      trainersid: 2,
      trainersname: "Sumit Vasant Patil",
      skill: "Java",
      phone: "1234543212",
      email: "sumit@gmail.com",
    },
    {
      trainersid: 3,
      trainersname: "Sai Krupananda",
      skill: "C++",
      phone: "1234567890",
      email: "sai@gmail.com",
    },
    {
      trainersid: 4,
      trainersname: "Akriti Singh",
      skill: "JavaScript",
      phone: "1234567890",
      email: "akriti@gmail.com",
    },
  ]);

  const [availability, setAvailabilityList] = useState([
    {
      trainersid: 1,
      date: "2023-04-13",
      fromTime: "10:00AM",
      toTime: "11:00AM",
    },
    {
      trainersid: 1,
      date: "2023-04-14",
      fromTime: "02:00PM",
      toTime: "04:00PM",
    },
    {
      trainersid: 1,
      date: "2023-04-13",
      fromTime: "10:00AM",
      toTime: "11:00AM",
    },
    {
      trainersid: 1,
      date: "2023-04-13",
      fromTime: "10:00AM",
      toTime: "11:00AM",
    },
    {
      trainersid: 1,
      date: "2023-04-13",
      fromTime: "10:00AM",
      toTime: "11:00AM",
    },
    {
      trainersid: 2,
      date: "2023-04-14",
      fromTime: "02:00PM",
      toTime: "04:00PM",
    },
    {
      trainersid: 2,
      date: "2023-04-14",
      fromTime: "02:00PM",
      toTime: "04:00PM",
    },
  ]);

  const filteredAvailability = availability.filter(
    (item) => item.trainersid === selectedTrainerId
  );
  
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
        })
    }
    setIsOpenCon(false);
  };

  const handleAvlDeletePopup = (avlId) =>{
    setAvlId(avlId);
    setIsOpenCon(true);
  }

  const handleProfile = (trainer) => {
    setIsOpenProfile(true);
    settrainerTemp(trainer);
    axios.get(`http://localhost:8090/availability/getAvailability/${trainer.trainerId}`)
    .then((res)=>{
      console.log(res.data.availability);
      setUserAvailability(res.data.availability);
      console.log(userAvailability)
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
  })
  setIsAvaliabilty(false);
  }

  const handleEdit = (trainer) => {
    setIsEdit(true);
    settrainerTemp(trainer);
    setName(trainer.trainerName);
    setEmail(trainer.email);
    setSkill(trainer.skill);
    setPhone(trainer.phoneNumber);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTrainers = trainerList.filter(
    (trainer) =>
      trainer.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="buttonContainer">
        <button className="add-button" onClick={handleAddPopup}>
          Add&nbsp;Trainer
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit" onClick={handleSearchInputChange}>
            <FaSearch />
          </button>
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

      {isOpenCon && (
        <div className="popupContainer">
          <div className="popup-boxd">
            <div className="popupHeader">
              <h2>Are you sure to delete this user?</h2>
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



{isAvailabilty && (
        <form>
          <div id="avlpop"
            className="popupContainer"
            onClick={() => {
              setIsAvaliabilty(false);
            }}
          >
            <div id="avlpop" className="popup-boxd" onClick={(e) => e.stopPropagation()}>
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
                  <button type="button" className="submit-btn" onClick={handleAddAvailability}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsAvaliabilty(false);
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
                  <div>

                  <input type="text" onChange={(event)=>{setName(event.target.value)}} />
                  <p id="val">{validMsg}</p>
                  </div>
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <input type="text" onChange={(event)=>{setSkill(event.target.value)}}/>
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <input type="text" onChange={(event)=>{setEmail(event.target.value)}}/>
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <input type="text" onChange={(event)=>{setPhone(event.target.value)}}/>
                </div>

                {/* <div className="input-group">
                  <label>Date:</label>
                  <input type="date" value={date} onChange={handleDateChange} />
                </div>

                <div className="input-group">
                  <label>From Time:</label>
                  <input
                    type="time"
                    value={fromTime}
                    onChange={handleFromTimeChange}
                  />
                </div>

                <div className="input-group">
                  <label>To Time:</label>
                  <input
                    type="time"
                    value={toTime}
                    onChange={handleToTimeChange}
                  />
                </div> */}

                <div className="buttonsContainer">
                  <button type="submit" onClick={handleClick} className="submit-btn">
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
                  <input type="text" defaultValue={trainerTemp.trainerName} onChange={(event)=>{setName(event.target.value)}} />
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <input type="text" defaultValue={trainerTemp.skill} onChange={(event)=>{setSkill(event.target.value)}}/>
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <input type="text" defaultValue={trainerTemp.email} onChange={(event)=>{setEmail(event.target.value)}}/>
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <input type="text" defaultValue={trainerTemp.phoneNumber} onChange={(event)=>{setPhone(event.target.value)}}/>
                </div>

                <div className="buttonsContainer">
                  <button type="submit" className="submit-btn" onClick={handleEditSubmitClick}>
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
            className="popupContainer1"
            onClick={() => {
              setIsOpenProfile(false);
            }}
          >
            <div className="popup-boxd1" onClick={(e) => e.stopPropagation()}>
              <div className="popupHeader1">
                <h2>Profile</h2>
              </div>
              <div className="inputContainer1">
                {/* <div className="input-group1">
                  <label>Trainer ID </label>
                  <p>{trainerTemp.trainerId}</p>
                </div> */}

                <div className="input-group1">
                  <label>Name </label>
                  <p>{trainerTemp.trainerName}</p>
                </div>

                <div className="input-group1">
                  <label>Skill </label>
                  <p>{trainerTemp.skill}</p>
                </div>

                <div className="input-group1">
                  <label>Email </label>
                  <p>{trainerTemp.email}</p>
                </div>

                <div className="input-group1">
                  <label>Phone </label>
                  <p>{trainerTemp.phoneNumber}</p>
                </div>

                <div className="input-group1">
                  <label>Availabilty </label>
                  <div className="availability">
                  <table className="availablityTable">
                    <thead>
                      <tr className="availablitytr">
                        <th>Date</th>
                        <th>From&nbsp;Time</th>
                        <th>To&nbsp;Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAvailability.map((item) => (
                        <tr className="availablitytr">
                          <td className="availablitytd">{item.date}</td>
                          <td className="">{item.fromTime}</td>
                          <td className="availablitytd">{item.toTime}</td>
                          <td className="availablitytd">
                            <MdDelete
                              onClick={() => handleAvlDeletePopup(item.availabilityId)}
                              className="del_icon"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
                <div className="input-group1">
                  <label></label>
                  <button type="button" className="add-button1" onClick={handleAvaliabiltyPopup}>
                       Add&nbsp;Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {isOpenCon && (
        <div className="popupContainer">
          <div className="popup-boxd">
            <div className="popupHeader">
              <h2>Are you sure to delete this user?</h2>
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
