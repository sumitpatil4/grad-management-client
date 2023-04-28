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
  
// import React from 'react'
// import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import './Leadership.css';


// const Leadership = () => {
    
//   return (
//     <div className="LeadershipChart">
//       <h1>ATTENDANCE FOR EACH TRAINING</h1>
//       <div className="chart-container">
//         <Bar
//           data={{
//             // Name of the variables on x-axies for each bar
//             labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
//             datasets: [
//               {
//                 // Label for bars
//                 label: "total count/value",
//                 // Data or value of your each variable
//                 data: [90, 80, 70, 60],
//                 // Color of each bar
//                 backgroundColor: 'rgba(75,192,192,1)',
//                 // Border color of each bar
//                 borderColor: 'rgba(0,0,0,1)',
//                 borderWidth: 0.5,
//                 // width: 5,
                
//               },
//             ],
//           }}
//           // Height of graph
//           height={400}
//           options={{
//             maintainAspectRatio: false,
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     // The y-axis value will start from zero
//                     beginAtZero: true,
//                   },
//                 },
//               ],
//               xAxes: [
//                 {
//                   barPercentage: 0.2,
//                   categoryPercentage: 0.2,
//                 },
//               ],
//             },
//             legend: { 
//               labels: { 
//                 fontSize: 15, 
//               },
//             },
//           }}        
//           />
//       </div>
//     </div>


//   )
// }

// export default Leadership
