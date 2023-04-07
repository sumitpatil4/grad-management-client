import React, { useEffect, useState } from 'react'
import Navbar from './common/Navbar'
import Mytrainings from './MyTrainings/Mytrainings'
import Trainers from './Trainers/Trainers';
import { Route,Routes,useNavigate } from 'react-router-dom';
import About from './About/About';
import Login from './Login/Login';


const Home = () => {
  const [login,setLogin]=useState(true);
  const navigate = useNavigate();

  const handleLogout=(value)=>{
    setLogin(value);
  }

  useEffect(()=>{
    login?navigate("/",true):navigate("/mytrainings",true);
  },[login])

  return (
    <>
    {
      login ? (<Login setLogin={setLogin}/>) :
    (<div>
        <Navbar handleLogout={handleLogout}/>
        <Routes>
          <Route path="/mytrainings" element={<Mytrainings />}/>
          <Route path="/trainers" element={<Trainers />}/>
          <Route path="/aboutus" element={<About />}/>
        </Routes>
    </div>)
    }
    </>
  )
}

export default Home