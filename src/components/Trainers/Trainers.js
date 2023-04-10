import "./trainers.css"
import React, { useState } from 'react'
import { FaSearch ,FaUserAlt} from 'react-icons/fa';
import profileIcon from "../../images/profileIcon.png";
import deleteIcon from "../../images/deleteIcon.png";
import editIcon from "../../images/editIcon.png";




function TableHeader() {
  return (
    <div className="table-header">
      <div className="header-col">Trainer Name</div>
      <div className="header-col">Skill</div>
      <div className="header-col"></div>
    </div>
  );
}

function TrainerRow({ trainer, onDelete ,onProfile}) {

  return (
    <div className="trainer-row">
      <div className="trainer-col trainer-name">{trainer.trainersname}</div>
      <div className="trainer-col skill">{trainer.skill}</div>
      <div className="trainer-col">
      <button className="profileIconButton" onClick={()=> onProfile(trainer)}>
        {/* <img src={profileIcon}></img> */}
        <FaUserAlt/>
      </button>
      </div>
    </div>
  );
}



// function AvailabilityForm() {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   const handleStartTimeChange = (event) => {
//     setStartTime(event.target.value);
//   };

//   const handleEndTimeChange = (event) => {
//     setEndTime(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(`You are available from ${startDate} at ${startTime} to ${endDate} at ${endTime}.`);
//   };

//   return (
//     <div className="availability-form">
//       <label>
//         Start Date:
//         <input type="date" value={startDate} onChange={handleStartDateChange} />
//       </label>
//       <br />
//       <label>
//         End Date:
//         <input type="date" value={endDate} onChange={handleEndDateChange} />
//       </label>
//       <br />
//       <label>
//         Start Time:
//         <input type="time" value={startTime} onChange={handleStartTimeChange} />
//       </label>
//       <br />
//       <label>
//         End Time:
//         <input type="time" value={endTime} onChange={handleEndTimeChange} />
//       </label>
//       <br />
//       <button className="submit-button" onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

const Trainers = () => {
  const [trainers, setTrainers] = useState([
    { trainersid:1, trainersname: 'Ashish Tripathy', skill: 'Python',phone: '8630132801', email: 'ashish@gmail.com', availability: 'Monday-Friday' },
    { trainersid:2, trainersname: 'Sumit Vasant Patil', skill: 'Java',phone: '1234543212', email: 'sumit@gmail.com', availability: 'Monday-Friday'},
    { trainersid:3, trainersname: 'Sai Krupananda', skill: 'C++',phone: '1234567890', email: 'sai@gmail.com', availability: 'Monday-Friday'},
    { trainersid:4, trainersname: 'Akriti Singh',skill: 'JavaScript',phone: '1234567890', email: 'akriti@gmail.com', availability: 'Monday-Friday'},
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, dispprofile] = useState("");
  const [editingTrainer, setEditingTrainer] = useState(null);

  const handleEdit = (trainerId) =>{
    setEditingTrainer(trainerId);
    const popup = document.getElementById("popup");
    if (popup) {
   popup.style.display = 'block';
   }
  };

  const handleDelete = (trainerId) => {
    const newTrainers = trainers.filter((trainer) => trainer.trainersid !== trainerId);
    setTrainers(newTrainers);
    dispprofile(null); 
  };

  const handleProfile = (trainer) =>{
    dispprofile(trainer);
    const popup = document.getElementById("popup");
    if (popup) {
   popup.style.display = 'block';
   }
  };
  
  const handleAdd = () => {
    const newTrainer = {  trainerid: trainers.length+1, trainersname: 'New Trainer', skill: 'New Skill',phone: '1234567890', email: 'newtrainer@gmail.com', availability: 'Monday-Friday' };
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
    <div className="trainers">
      <div className="button-container">
        <button className="add-button" onClick={handleAdd}>Add&nbsp;Trainer</button>
        <div className="search-bar">
          <input type="text" placeholder="byName....bySkill...." value={searchQuery} onChange={handleSearchInputChange} />
          <button type="submit"><FaSearch /></button>
        </div>
      </div>
      <TableHeader /> 
      {(searchQuery !== "" ? filteredTrainers : trainers).map((trainer) => (
            <TrainerRow  trainer={trainer}  onProfile={handleProfile}/>
      ))}
        {profile && (
  <div id="popup" className="popup">
    <div className="popup-content">
        <div className="trainer-details">
         <h2>Trainer Details</h2>
        </div>
       <div className="popup-data">
         <div>
          <div><strong>Id:</strong></div>
          <div>{profile.trainersid}</div>
         </div>
         <div>
          <div><strong>Name:</strong></div>
          <div>{profile.trainersname}</div>
         </div>
         <div>
          <div><strong>Skill:</strong></div>
          <div>{profile.skill}</div>
         </div>
         <div>
          <div><strong>Phone:</strong></div>
          <div>{profile.phone}</div>
         </div>
         <div>
          <div><strong>Email:</strong></div>
          <div>{profile.email}</div>
         </div>
         <div>
          <div><strong>Availability:</strong></div>
          <div>{profile.availability}</div>
         </div>
       </div>
       <div className="button-container">
        <button className="editIconButton" onClick={() => handleEdit(profile.trainersid)}>
         {/* <img src={editIcon}></img> */}
         Edit
        </button>
        <button className="popup-close" onClick={() => (document.getElementById("popup").style.display = "none")}>
          close
        </button>
       </div>
       <button className="deleteIconButton" onClick={() => handleDelete(profile.trainersid)}>
        <img src={deleteIcon}></img>
       </button>
      </div>
    </div>
    )}
 </div>
  );
}

export default Trainers
