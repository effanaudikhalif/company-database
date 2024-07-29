import React, { useContext, useState } from "react";
import ProjectFinder from "../api/ProjectFinder";
import { ProjectContext } from "../context/ProjectContext";


const AddProject = () => {
  const {addProject} = useContext(ProjectContext)
  const [clientID, setClientID] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [dealSize, setDealSize] = useState("")


  const handleSubmit = async() => {
    try {
      const response = await ProjectFinder.post("/", {
        client_id: clientID,
        start_date: startDate,
        end_date: endDate,
        description,
        deal_size: dealSize
      })
      addProject(response.data.data.client)
      window.location.reload();
    } catch (err){
    }
  }

  return (
    <div className="mb-4 container">
      <form action="">
        <div className="form-row d-flex align-items-center justify-content-center padding;">
          <div className="col-auto mx-2">
            <input value={clientID} onChange={e => setClientID(e.target.value)} onChangetype="text" className="form-control" placeholder="Client ID" />
          </div>
          <div className="col-2 mx-2">
            <input value={startDate} onChange={e => setStartDate(e.target.value)} className="form-control" type="text" placeholder="Start Date YYYY-MM-DD" />
          </div>
          <div className="col-2 mx-2">
            <input value={endDate} onChange={e => setEndDate(e.target.value)} className="form-control" type="text" placeholder="End Date YYYY-MM-DD" />
          </div>
          <div className="col-auto mx-2">
            <input value={description} onChange={e => setDescription(e.target.value)} className="form-control" type="text" placeholder="Description" />
          </div>
          <div className="col-auto mx-2">
            <input value={dealSize} onChange={e => setDealSize(e.target.value)} className="form-control" type="text" placeholder="Deal Size" />
          </div>
          <div className="col-auto mx-2">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
