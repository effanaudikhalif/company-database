import React, { useContext, useState } from "react";
import BranchFinder from "../api/BranchFinder";
import { BranchContext } from "../context/BranchContext";


const AddBranch = () => {
  const {addBranch} = useContext(BranchContext)
  const [branchName, setBranchName] = useState("")
  const [managerID, setManagerID] = useState("")

  const handleSubmit = async() => {
    try {
      const response = await BranchFinder.post("/", {
        branch_name: branchName,
        manager_id: managerID ? managerID : null, //if empty, then it will be set as null
      })
      addBranch(response.data.data.branch);  // Adjust depending on actual API response structure
      window.location.reload();
    } catch (err){
    }
  }


  return (
    <div className="mb-4 container">
      <form action="">
        <div className="form-row d-flex align-items-center justify-content-center padding;">
          <div className="col-auto mx-2">
            <input value={branchName} onChange={e => setBranchName(e.target.value)} onChangetype="text" className="form-control" placeholder="Branch Name" />
          </div>
          <div className="col-auto mx-2">
            <input value={managerID} onChange={e => setManagerID(e.target.value)} className="form-control" type="text" placeholder="Manager ID" />
          </div>          
          <div className="col-auto mx-2">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBranch;
