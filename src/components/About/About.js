import React from 'react'
import "./aboutUs.css"
import avator from "../../images/avator.png"

const About = () => {
  return (
    <div >
      <div className='aboutUs'>
          <div className='aboutUsContent'>
          {/* <img src={gradmanagement}></img> */}
            <p>The Grad Management System is an application for managing the trainings of the grads who are hired by the organisation.</p>
            <p>It makes it easy to maintain the records of interns, trainers, topics and their trainings.</p>

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