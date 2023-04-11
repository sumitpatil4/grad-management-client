import "./trainers.css";
import React, { useState } from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import profileIcon from "../../images/profileIcon.png";
import deleteIcon from "../../images/deleteIcon.png";
import editIcon from "../../images/editIcon.png";
import { MdEdit, MdDelete } from "react-icons/md";

const Trainers = () => {
  const [trainers, setTrainers] = useState([
    {
      trainersid: 1,
      trainersname: "Ashish Tripathy",
      skill: "Python",
      phone: "8630132801",
      email: "ashish@gmail.com",
      availability: "Monday-Friday",
    },
    {
      trainersid: 2,
      trainersname: "Sumit Vasant Patil",
      skill: "Java",
      phone: "1234543212",
      email: "sumit@gmail.com",
      availability: "Monday-Friday",
    },
    {
      trainersid: 3,
      trainersname: "Sai Krupananda",
      skill: "C++",
      phone: "1234567890",
      email: "sai@gmail.com",
      availability: "Monday-Friday",
    },
    {
      trainersid: 4,
      trainersname: "Akriti Singh",
      skill: "JavaScript",
      phone: "1234567890",
      email: "akriti@gmail.com",
      availability: "Monday-Friday",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerTemp,settrainerTemp]=useState({});
  const [isOpenProfile, setIsOpenProfile] = useState(false);


  const handleDelete = (trainerId) => {
    const newTrainers = trainers.filter(
      (trainer) => trainer.trainersid !== trainerId
    );
    setTrainers(newTrainers);
  };

  const handleProfile = (trainer) => {
    setIsOpenProfile(true);
    settrainerTemp(trainer);
  };

  // const handleEditClick = () => {
  //   return (  );
  // }

  // export default handleEditClick;

  const handleAdd = () => {
    const newTrainer = {
      trainerid: trainers.length + 1,
      trainersname: "New Trainer",
      skill: "New Skill",
      phone: "1234567890",
      email: "newtrainer@gmail.com",
      availability: "Monday-Friday",
    };
    setTrainers([...trainers, newTrainer]);
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
      <div className="buttons-container">
        <button className="add-button" onClick={handleAdd}>
          Add&nbsp;Trainer
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="byName....bySkill...."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit">
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
                    <FaUserAlt
                      trainer={trainer}
                      onClick={() => handleProfile(trainer)}
                      className="profileIconButton"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {isOpenProfile && (
          <div className="popupContainer">
            <div className="popup-boxd">
              <div className="newTrain">
                <h2>Trainer Details</h2>
              </div>
              <div className="input-group">
                <label htmlFor="name">Name </label>
                <p>{trainerTemp.trainersname}</p>
              </div>
              <div>
                {/* <button
                  type="submit"
                  className="submit-btn"
                  onClick={() => handleEditClick()}
                >
                  Submit
                </button> */}
                <button
                  type="reset"
                  className="cancel-btn"
                  onClick={() => setIsOpenProfile(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Trainers;
