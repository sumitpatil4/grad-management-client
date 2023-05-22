import React from 'react'
import "./aboutUs.css"

const About = () => {
  return (
    <div >
      <div className='aboutUs'>
        <div className='aboutUsContent'>
        
          <p>The Grad Management System is an application for managing the trainings of the grads who are hired by the organisation.</p>
          <p>It makes it easy to maintain the records of interns, trainers, topics and their trainings.</p>

          <div className='about'>
            <div>
              <h6>Designed by</h6>
              <ul>
                <li>Sumit Vasant Patil</li>
                <li>Akriti Singh</li>
                <li>Ashish Tripathy</li>
                <li>Sai Krupananda</li>
              </ul>
            </div>
            <div>
              <h6>Manager</h6>
              <ul>
                <li>Sumit Agarwal</li>
              </ul>
            </div>
            <div>
              <h6>Mentors</h6>
              <ul>
                <li>Gajendra Solanki</li>
                <li>Deepak Sahu</li>
                <li>Ayush Gupta</li>
              </ul>
            </div>           
          </div>
        </div>
      </div>
    </div>    
    
  )
}

export default About