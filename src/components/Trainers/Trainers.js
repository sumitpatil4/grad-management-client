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
      Date: "2001-20-02",
      from_time: "10:00AM",
      to_time: "05:00PM"
    },
    {
      trainersid: 2,
      trainersname: "Sumit Vasant Patil",
      skill: "Java",
      phone: "1234543212",
      email: "sumit@gmail.com",
      Date: "2001-20-02",
      from_time: "10:00AM",
      to_time: "05:00PM"
    },
    {
      trainersid: 3,
      trainersname: "Sai Krupananda",
      skill: "C++",
      phone: "1234567890",
      email: "sai@gmail.com",
      Date: "2001-20-02",
      from_time: "10:00AM",
      to_time: "05:00PM"
    },
    {
      trainersid: 4,
      trainersname: "Akriti Singh",
      skill: "JavaScript",
      phone: "1234567890",
      email: "akriti@gmail.com",
      Date: "2001-20-02",
      from_time: "10:00AM",
      to_time: "05:00PM"
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerTemp,settrainerTemp]=useState({});
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [trainerId,settrainerId]=useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
  }

  const handleToTimeChange = (e) => {
    setToTime(e.target.value);
  }

  const handleDeletePopup=(trainersid)=>{
    setIsOpenCon(true);
    settrainerId(trainerId);
}

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

  const handleEdit = (trainer) => {
    setIsEdit(true);
    settrainerTemp(trainer);
  }
   

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
                  <input type="text" />
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <input type="text" />
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <input type="text" />
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <input type="text" />
                </div>

                <div className="input-group">
                  <label>
                    Date:
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                    />
                </div>

                <div className="input-group">
                  <label>
                    From Time:
                    </label>
                    <input
                      type="time"
                      value={fromTime}
                      onChange={handleFromTimeChange}
                    />
                 
                </div>

                <div className="input-group">
                  <label>
                    To Time:
                    </label>
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
                  <input type="text" value={trainerTemp.trainersname}/>
                </div>

                <div className="input-group">
                  <label>Skill </label>
                  <input type="text" value={trainerTemp.skill}/>
                </div>

                <div className="input-group">
                  <label>Email </label>
                  <input type="text" value={trainerTemp.email}/>
                </div>

                <div className="input-group">
                  <label>Phone </label>
                  <input type="text" value={trainerTemp.phone}/>
                </div>

                <div className="input-group">
                  <label>
                    Date
                    </label>
                    <input
                      type="date"
                      value={trainerTemp.Date}
                      onChange={handleDateChange}
                    />
                </div>

                <div className="input-group">
                  <label>
                    From Time
                    </label>
                    <input
                      type="time"
                      value={trainerTemp.from_time}
                      onChange={handleFromTimeChange}
                    />
                 
                </div>

                <div className="input-group">
                  <label>
                    To Time
                    </label>
                    <input
                      type="time"
                      value={trainerTemp.to_time}
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
            }}
          >
            <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
              <div className="popupHeader">
                <h2>Profile</h2>
              </div>
              <div className="inputContainer">
                <div className="input-group">
                  <label>Trainer ID </label>
                  <p>{trainerTemp.trainersid}</p>
                </div>

                <div className="input-group">
                  <label>Name </label>
                  <p>{trainerTemp.trainersname}</p>
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
                  <p>{trainerTemp.phone}</p>
                </div>

                <div className="input-group">
                  <label>Date </label>
                  <p>{trainerTemp.Date}</p>
                </div>

                <div className="input-group">
                  <label>From Time </label>
                  <p>{trainerTemp.from_time}</p>
                </div>

                <div className="input-group">
                  <label>To Time </label>
                  <p>{trainerTemp.to_time}</p>
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
