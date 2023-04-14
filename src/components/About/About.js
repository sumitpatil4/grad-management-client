import React from 'react'
import "./aboutUs.css"
import avator from "../../images/avator.png"

const About = () => {
  return (
    <div >
      <div className='aboutUs'>
          <h4>Welcome to GradManagement</h4>
          <div className='aboutUsContent'>
          {/* <img src={gradmanagement}></img> */}
            <p>The GradManagement Helps the Manager in managing and kepping a record of Interns their Trainer along with their Trainings.</p>
            <p> The Manager can schedule a meeting for a particular Topic for a group of Interns.</p>

            <div className='about'>
            <div>
            <h6>Designed by</h6>
            <ul>
               <li>
                   {/* <div class="circleContainer"> 
                        <img src={avator}></img>
                    </div> */}
                    Sumit Vasant Patil
                </li>
                <li>
                   {/* <div class="circleContainer"> 
                        <img src={avator}></img>
                    </div> */}
                    Akriti Singh
                </li>
                <li>
                   {/* <div class="circleContainer"> 
                        <img src={avator}></img>
                    </div> */}
                    Ashish Tripathy
                </li>
                <li>
                   {/* <div class="circleContainer"> 
                        <img src={avator}></img>
                    </div> */}
                    Sai Krupanada
                </li>
            </ul>
            </div>
            <div>
            <h6>Manager</h6>
            <ul>
              <li> 
                 {/* <div class="circleContainer"> 
                    <img src={avator}></img>
                  </div> */}
                  Sumit Agarwal
                </li>
            </ul>
            </div>
            <div>
            <h6>Mentors</h6>
            <ul>
              <li> 
                 {/* <div class="circleContainer"> 
                    <img src={avator}></img>
                  </div> */}
                  Gajendra Solanki 
                </li>
                <li> 
                 {/* <div class="circleContainer"> 
                    <img src={avator}></img>
                  </div> */}
                  Deepak Sahu
                </li>
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