import React from 'react'
import "../../styles/aboutUs/aboutUs.css"
import avator from "../img/avator.png"

const About = () => {
  return (
    <div >
      <div className='aboutUs'>
          <h1>Welcome to GradManagement</h1>
          <div className='aboutUsContent'>
          {/* <img src={gradmanagement}></img> */}
            <p>The GradManagement Helps the Manager in managing and kepping a record of Interns  respective Trainings along with their Trainers.</p><p>   The Manager can schedule a meeting for a particular Topic for a group of Interns.</p>

            <br></br>
            <div className='about'>
            <div>
            <h4>This Application was &nbsp;&nbsp;Designed by</h4>
            <br></br>
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
            <h4>Our Manager</h4>
            <br></br>
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
            <h4>Our Mentors</h4>
            <br></br>
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
            </ul>
            </div>           
          </div>


         </div>
      </div>
      </div>    
    
  )
}

export default About