import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeFinder from "../api/EmployeeFinder";

const UpdateEmployee = () => {
  const { employee_id } = useParams();
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [branchID, setBranchID] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await EmployeeFinder.get(`/${employee_id}`);
        if (response.data) {
          setEmployeeName(response.data.employee_name);
          setStartDate(formatDate(response.data.start_date));
          setEmployeeEmail(response.data.employee_email);
          setBranchID(response.data.branch_id);
        }
      } catch (err) {
        console.error("Error fetching employee details:", err);
      }
    };
    fetchEmployee();
  }, [employee_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployee = await EmployeeFinder.put(`/${employee_id}`, {
        employee_name: employeeName,
        start_date: startDate,
        employee_email: employeeEmail,
        branch_id: branchID
      });
      if (updatedEmployee.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to update the employee:", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="employeeName">Employee Name</label>
          <input
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            id="employee_name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="startDate">Start Date YYYY-MM-DD</label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            id="start_date"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="employeeEmail">Employee Email</label>
          <input
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            id="employee_email"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="branchID">Branch ID</label>
          <input
            value={branchID}
            onChange={(e) => setBranchID(e.target.value)}
            id="branch_id"
            className="form-control"
            type="text"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
