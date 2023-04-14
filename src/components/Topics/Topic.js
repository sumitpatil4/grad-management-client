import React, { useContext, useEffect, useState } from 'react'
import "./topic.css"
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const Topic = () => {

    const [topicList,settopicList]=useState([]);
    const [completedList,setcompletedList]=useState([]);
    const [reamainingList,setreamainingList]=useState([]);
    const [completedCheck,setcompletedCheck]=useState(false);

    useEffect(()=>{
        settopicList([
            {topicId:1,topicName:"M Sai Krupananda",isCompleted:true},
            {topicId:1,topicName:"Sai Krupananda",isCompleted:false},
            {topicId:1,topicName:"Sai Krupananda",isCompleted:true},
            {topicId:1,topicName:"Sai Krupananda",isCompleted:false},
            {topicId:1,topicName:"Sai Krupananda",isCompleted:true},
            {topicId:1,topicName:"Sai Krupananda",isCompleted:false},
            {topicId:1,topicName:"Sai Krupananda",isCompleted:true},
            {topicId:1,topicName:"Sai Krupananda",isCompleted:true},
        ])

        setcompletedList(topicList.filter((t)=>t.isCompleted))
        setreamainingList(topicList.filter((t)=>!t.isCompleted))

    },[topicList])

    const activeClass=(e)=>{
        let btns = document.getElementsByClassName("topicBtns");
        let x=[...btns]
        x.forEach((t)=>t.className="topicBtns")
        e.target.className+=" active";
    }

    return (
        <div className='topicContainer'>
            <div className='topicWrapper'>
                <h2>Topics</h2>
                <div className='topicNavbar'>
                    <div className='buttonsWrapper'>
                        <p onClick={(e)=>{setcompletedCheck(true);activeClass(e);}} className='topicBtns'>Completed</p>
                        <p onClick={(e)=>{setcompletedCheck(false);activeClass(e);}} className='topicBtns active'>Remaining</p>
                    </div>
                    <div className='searchWrapper'>
                        <div className="buttonContainer2">
                            <div className="search-bar2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                />
                            </div>
                            <div>
                                <FaSearch className='searchIcon'/>
                            </div>
                        </div>
                        <div>
                            <p className='topicAdd'>Add&nbsp;Topic</p>
                        </div>
                    </div>
                </div>
                <div className='topicsdiv'>
                    { completedCheck &&
                        completedList.map((t)=><div className='topicbar'>
                            <form>
                                <input type="checkbox" checked={true}/>
                            </form>
                            <p>{t.topicName}</p>
                            <div> 
                                <MdEdit className="edit-icon"/>
                            </div>
                            <div>
                                <MdDelete className="del_icon"/>
                            </div>
                        </div>)
                    }
                    { !completedCheck &&
                        reamainingList.map((t)=><div className='topicbar'>
                            <form>
                                <input type="checkbox"/>
                            </form>
                            <p>{t.topicName}</p>
                            <div> 
                                <MdEdit className="edit-icon"/>
                            </div>
                            <div>
                                <MdDelete className="del_icon"/>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>        
    )
}

export default Topic;