import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Leadership.css';


const Barchart = (props) => {    
  return (
    <div className="LeadershipChart">
      <div className="chart-container">
        <Bar
          data={{
            labels:props.batch,
            datasets: [
              {
                label: "Present (%)",
                data: props.percentage,
                backgroundColor: 'rgb(46, 200, 102)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 0.0,
              },
            ],
          }}
          height={200}
          options={{
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                      display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                    },
                },
            },
            legend: { 
              labels: { 
                fontSize: 15, 
              },
            },
            responsive: true,
            barPercentage: 0.5,
          }}        
          />
      </div>
    </div>


  )
}

export default Barchart;
