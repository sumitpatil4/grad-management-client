import React from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Leadership.css';


const Leadership = () => {
    
  return (
    <div className="LeadershipChart">
      <h1>ATTENDANCE FOR EACH TRAINING</h1>
      <div className="chart-container">
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [90, 80, 70, 60],
                // Color of each bar
                backgroundColor: 'rgba(75,192,192,1)',
                // Border color of each bar
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 0.5,
                // width: 5,
                
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  barPercentage: 0.2,
                  categoryPercentage: 0.2,
                },
              ],
            },
            legend: { 
              labels: { 
                fontSize: 15, 
              },
            },
          }}        
          />
      </div>
    </div>


  )
}

export default Leadership