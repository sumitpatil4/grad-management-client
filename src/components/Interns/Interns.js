import React, { useContext, useEffect, useState } from 'react'
import "./interns.css"
import { MdAddCircle,MdEdit,MdDelete,MdAddBox } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import * as XLSX from "xlsx";
import { FiUpload } from 'react-icons/fi';

const Interns = () => {
    const navigate=useNavigate();
    const managercontext=useContext(ManagerContext);
    const {train,internsList,groupsList,updateinternsList,updategroupsList}=managercontext;
    const authcontext=useContext(AuthContext);
    const {userid}=authcontext;
    const [groupName,setGroupName]=useState("");
    const [currentGroup,setCurrentGroup]=useState([]);
    const [defaultInternList,setdefaultInternList]=useState([]);
    const [defaultInternIdList,setdefaultInternIdList]=useState([]);
    const [newGroup,setNewGroup]=useState("");
    const [internInstance,setinternInstance]=useState("");
    const [defaultCheck,setDefaultCheck]=useState(true);
    const [isOpenNewGroup,setisOpenNewGroup]=useState(false);
    const [isOpenEditGroup,setisOpenEditGroup]=useState(false);
    const [isOpenDeleteGroup,setisOpenDeleteGroup]=useState(false);
    const [isOpenDeleteForGroup,setisOpenDeleteForGroup]=useState(false);
    const [isOpenDefaultAddIntern,setisOpenDefaultAddIntern]=useState(false);
    const [isOpenGroupAddIntern,setisOpenGroupAddIntern]=useState(false);
    const [isOpenEditIntern,setisOpenEditIntern]=useState(false);
    const [isOpenDeleteIntern,setisOpenDeleteIntern]=useState(false);
    const [internname,setinternname]=useState("");
    const [phoneno,setphoneno]=useState("");
    const [internemail,setinternemail]=useState("");
    const [defBatch,setDefBatch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [useeffectreload, setUseeffectreload] = useState(false)
    const [useeffectreload1, setUseeffectreload1] = useState(false)
    const [useeffectreload2, setUseeffectreload2] = useState(false)
    const [useeffectreload3, setUseeffectreload3] = useState(false)
    const batchName = `${train.trainingName}_${train.trainingId}`;
    const [resPopUp,setResPopUp] = useState(false);
    const [internErrPopup,setinternErrPopup] = useState(false);
    const [resMessage,setResMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const fileInput = useRef(null);
    const [uploadPopUp,setuploadPopUp] = useState(false);

    const handleFileSubmit = (e) => {
        e.preventDefault(); // prevent default form submission behavior
        internsExcel(fileInput.current.files[0]);
      };

      const dataValidityCheck=(dataArr)=>{
          const regName=/^[a-zA-Z][a-zA-Z0-9]*$/;
          const regEmail=/^\S+@\S+$/;
          const regPhone=/^[0-9]{10}$/;
         if(dataArr.length===0)
            return false;
         else {
            let flag=true;
            dataArr.forEach((data)=>{
                if(Object.keys(data).length<3)
                {
                    flag = false;
                }
                else {
                    if(!(regName.test(data.Name)
                    && regEmail.test(data.Email)
                    && regPhone.test(toString(data.Phone)))
                    ){
                        flag = false;
                    }
                }
            })
            return flag;
        }
      }

      const internsExcel = (file) => {
        setuploadPopUp(false);
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const internsData = XLSX.utils.sheet_to_json(worksheet);
          if(dataValidityCheck(internsData))
          {

            setIsLoading(true);
            internsData.forEach((intern,index)=>{
                axios.post(`http://localhost:8090/intern/createIntern/${userid}/${train.trainingId}`,{
                    "internName":intern.Name,
                    "email":intern.Email,
                    "phoneNumber":intern.Phone
                },{
                    headers:{
                    "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then((res)=>{
                    if(index===internsData.length-1)
                    {
                        setUseeffectreload(!useeffectreload);
                        setIsLoading(false);
                    }
                }).catch((err)=>{
                    setResMessage(err.response.data.message);
                    setResPopUp(true);
                    setIsLoading(false);
                });
            })

          }
          else{
            setinternErrPopup(true);
          }
        }
        reader.readAsBinaryString(file);
      };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
      };

      const filteredInterns = defaultCheck ? internsList.filter(
        (intern) =>
          intern.internName.toLowerCase().includes(searchQuery.toLowerCase())
      ):currentGroup[0].internList.filter(
        (intern) =>
          intern.internName.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const getInternsListUsingBatchId=(batchid)=>{
        const internslist=internsList.filter((e)=>e.batch.batchId===batchid);
        return internslist;
    }

    const activeClass=(e)=>{
        let btns = document.getElementsByClassName("groupbtns");
        let x=[...btns]
        x.forEach((t)=>t.className="groupbtns")
        e.target.className+=" active";
    }

    const defactiveClass=()=>{
        document.getElementById("defBatch").className+=" active";
    }

    const handleDefaultGroup=()=>{
        setDefaultCheck(true);
        setGroupName(train.trainingName);
        setSearchQuery("");
    }

    useEffect(()=>{
        setIsLoading(true);
        axios.get(`http://localhost:8090/intern/getInterns/${train.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            updateinternsList(res.data.intern);
            setUseeffectreload2(!useeffectreload2);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
    },[useeffectreload,defaultCheck,useeffectreload1])

    useEffect(()=>{
        if(groupName.length===0)
            setGroupName(train.trainingName);
        setIsLoading(true);
        axios.get(`http://localhost:8090/batch/getBatch/${train.trainingId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            res.data.batch.forEach((e)=>{
                e.internList=getInternsListUsingBatchId(e.batchId);
            })
            return res.data.batch;
        }).then((data)=>{
            const newBatchList = data.filter(e=>e.batchName!==batchName);
            setDefBatch(data.filter(e=>e.batchName===batchName)[0]);
            updategroupsList(newBatchList);
            setUseeffectreload3(!useeffectreload3);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
    },[useeffectreload,defaultCheck,useeffectreload2])

    useEffect(()=>{
        if(currentGroup.length!==0)
        {
            setCurrentGroup(groupsList.filter((e)=>e.batchId===currentGroup[0].batchId));
            if(!defaultCheck)
                setGroupName(currentGroup[0].batchName);
        }
    },[useeffectreload3])

    const handlegroupName=(batchid,name)=>{
            setSearchQuery("");
            setCurrentGroup(groupsList.filter((e)=>e.batchId===batchid));
            setUseeffectreload1(!useeffectreload1);
            setDefaultCheck(false);
            setGroupName(name);
    }

    const handleAddGroup=()=>{
        //call the add group api using above data
        setIsLoading(true);
        axios.post(`http://localhost:8090/batch/createBatch/${train.trainingId}`,{
            "batchName":newGroup
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setisOpenNewGroup(false);
        setNewGroup("");
    }

    const handleEditPopup=(grpname)=>{
        setNewGroup(grpname);
        setisOpenEditGroup(true);
    }

    const handleEditGroup=()=>{
        setIsLoading(true);
        axios.put(`http://localhost:8090/batch/updateBatch/${currentGroup[0].batchId}`,{
            "batchName":newGroup
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        .then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        //call the update group name api using above data
        setisOpenEditGroup(false);
        setNewGroup("");
    }

    const handleDeleteGroup=()=>{
        const internlist=getInternsListUsingBatchId(currentGroup[0].batchId);
        const arr=[];
        internlist.forEach((e)=>arr.push(e.internId))
        //call the delete group name api using above data
        setIsLoading(true);
        axios.put(`http://localhost:8090/batch/updateInternBatch/${currentGroup[0].batchId}/${defBatch.batchId}`,{
            "internIdList":arr
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          }).
        then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setGroupName(train.trainingName)
        setDefaultCheck(true);
        defactiveClass()
        setisOpenDeleteGroup(false);
        setNewGroup("");
    }

    const handleDeleteForGroup=()=>{
        //call the api with both of above
        setIsLoading(true);
        axios.put(`http://localhost:8090/intern/deleteInternBatch/${internInstance.internId}/${defBatch.batchId}`,null,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setisOpenDeleteForGroup(false)
    }

    const handleDefaultAddIntern=()=>{
        const intern = {
            internName:internname,
            phoneNumber:phoneno,
            email:internemail
        }
        setIsLoading(true);
        axios.post(`http://localhost:8090/intern/createIntern/${userid}/${train.trainingId}`,{
            "internName":internname,
            "email":internemail,
            "phoneNumber":phoneno
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        //call add api here with above data
        setisOpenDefaultAddIntern(false);
    }

    const handleEditInternPopup=(e)=>{
        setinternInstance(e);
        setinternname(e.internName);
        setphoneno(e.phoneNumber);
        setinternemail(e.email);
        setisOpenEditIntern(true);
    }

    const handleEditIntern=()=>{
        const intern = {
            internName:internname,
            phoneNumber:phoneno,
            email:internemail
        }
        //call edit api here with above data
        setIsLoading(true);
        axios.put(`http://localhost:8090/intern/updateIntern/${internInstance.internId}`,{
            "internName":internname,
            "email":internemail,
            "phoneNumber":phoneno
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setisOpenEditIntern(false);
    }

    const handleDeleteInternPopup=(e)=>{
        setinternInstance(e);
        setisOpenDeleteIntern(true);
    }

    const handleDeleteIntern=()=>{
        //call delete api here with above data
        setIsLoading(true);
        axios.delete(`http://localhost:8090/intern/deleteIntern/${internInstance.internId}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then((res)=>{
            setUseeffectreload(!useeffectreload);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setisOpenDeleteIntern(false);
    }

    const handleAddList=(chk,id)=>{
        if(chk.target.checked)
        {
            defaultInternIdList.push(id);
            setdefaultInternIdList(defaultInternIdList);
        }
        else{
            if(defaultInternIdList.includes(id))
            {
                defaultInternIdList.splice(defaultInternIdList.indexOf(id), 1);
                setdefaultInternIdList(defaultInternIdList);
            }
        }
    }

    const handleGroupAddInternPopup=()=>{
        setdefaultInternList(getInternsListUsingBatchId(defBatch.batchId))
        setisOpenGroupAddIntern(true);
    }

    const handleGroupAddIntern=()=>{
        //call the add interns to group api
        setIsLoading(true);
        axios.put(`http://localhost:8090/intern/updateInternBatch/${currentGroup[0].batchId}`,{
            "internIdList":defaultInternIdList
        },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
          }).
        then((res)=>{
            setdefaultInternIdList([]);
            setUseeffectreload1(!useeffectreload1);
            setDefaultCheck(false);
            setIsLoading(false);
        }).catch((err)=>{
            setResMessage(err.response.data.message);
            setResPopUp(true);
            setIsLoading(false);
        });
        setisOpenGroupAddIntern(false);
    }

    return (
        <>
        {isLoading?<div className="loading">
            <PuffLoader color="#4CAF50" />
            </div>:<></>}
        <div className='internsContainerWrapper'>
            <div className='internHeader'>
                <span><IoMdArrowRoundBack title='Go Back To Previous Page' onClick={()=>navigate(-1)} className='backButton'/></span>
                <h2>Interns</h2>
            </div>
            <div className='internsContainer'>
                <div className='titleContainer'>
                    <div className='titleWrapper'>
                        <p className='titleIntern'>{groupName}</p>
                        {!defaultCheck ?
                        <>
                        <p><MdAddCircle title='Add Intern to Group' className='internIcons addIntern' onClick={()=>handleGroupAddInternPopup()}/></p>
                        <p><MdEdit title='Edit Group' onClick={()=>handleEditPopup(groupName)} className='internIcons edit-icon'/></p>
                        <p><MdDelete title='Delete Group' onClick={()=>setisOpenDeleteGroup(true)} className='internIcons del_icon'/></p>
                        </>:<>
                        <p><MdAddCircle title='Add Intern to Training' className='internIcons addIntern' onClick={()=>setisOpenDefaultAddIntern(true)}/></p>
                        <p><FiUpload title='Upload Interns Using Excel' style={{color:"white",paddingTop:"6px",paddingLeft:"6px"}} className='uploadIcon' onClick={()=>setuploadPopUp(true)}/></p>
                        </>
                        }
                    </div>
                    <div className='internsearchwrapper'>
                        <div className="buttonContainer2">
                            <div className="search-bar2">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            </div>
                            <div type="submit" className="searchdiv" onClick={handleSearchInputChange}>
                                <FaSearch className='searchIcon'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='groupContainer'>
                    <div className='groupWrapper'>
                        <p className='titleIntern' style={{fontSize:"25px"}}>Groups</p>
                        <p><MdAddCircle title='Add New Group' className='internIcons addIntern' onClick={()=>setisOpenNewGroup(true)}/></p>
                    </div>
                </div>
                <div className='internsTableContainer'>
                    <table style={{boxShadow:"none"}}>
                        <thead style={{borderRadius:"0px"}}>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {defaultCheck && <th>Group</th>}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {defaultCheck ? 
                                ((searchQuery !== "" ? filteredInterns : internsList).map((e,i)=><tr key={i}>
                                    <td>{e.internName}</td>
                                    <td>{e.email}</td>
                                    <td>{e.batch.batchName===defBatch.batchName ? <i>{"NA"}</i> : e.batch.batchName}</td>
                                    <td>
                                        <MdEdit title='Edit Intern' className='edit-icon' onClick={()=>handleEditInternPopup(e)}/>
                                        <MdDelete title='Delete Intern' className='del_icon' onClick={()=>handleDeleteInternPopup(e)}/>
                                    </td>
                                </tr>)):(
                                    (searchQuery !== "" ? filteredInterns : currentGroup[0].internList).map((e,j)=><tr key={j}>
                                    <td>{e.internName}</td>
                                    <td>{e.email}</td>
                                    <td>
                                        <MdEdit title='Edit Intern' className='edit-icon' onClick={()=>handleEditInternPopup(e)}/>
                                        <MdDelete title='Delete Intern From Group' onClick={()=>{setisOpenDeleteForGroup(true);setinternInstance(e)}} className='del_icon'/>
                                    </td>
                                </tr>)
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='internsGroupsContainer'>
                    <div className='groupbtns active' id='defBatch' onClick={(x)=>{handleDefaultGroup();activeClass(x)}}>{train.trainingName}</div>
                    {groupsList.map((e,i)=><div key={i} className='groupbtns' onClick={(x)=>{handlegroupName(e.batchId,e.batchName);activeClass(x)}}>{e.batchName}</div>)}
                </div>
            </div>
        </div>
        {isOpenNewGroup && <form onSubmit={handleAddGroup}><div className='popupContainer'>
        <div className="popup-boxd">
          <div className='popupHeader'>
            <h2>Add New Group</h2>
          </div>
          <div className='inputContainer'>
            <div className="input-group">
              <label htmlFor="name">Name </label>
              <div>
                <input type="text" id="name" pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                       title="Please enter a valid name" 
                       onChange={(e)=>setNewGroup(e.target.value)} required={true}/>
              </div>                                                              
            </div>
          </div>
          <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" >
             Submit
            </button>
            <button type="button" className="cancel-btn" onClick={()=>setisOpenNewGroup(false)}>
              Cancel
            </button>
          </div>
        </div>
    </div></form>}

    {isOpenEditGroup && <form onSubmit={handleEditGroup}><div className='popupContainer'>
        <div className="popup-boxd">
          <div className='popupHeader'>
            <h2>Enter New Group Name</h2>
          </div>
            
        <div className='inputContainer'>
          <div className="input-group">
            <label htmlFor="name">Name </label>
            <div>
              <input 
              type="text" 
              id="name" 
              pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
              title="Please enter a valid name" 
              onChange={(e)=>setNewGroup(e.target.value)} 
              value={newGroup} 
              required={true}/>
            </div>                                                         
          </div>
        </div>

        <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" >
             Submit
            </button>
            <button type="button" className="cancel-btn" onClick={()=>setisOpenEditGroup(false)}>
              Cancel
            </button>
        </div>
      </div>
      </div></form>}

      {uploadPopUp && <div className='popupContainer'>
        <div className='popup-boxd'>
            <div className='popupHeader'>
                <h2>Upload Interns</h2>
            </div>

            <form className="attendance-form">
                <div>
                    <label htmlFor="attendance"> Upload Excel File</label>
                    <input
                    type="file"
                    id="file"
                    ref={fileInput}
                    name="file"
                    />
                </div>        

            <div className='buttonsContainer'>
            <button type="submit" className="submit-btn" onClick={(e)=>{handleFileSubmit(e)}}>
                Upload
            </button>
            <button type="reset" className="cancel-btn" onClick={() =>{setuploadPopUp(false);} }>
                Cancel
            </button>
            </div>
            </form>
        </div>
    </div>}

      {isOpenDeleteGroup && <div className='popupContainer'>
       <div className='popup-boxd'>
        <div className='popupHeader'>
          <h2>Are you sure to delete this Group?</h2>
        </div>
          <div className='buttonsContainer'>
            <button type="button" className="submit-btn" onClick={() => handleDeleteGroup()}>
                Yes
            </button>
            <button type="button" className="cancel-btn" onClick={() => setisOpenDeleteGroup(false)}>
                No
            </button>
          </div>
        </div>
        </div>
        }

        {isOpenDeleteForGroup && <div className='popupContainer'>
       <div className='popup-boxd'>
        <div className='popupHeader'>
          <h2>Are you sure to delete this Intern from Group?</h2>
        </div>
          <div className='buttonsContainer'>
            <button type="button" className="submit-btn" onClick={() => handleDeleteForGroup()}>
                Yes
            </button>
            <button type="button" className="cancel-btn" onClick={() => setisOpenDeleteForGroup(false)}>
                No
            </button>
          </div>
        </div>
        </div>
        }

    {isOpenDeleteIntern && <div className='popupContainer'>
       <div className='popup-boxd'>
        <div className='popupHeader'>
          <h2>Are you sure to delete this Intern?</h2>
        </div>
          <div className='buttonsContainer'>
            <button type="button" className="submit-btn" onClick={() => handleDeleteIntern()}>
                Yes
            </button>
            <button type="button" className="cancel-btn" onClick={() => setisOpenDeleteIntern(false)}>
                No
            </button>
          </div>
        </div>
        </div>
        }

        {isOpenDefaultAddIntern && <form onSubmit={handleDefaultAddIntern}>
            <div className='popupContainer'>
                <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Add New Intern</h2>
                </div>
                <div className='inputContainer'>
                    <div className="input-group">
                        <label htmlFor="name">Name </label>
                        <input type="text" id="name" pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                               title="Please enter a valid name"
                               onChange={(e)=>setinternname(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Email </label>
                        <input type="email" id="name" onChange={(e)=>setinternemail(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">PhoneNo </label>
                        <input type="text" id="name" pattern="[0-9]{10}" onChange={(e)=>setphoneno(e.target.value)} 
                        required={true} title="Please enter a valid 10-digit phone number"/>
                    </div>
                </div>
                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" >
                        Submit
                    </button>
                    <button type="button" className="cancel-btn" onClick={()=>setisOpenDefaultAddIntern(false)}>
                        Cancel
                    </button>
                </div>
                </div>
            </div></form>}


            {isOpenGroupAddIntern && <form onSubmit={handleGroupAddIntern}>
                <div className='popupContainer'>
                <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Add Interns To Group</h2>
                </div>
                <div className='inputContainer'>
                    <h2>Select Interns</h2>
                    <div className='internWrapperDiv'>
                        {
                            defaultInternList.map((e,i)=><div key={i} className='ListInternWrapper'>
                                <form>
                                    <input 
                                    onClick={(x)=>handleAddList(x,e.internId)} 
                                    type="checkbox"
                                    required={true}/>
                                </form>
                                <p>{e.internName}</p>
                            </div>)
                        }
                    </div>
                </div>
                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" >
                        Submit
                    </button>
                    <button type="button" className="cancel-btn" onClick={()=>{setisOpenGroupAddIntern(false);setdefaultInternIdList([]);}}>
                        Cancel
                    </button>
                </div>
                </div>
            </div></form>}


            {isOpenEditIntern && <form onSubmit={handleEditIntern}>
                <div className='popupContainer'>
                <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Add New Intern</h2>
                </div>
                <div className='inputContainer'>
                    <div className="input-group">
                        <label htmlFor="name">Name </label>
                        <input type="text" id="name" value={internname} 
                               pattern="^[a-zA-Z][a-zA-Z0-9]*$" 
                               title="Please enter a valid name"
                               onChange={(e)=>setinternname(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Email </label>
                        <input type="email" id="name" value={internemail} onChange={(e)=>setinternemail(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">PhoneNo </label>
                        <input type="text" id="name" pattern="[0-9]{10}" value={phoneno} 
                        onChange={(e)=>setphoneno(e.target.value)} required={true} title="Please enter a valid 10-digit phone number"/>
                    </div>
                </div>
                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" >
                        Submit
                    </button>
                    <button type="button" className="cancel-btn" onClick={()=>setisOpenEditIntern(false)}>
                        Cancel
                    </button>
                </div>
                </div>
            </div></form>}
            {resPopUp && <div className='popupContainer'>
            <div className='popup-boxd'>
                <div className='popupHeader'>
                <h2>Opps Something went wrong!!</h2>
                </div>
                <div className='msgContainer'>
                    <p>{resMessage}</p>
                </div>
                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" onClick={() => setResPopUp(false)}>
                    Ok
                    </button>
                </div>
            </div>
            </div>}

            {internErrPopup && <div className='popupContainer'>
            <div className='popup-boxd'>
                <div className='popupHeader'>
                <h2>Error</h2>
                </div>
                <div className='msgContainer'>
                    <p>Invalid Data in Excel file uploaded</p>
                </div>
                <div className='buttonsContainer'>
                    <button type="submit" className="submit-btn" onClick={() => setinternErrPopup(false)}>
                    Ok
                    </button>
                </div>
            </div>
            </div>}

    </>
    )
}

export default Interns