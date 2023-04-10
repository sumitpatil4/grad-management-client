import React, { useState } from 'react'
import "./employee.css"
import { IoClose } from 'react-icons/io5';
import { MdEdit,MdDelete } from 'react-icons/md';

const Employees = () => {
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [empTemp,setEmpTemp]=useState({});
    const [empId,setEmpId]=useState("");
    const [temprole,setTemprole]=useState("");
    const [isOpenCon, setIsOpenCon] = useState(false)


    const [employees, setEmployees] = useState([
        { employeeid: 1, employeesname: 'Ashish Tripathy', empemail: 'ashish@gmail.com', role: 'manager' },
        { employeeid: 2, employeesname: 'Sumit Vasant Patil', empemail: 'sumit@gmail.com', role: 'leadership'},
        { employeeid: 3, employeesname: 'Sai Krupananda', empemail: 'sai@gmail.com', role: 'manager'},
        { employeeid: 4, employeesname: 'Akriti Singh', empemail: 'akriti@gmail.com', role: 'leadership'},
      ]);

    const handleDelete = (empId) => {
        const newEmployees = employees.filter((e) => e.employeeid !== empId);
        setEmployees(newEmployees);
        setIsOpenCon(false);
    };

    const handleEditPopup=(emp)=>{
        setIsOpenEdit(true);
        setEmpTemp(emp);
        setTemprole(emp.role);
    }

    const handleDeletePopup=(empid)=>{
        setIsOpenCon(true);
        setEmpId(empid);
    }

    const handleEditClick=(emp)=>{
        console.log(temprole);
        employees.forEach((e)=>{
            if(e.employeeid===emp.employeeid)
            {
                e.role=temprole;
            }
        })
        setEmployees(employees);
        setIsOpenEdit(false);
    }

    return (
        <div className='employeeContainer'>
        <table>
            <thead>
                <tr>
                    <th>EmployeeName</th>
                    <th>EmployeeEmail</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map((e)=><tr>
                        <td>{e.employeesname}</td>
                        <td>{e.empemail}</td>
                        <td>{e.role}</td>
                        <td>
                            <MdEdit  onClick={()=>handleEditPopup(e)} className='edit-icon'/>
                            <MdDelete onClick={()=>handleDeletePopup(e.employeeid)} className='del_icon'/>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

        {isOpenCon && <div className='popupContainer'>
       <div className='con-popup'>
        <div className='delTrain'>
        <h2>Are you sure to delete this employee?</h2>
        </div>
          <div><button type="submit" className="submit-btn" onClick={() => handleDelete(empId)}>
            Yes
          </button>
          <button type="reset" className="cancel-btn" onClick={() => setIsOpenCon(false)}>
            No
          </button>
          </div>
        </div>
        </div>
        }

        {isOpenEdit && <div className='popupContainer'>
        <div className="popup-boxd">
        <div className='newTrain'>
        <h2>Edit Role For Employee</h2>
        </div>
            
        <div className="input-group">
          <label htmlFor="name">Name </label>
          <input type="text" id="name" value={empTemp.employeesname} readOnly={true}/>                                                            
        </div>

        <div className="input-group">
          <label htmlFor="name">Email </label>
          <input type="text" id="name" value={empTemp.empemail} readOnly={true}/>                                                            
        </div>

        
        <div className="input-group">
          <label htmlFor="name">Role </label>
          <select id="name" onClick={(e)=>setTemprole(e.target.value)}>
            <option value={"manager"}>Manager</option>
            <option value={"leadership"}>Leader&nbsp;Ship</option>
            <option value={"user"}>User</option>
          </select>                                                            
        </div>

        <div><button type="submit" className="submit-btn" onClick={() => handleEditClick(empTemp)}>
          Submit
        </button>
        <button type="reset" className="cancel-btn" onClick={() => setIsOpenEdit(false)}>
          Cancel
        </button>
        </div>
      </div>
      </div>}
    </div>
    )
}

export default Employees