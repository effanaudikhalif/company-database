import React, { useContext, useState } from "react";
import EmployeeFinder from "../api/EmployeeFinder";
import { EmployeeContext } from "../context/EmployeeContext";


const AddEmployee = () => {
  const {addEmployee} = useContext(EmployeeContext)
  const [employeeName, setEmployeeName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [employeeEmail, setEmployeeEmail] = useState("")
  const [branchID, setBranchID] = useState("")


  const handleSubmit = async() => {
    try {
      const response = await EmployeeFinder.post("/", {
        employee_name: employeeName,
        start_date: startDate,
        employee_email: employeeEmail,
        branch_id: branchID
      })
      addEmployee(response.data.data.employee)
      window.location.reload();
    } catch (err){
    }
  }

  return (
    <div className="mb-4 container">
      <form action="">
        <div className="form-row d-flex align-items-center justify-content-center padding;">
          <div className="col-auto mx-2">
            <input value={employeeName} onChange={e => setEmployeeName(e.target.value)} onChangetype="text" className="form-control" placeholder="Employee Name" />
          </div>
          <div className="col-2 mx-2">
            <input value={startDate} onChange={e => setStartDate(e.target.value)} className="form-control" type="text" placeholder="Start Date YYYY-MM-DD" />
          </div>
          <div className="col-auto mx-2">
            <input value={employeeEmail} onChange={e => setEmployeeEmail(e.target.value)} className="form-control" type="text" placeholder="Employee Email" />
          </div>
          <div className="col-auto mx-2">
            <input value={branchID} onChange={e => setBranchID(e.target.value)} className="form-control" type="text" placeholder="Branch ID" />
          </div>
          <div className="col-auto mx-2">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
