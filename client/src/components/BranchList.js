import React, { useContext, useEffect } from "react";
import BranchFinder from "../api/BranchFinder";
import { BranchContext } from "../context/BranchContext";
import updateIcon from "./updateicon.png"
import deleteIcon from "./deleteicon.png"
import { useNavigate } from 'react-router-dom';

const BranchList = () => {
  const { branches, setBranch } = useContext(BranchContext);
  let navigate = useNavigate(); // Replaces useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BranchFinder.get("/");
        setBranch(response.data); // Ensure this matches your API response structure
      } catch (err) {
        console.error("Failed to fetch branch data:", err);
      }
    };

    fetchData();
  }, [setBranch]);

  const handleDelete = async (branch_id) => {
    try {
      const response = await BranchFinder.delete(`/${branch_id}`);
      if (response.status === 200) {  // Check if the response status is OK
        setBranch(branches.filter(branch => branch.branch_id !== branch_id));
        window.location.reload();
      } else {
        console.error('Failed to delete branch:', response.status);
      }
    } catch (err) {
      console.error('Error deleting branch:', err);
    }
  }

  const handleUpdate = (branch_id) => {
    navigate(`/branch/${branch_id}`)
  }

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr className="table-active">
            <th scope="col">Branch ID</th>
            <th scope="col">Branch Name</th>
            <th scope="col">Manager ID</th>
            <th scope="col">Employee Count</th>
            <th scope="col">Client Count</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.branch_id}>
              <td>{branch.branch_id}</td>
              <td>{branch.branch_name}</td>
              <td>{branch.manager_id}</td>
              <td>{branch.employee_count}</td>
              <td>{branch.client_count}</td>
              <td>
                <button onClick={() => handleUpdate(branch.branch_id)}>
                  <img src={updateIcon} alt="Update" style={{ width: '25px', height: '25px' }} />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(branch.branch_id)}>
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

export default BranchList;
