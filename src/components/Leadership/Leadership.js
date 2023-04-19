import React, { useContext, useEffect, useState } from 'react'
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import { NavLink, Navigate ,useNavigate} from 'react-router-dom';

const Leadership = () => {


    const managercontext=useContext(ManagerContext);
    const authcontext=useContext(AuthContext);
    const [trainingsList, setTrainingsList] = useState([]);
    const [usersList, setUsersList] = useState([]);

    // useEffect(()=>{
    //     axios.get(`http://localhost:8090/training/getTrainings`)
    //     .then((res)=>{
    //       console.log(res)
    //       trainingsList(res.data.training);
    //       console.log(trainingsList)
    //     });
    // axios.get("http://localhost:8090/user/getUsers")
    // .then((res)=>{
    //   // console.log(res.data.userList);
    //   updateuserList(res.data.userList)
    //   // console.log(userList)
    // });

    //   },[useeffectreload])
    const navigate = useNavigate();
    const navigatetotopics = (e) => {
      console.log(e);
      navigate("/leadership/result", true);
    };

    return (
        <div className='mytrainingsContainer' >
          <h1>Trainings</h1>
          <div className='mytrainings'>
          {trainingsList.map((e) => (
  <div onClick={() => { navigatetotopics(e); }}>
    <div className='trainingText'>{e.trainingName}</div>
      if (usersList.get(e.userId)){
        <div>
         {usersList.get(e.id)}
      </div>
      }
    {/* {usersList.map((a) => {
      if (e.userId === a.userId) {
        return <div className='trainingText'>{a.userName}</div>;
      } else {
        return null;
      } */}
    

    {/* //   {1:Aman.2:ashish} */}
    {/* })} */}
  </div>
))}

               
 <div>
<NavLink to={"/leadership/result"} >

<div className='trainingText'>Test Training</div>
<div className='trainingText'>Manager Name</div>
</NavLink>
</div>       
          </div>
        </div>
      )
}

export default Leadership;



// {trainingsList.map((e, i) => (
//     <div onClick={() => { navigatetotopics(e); }}>
//       <div className='trainingText'>{e.trainingName}</div>
//       {usersList.map((a, b) => {
//         if (e.userId === a.userId) {
//           return <div className='trainingText'>{a.userName}</div>;
//         } else {
//           return null;
//         }
//       })}
//     </div>
//   ))}
  