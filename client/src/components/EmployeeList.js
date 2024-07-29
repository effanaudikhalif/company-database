import React, { useContext, useEffect } from 'react'
import EmployeeFinder from '../api/EmployeeFinder'
import { EmployeeContext } from '../context/EmployeeContext'
import updateIcon from "./updateicon.png"
import deleteIcon from "./deleteicon.png"
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const { employees, setEmployee } = useContext(EmployeeContext);
  let navigate = useNavigate(); // Replaces useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeFinder.get("/");
        setEmployee(response.data);  // Adjust according to your actual API response structure
      } catch (err) {
        console.error('Failed to fetch employee data:', err);
      }
    };

    fetchData();
  }, [setEmployee]);

  const handleDelete = async (employee_id) => {
    try {
      const response = await EmployeeFinder.delete(`/${employee_id}`);
      if (response.status === 200) {  // Check if the response status is OK
        setEmployee(employees.filter(employee => employee.employee_id !== employee_id));
        window.location.reload();
      } else {
        console.error('Failed to delete employee:', response.status);
      }
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  }

  const handleUpdate = (employee_id) => {
    navigate(`/employee/${employee_id}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };
  
  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr className="table-active">
            <th scope="col">Employee ID</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">Employee Email</th>
            <th scope="col">Branch ID</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.employee_name}</td>
              <td>{formatDate(employee.start_date)}</td>
              <td>{employee.employee_email}</td>
              <td>{employee.branch_id}</td>
              <td>
                <button onClick={() => handleUpdate(employee.employee_id)}>
                  <img src={updateIcon} alt="Update" style={{ width: '25px', height: '25px' }} />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(employee.employee_id)}>
                  <img src={deleteIcon} alt="Delete" style={{ width: '25px', height: '25px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
