import React, { useContext, useState } from "react";
import ClientFinder from "../api/ClientFinder";
import { ClientContext } from "../context/ClientContext";


const AddClient = () => {
  const {addClient} = useContext(ClientContext)
  const [clientName, setClientName] = useState("")
  const [branchID, setBranchID] = useState("")

  const handleSubmit = async() => {
    try {
      const response = await ClientFinder.post("/", {
        client_name: clientName,
        branch_id: branchID
      })
      addClient(response.data.data.client);  // Adjust depending on actual API response structure
      window.location.reload();
    } catch (err){
    }
  }

  return (
    <div className="mb-4 container">
      <form action="">
        <div className="form-row d-flex align-items-center justify-content-center padding;">
          <div className="col-auto mx-2">
            <input value={clientName} onChange={e => setClientName(e.target.value)} onChangetype="text" className="form-control" placeholder="Client Name" />
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

export default AddClient;
