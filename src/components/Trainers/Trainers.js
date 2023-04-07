import "./trainers.css"
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

function TableHeader() {
  return (
    <div className="table-header">
      <div className="header-col">Trainer ID</div>
      <div className="header-col">Trainer Name</div>
      <div className="header-col">Email</div>
      <div className="header-col">Skill</div>
      <div className="header-col"></div>
    </div>
  );
}

function TrainerRow({ trainer, onDelete }) {
  return (
    <div className="trainer-row">
      <div className="trainer-col trainer-id">{trainer.trainersid}</div>
      <div className="trainer-col trainer-name">{trainer.trainersname}</div>
      <div className="trainer-col email">{trainer.email}</div>
      <div className="trainer-col skill">{trainer.skill}</div>
      <div className="trainer-col">
        <button className="delete-button" onClick={() => onDelete(trainer)}>Delete</button>
      </div>
    </div>
  );
}

const Trainers = () => {
  const [trainers, setTrainers] = useState([
    { trainersid: 1, trainersname: 'Ashish Tripathy', email: 'ashish@gmail.com', skill: 'Python' },
    { trainersid: 2, trainersname: 'Sumit Vasant Patil', email: 'sumit@gmail.com', skill: 'Java'},
    { trainersid: 3, trainersname: 'Sai Krupananda', email: 'sai@gmail.com', skill: 'C++'},
    { trainersid: 4, trainersname: 'Akriti Singh', email: 'akriti@gmail.com', skill: 'JavaScript'},
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (trainerToDelete) => {
    const newTrainers = trainers.filter((trainer) => trainer.trainersid !== trainerToDelete.trainersid);
    setTrainers(newTrainers);
  };

  const handleAdd = () => {
    const newTrainer = { trainersid: trainers.length + 1, trainersname: 'New Trainer', email: 'newtrainer@gmail.com', skill: 'New Skill' };
    setTrainers([...trainers, newTrainer]);
  };

  const handleSearch = () => {
    console.log(searchQuery);
  }

  return (
    <div className="trainers">
      <div className="button-container">
        <button className="add-button" onClick={handleAdd}>Add Trainer</button>
        <div className="search-bar">
          <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          {/* <button className="search-button" onClick={handleSearch}>Search</button> */}
          <button type="submit"><FaSearch /></button>
        </div>
      </div>
      <TableHeader />
      {trainers.map((trainer) => (
        <TrainerRow key={trainer.trainersid} trainer={trainer} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default Trainers
