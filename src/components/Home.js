import React, { useState } from 'react'
import Navbar from './common/Navbar'
import Mytrainings from './MyTrainings/Mytrainings'
import Trainers from './Trainers/Trainers';
import { Route,Routes } from 'react-router-dom';
import About from './About/About';
import Login from './Login/Login';


const Home = () => {
  const [login,setLogin]=useState(true);

  const handleLogout=(value)=>{
    setLogin(value);
  }

  return (
    <>
    {
      login ? (<Login setLogin={setLogin}/>) :
    (<div>
        <Navbar handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Mytrainings />}/>
          <Route path="/trainers" element={<Trainers />}/>
          <Route path="/aboutus" element={<About />}/>
        </Routes>
    </div>)
    }
    </>
  )
}

export default Home