import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BranchFinder from "../api/BranchFinder"; // Ensure this import is correct

const UpdateBranch = () => {
  const { branch_id } = useParams();
  const navigate = useNavigate();
  const [branchName, setBranchName] = useState("");
  const [managerID, setManagerID] = useState("");

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await BranchFinder.get(`/${branch_id}`);
        if (response.data) {
          setBranchName(response.data.branch_name);
          setManagerID(response.data.manager_id);
        }
      } catch (err) {
        console.error("Error fetching branch details:", err);
      }
    };
    fetchBranch();
  }, [branch_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBranch = await BranchFinder.put(`/${branch_id}`, {
        branch_name: branchName,
        manager_id: managerID
      });
      if (updatedBranch.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to update the branch:", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="branchName">Branch Name</label>
          <input
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            id="branch_name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="managerID">Manager ID</label>
          <input
            value={managerID}
            onChange={(e) => setManagerID(e.target.value)}
            id="manager_id"
            className="form-control"
            type="text"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateBranch;
