import React, { useContext, useEffect, useState } from 'react'
import "./interns.css"
import { MdEdit,MdDelete,MdAddBox } from 'react-icons/md';
import ManagerContext from '../Contextapi/Managercontext';
import AuthContext from '../Contextapi/Authcontext';
import { FaSearch } from 'react-icons/fa';

const Interns = () => {

    const managercontext=useContext(ManagerContext);
    const {train,internsList,groupsList,updateinternsList,updategroupsList}=managercontext;
    const authcontext=useContext(AuthContext);
    const {userid}=authcontext;
    const [groupName,setGroupName]=useState("TrainingName");
    const [currentGroup,setCurrentGroup]=useState({});
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

    const getInternsListUsingBatchId=(batchid)=>{
        const internslist=internsList.filter((e)=>e.BatchId===batchid);
        return internslist;
    }

    const activeClass=(e)=>{
        let btns = document.getElementsByClassName("groupbtns");
        let x=[...btns]
        x.forEach((t)=>t.className="groupbtns")
        e.target.className+=" active";
    }

    useEffect(()=>{
        updateinternsList([
            { interId: 1, internName: 'Ashish Tripathy', email: 'ashish@gmail.com', BatchId: 'group1' },
            { interId: 2, internName: 'Sumit Vasant', email: 'sumit@gmail.com', BatchId: 'group2'},
            { interId: 3, internName: 'SaiKrupananda', email: 'sai@gmail.com', BatchId: 'group1'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
          ]);

        updategroupsList([
            { batchId: 1, batchName: 'group1',internList:[{ interId: 1, internName: 'Ashish Tripathy', email: 'ashish@gmail.com', BatchId: 'group1' },
            { interId: 2, internName: 'Sumit Vasant', email: 'sumit@gmail.com', BatchId: 'group2'},
            { interId: 3, internName: 'SaiKrupananda', email: 'sai@gmail.com', BatchId: 'group1'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},] },
            { batchId: 2, batchName: 'group2',internList:[{ interId: 1, internName: 'Ashish Tripathy', email: 'ashish@gmail.com', BatchId: 'group1' },
            { interId: 2, internName: 'Sumit Vasant', email: 'sumit@gmail.com', BatchId: 'group2'},
            { interId: 3, internName: 'SaiKrupananda', email: 'sai@gmail.com', BatchId: 'group1'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},] },
            { batchId: 3, batchName: 'group3',internList:[{ interId: 1, internName: 'Ashish Tripathy', email: 'ashish@gmail.com', BatchId: 'group1' },
            { interId: 2, internName: 'Sumit Vasant', email: 'sumit@gmail.com', BatchId: 'group2'},
            { interId: 3, internName: 'SaiKrupananda', email: 'sai@gmail.com', BatchId: 'group1'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},
            { interId: 4, internName: 'Akriti Singh', email: 'akriti@gmail.com', BatchId: 'group2'},] },
          ]);
        
    },[])


    const handlegroupName=(batchid,name)=>{
        //compare batchid_name with default if yes  
        setDefaultCheck(true);
        //else
        {
            console.log(groupsList.filter((e)=>e.batchId===batchid));
            setCurrentGroup(groupsList.filter((e)=>e.batchId===batchid));
            setDefaultCheck(false);//make it false when integrated
            setGroupName(name);
        }
        console.log(batchid)
    }

    const handleAddGroup=()=>{
        console.log(newGroup,train);
        //call the add group api using above data
        setisOpenNewGroup(false);
        setNewGroup("");
    }

    const handleEditPopup=(grpname)=>{
        setNewGroup(grpname);
        setisOpenEditGroup(true);
    }

    const handleEditGroup=()=>{
        console.log(newGroup,train,currentGroup);
        //call the update group name api using above data
        setisOpenEditGroup(false);
        setNewGroup("");
    }

    const handleDeleteGroup=()=>{
        console.log(train,currentGroup,"call delete api");
        //call the delete group name api using above data
        setisOpenDeleteGroup(false);
        setNewGroup("");
    }

    const handleDeleteForGroup=()=>{
        console.log(internInstance,"default_id");
        //call the api with both of above
        setisOpenDeleteForGroup(false)
    }

    const handleDefaultAddIntern=()=>{
        const intern = {
            internName:internname,
            phoneNumber:phoneno,
            email:internemail
        }
        console.log(intern,train,userid,"default batchid");
        //call add api here with above data
        setisOpenDefaultAddIntern(false);
    }

    const handleEditInternPopup=(e)=>{
        setinternInstance(e);
        setinternname(e.internName);
        setphoneno(e.BatchId);
        setinternemail(e.email);
        
        setisOpenEditIntern(true);
    }

    const handleEditIntern=()=>{
        const intern = {
            internName:internname,
            phoneNumber:phoneno,
            email:internemail
        }
        console.log(internInstance,intern,train,userid,"default batchid");
        //call edit api here with above data
        setisOpenEditIntern(false);
    }

    const handleDeleteInternPopup=(e)=>{
        setinternInstance(e);
        setisOpenDeleteIntern(true);
    }

    const handleDeleteIntern=()=>{
        console.log(internInstance,train,userid,"default batchid");
        //call delete api here with above data
        setisOpenDeleteIntern(false);
    }

    const handleAddList=(chk,id)=>{
        if(chk.target.checked)
        {
            defaultInternIdList.push(id);
            setdefaultInternIdList(defaultInternIdList);
            console.log(defaultInternIdList)
        }
        else{
            if(defaultInternIdList.includes(id))
            {
                defaultInternIdList.splice(defaultInternIdList.indexOf(id), 1);
                setdefaultInternIdList(defaultInternIdList);
                console.log(defaultInternIdList)
            }
        }
    }

    const handleGroupAddInternPopup=()=>{
        setdefaultInternList(getInternsListUsingBatchId("group2"))
        setisOpenGroupAddIntern(true);
    }

    const handleGroupAddIntern=()=>{
        console.log(defaultInternIdList,currentGroup);
        //call the add interns to group api
        setisOpenGroupAddIntern(false);
    }

    return (
        <>
        <div className='internsContainerWrapper'>
            <h2>Interns</h2>
            <div className='internsContainer'>
                <div className='titleContainer'>
                    <div className='titleWrapper'>
                        <p className='titleIntern'>{groupName}</p>
                        {!defaultCheck ?
                        <>
                        <p><MdAddBox className='addIntern' onClick={()=>handleGroupAddInternPopup()}/></p>
                        <p><MdEdit onClick={()=>handleEditPopup(groupName)} className='edit-icon'/></p>
                        <p><MdDelete onClick={()=>setisOpenDeleteGroup(true)} className='del_icon'/></p>
                        </>:<p><MdAddBox className='addIntern' onClick={()=>setisOpenDefaultAddIntern(true)}/></p>
                        }
                    </div>
                    <div className='searchWrapper'>
                        <div className="buttonContainer2">
                            <div className="search-bar2">
                            <input
                                type="text"
                                placeholder="Search..."
                            />
                            </div>
                            <div type="submit">
                                <FaSearch className='searchIcon'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='groupContainer'>
                    <div className='groupWrapper'>
                        <p className='titleIntern'>Groups</p>
                        <p><MdAddBox className='addIntern' onClick={()=>setisOpenNewGroup(true)}/></p>
                    </div>
                </div>
                <div className='internsTableContainer'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {defaultCheck && <th>Group</th>}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {defaultCheck ? 
                                (internsList.map((e)=><tr>
                                    <td>{e.internName}</td>
                                    <td>{e.email}</td>
                                    <td>{e.BatchId}</td>
                                    <td>
                                        <MdEdit className='edit-icon' onClick={()=>handleEditInternPopup(e)}/>
                                        <MdDelete className='del_icon' onClick={()=>handleDeleteInternPopup(e)}/>
                                    </td>
                                </tr>)):(
                                    currentGroup[0].internList.map((e)=><tr>
                                    <td>{e.internName}</td>
                                    <td>{e.email}</td>
                                    {/* <td>{e.BatchId}</td> */}
                                    <td>
                                        <MdDelete onClick={()=>{setisOpenDeleteForGroup(true);setinternInstance(e)}} className='del_icon'/>
                                    </td>
                                </tr>)
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='internsGroupsContainer'>
                    <div className='groupbtns active' onClick={(x)=>{setDefaultCheck(true);setGroupName("TrainingName");activeClass(x)}}>Training</div>
                    {groupsList.map((e)=><div className='groupbtns' onClick={(x)=>{handlegroupName(e.batchId,e.batchName);activeClass(x)}}>{e.batchName}</div>)}
                </div>
            </div>
        </div>
        {isOpenNewGroup && <form><div className='popupContainer'>
        <div className="popup-boxd">
          <div className='popupHeader'>
            <h2>Add New Group</h2>
          </div>
          <div className='inputContainer'>
            <div className="input-group">
              <label htmlFor="name">Name </label>
              <div>
                <input type="text" id="name" onChange={(e)=>setNewGroup(e.target.value)} required={true}/>
              </div>                                                              
            </div>
          </div>
          <div className='buttonsContainer'>
            <button type="button" className="submit-btn" onClick={()=>handleAddGroup()}>
             Submit
            </button>
            <button type="button" className="cancel-btn" onClick={()=>setisOpenNewGroup(false)}>
              Cancel
            </button>
          </div>
        </div>
    </div></form>}

    {isOpenEditGroup && <form><div className='popupContainer'>
        <div className="popup-boxd">
          <div className='popupHeader'>
            <h2>Enter New Group Name</h2>
          </div>
            
        <div className='inputContainer'>
          <div className="input-group">
            <label htmlFor="name">Name </label>
            <div>
              <input type="text" id="name" onChange={(e)=>setNewGroup(e.target.value)} value={newGroup}/>
            </div>                                                         
          </div>
        </div>

        <div className='buttonsContainer'>
            <button type="button" className="submit-btn" onClick={()=>handleEditGroup()}>
             Submit
            </button>
            <button type="button" className="cancel-btn" onClick={()=>setisOpenEditGroup(false)}>
              Cancel
            </button>
        </div>
      </div>
      </div></form>}

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

        {isOpenDefaultAddIntern && <form><div className='popupContainer'>
                <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Add New Intern</h2>
                </div>
                <div className='inputContainer'>
                    <div className="input-group">
                        <label htmlFor="name">Name </label>
                        <input type="text" id="name" onChange={(e)=>setinternname(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Email </label>
                        <input type="text" id="name" onChange={(e)=>setinternemail(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">PhoneNo </label>
                        <input type="text" id="name" onChange={(e)=>setphoneno(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className='buttonsContainer'>
                    <button type="button" className="submit-btn" onClick={()=>handleDefaultAddIntern()}>
                        Submit
                    </button>
                    <button type="button" className="cancel-btn" onClick={()=>setisOpenDefaultAddIntern(false)}>
                        Cancel
                    </button>
                </div>
                </div>
            </div></form>}


            {isOpenGroupAddIntern && <form><div className='popupContainer'>
                <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Add Interns To Group</h2>
                </div>
                <div className='inputContainer'>
                    <h2>Select Interns</h2>
                    <div className='internWrapperDiv'>
                        {
                            defaultInternList.map((e)=><div className='ListInternWrapper'>
                                <form>
                                    <input onClick={(x)=>handleAddList(x,e.interId)} type="checkbox"/>
                                </form>
                                <p>{e.internName}</p>
                            </div>)
                        }
                    </div>
                </div>
                <div className='buttonsContainer'>
                    <button type="button" className="submit-btn" onClick={()=>handleGroupAddIntern()}>
                        Submit
                    </button>
                    <button type="button" className="cancel-btn" onClick={()=>setisOpenGroupAddIntern(false)}>
                        Cancel
                    </button>
                </div>
                </div>
            </div></form>}


            {isOpenEditIntern && <form><div className='popupContainer'>
                <div className="popup-boxd">
                <div className='popupHeader'>
                    <h2>Add New Intern</h2>
                </div>
                <div className='inputContainer'>
                    <div className="input-group">
                        <label htmlFor="name">Name </label>
                        <input type="text" id="name" value={internname} onChange={(e)=>setinternname(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Email </label>
                        <input type="text" id="name" value={internemail} onChange={(e)=>setinternemail(e.target.value)} required={true}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">PhoneNo </label>
                        <input type="text" id="name" value={phoneno} onChange={(e)=>setphoneno(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className='buttonsContainer'>
                    <button type="button" className="submit-btn" onClick={()=>handleEditIntern()}>
                        Submit
                    </button>
                    <button type="button" className="cancel-btn" onClick={()=>setisOpenEditIntern(false)}>
                        Cancel
                    </button>
                </div>
                </div>
            </div></form>}

    </>
    )
}

export default Interns