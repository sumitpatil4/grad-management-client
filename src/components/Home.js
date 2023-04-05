import React from 'react'
import Navbar from './common/Navbar'
import Mytrainings from './MyTrainings/Mytrainings'
import Trainers from './Trainers/Trainers';
import { Route,Routes } from 'react-router-dom';
import About from './About/About';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Mytrainings />}/>
          <Route path="/trainers" element={<Trainers />}/>
          <Route path="/aboutus" element={<About />}/>
        </Routes>
    </div>
  )
}

export default Home