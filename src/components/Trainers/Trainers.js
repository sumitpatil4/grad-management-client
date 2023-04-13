import "./trainers.css";
import React, { useState } from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const Trainers = () => {
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


  const [selectedTrainerId, setSelectedTrainerId] = useState(2);

  const filteredAvailability = availability.filter(
    (item) => item.trainersid === selectedTrainerId
  );
  
  const handleClick = () => {
    if(Name==""){
      setValidMsg("Invalid Name!!");
      setTimeout(()=>{
          setValidMsg("");
      },5000);
    }
    else{
      setIsAdd(false);
      // setArr(current => [...current, temp]);

      // axios.post(`http://localhost:8090/training/createTraining/${userid}`,{
      //   "trainingName":temp
      // }).then((res)=>{
      //   console.log(res);
      //   setUseeffectreload(!useeffectreload)
      // })
      setName('');
      setSkill('');
      setEmail('');
      setPhone('');
    }
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

  const handleDeletePopup = (trainersid) => {
    setIsOpenCon(true);
    settrainerId(trainerId);
  };

  const handleDelete = (trainerId) => {
    const newTrainers = trainers.filter(
      (trainer) => trainer.trainersid !== trainerId
    );
    setTrainers(newTrainers);
    setIsOpenCon(false);
  };

  const handleProfile = (trainer) => {
    setIsOpenProfile(true);
    settrainerTemp(trainer);
  };

  const handleAddPopup = () => {
    setIsAdd(true);
  };

  const handleAvaliabiltyPopup = () => {
    setIsAvaliabilty(true);
    setIsOpenProfile(false);
  };

  const handleEdit = (trainer) => {
    setIsEdit(true);
    settrainerTemp(trainer);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.trainersname.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            {(searchQuery !== "" ? filteredTrainers : trainers).map(
              (trainer) => (
                <tr>
                  <td>{trainer.trainersname}</td>
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
                        onClick={() => handleDeletePopup(trainer.trainersid)}
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
          <div
            className="popupContainer"
            onClick={() => {
              setIsAvaliabilty(false);
            }}
          >
            <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
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
                </div>

                <div className="buttonsContainer">
                  <button type="submit" className="submit-btn">
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
                  <input type="text" value={trainerTemp.trainersname} />
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <input type="text" value={trainerTemp.skill} />
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <input type="text" value={trainerTemp.email} />
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <input type="text" value={trainerTemp.phone} />
                </div>

                <div className="buttonsContainer">
                  <button type="submit" className="submit-btn">
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
                <div className="input-group1">
                  <label>Trainer ID </label>
                  <p>{trainerTemp.trainersid}</p>
                </div>

                <div className="input-group1">
                  <label>Name </label>
                  <p>{trainerTemp.trainersname}</p>
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
                  <p>{trainerTemp.phone}</p>
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
                      {filteredAvailability.map((item) => (
                        <tr className="availablitytr">
                          <td className="availablitytd">{item.date}</td>
                          <td className="">{item.fromTime}</td>
                          <td className="availablitytd">{item.toTime}</td>
                          <td className="availablitytd">
                            <MdDelete
                              onClick={() => handleDeletePopup(item.itemid)}
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
                  <button className="add-button1" onClick={handleAvaliabiltyPopup}>
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
                onClick={() => handleDelete(trainerTemp.trainerid)}
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
