import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectFinder from "../api/ProjectFinder";

const UpdateProject = () => {
  const { project_id } = useParams();
  const navigate = useNavigate();
  const [clientID, setClientID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [dealSize, setDealSize] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await ProjectFinder.get(`/${project_id}`);
        if (response.data) {
          setClientID(response.data.client_id);
          setStartDate(formatDate(response.data.start_date));
          setEndDate(formatDate(response.data.end_date));
          setDescription(response.data.description);
          setDealSize(response.data.deal_size);
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };
    fetchProject();
  }, [project_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = await ProjectFinder.put(`/${project_id}`, {
        client_id: clientID,
        start_date: startDate,
        end_date: endDate,
        description,
        deal_size: dealSize
      });
      if (updatedProject.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to update the project:", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="clientID">Client ID</label>
          <input
            value={clientID}
            onChange={(e) => setClientID(e.target.value)}
            id="client_id"
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
          <label htmlFor="endDate">End Date YYYY-MM-DD</label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            id="end_date"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="description">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="dealSize">Deal Size</label>
          <input
            value={dealSize}
            onChange={(e) => setDealSize(e.target.value)}
            id="deal_size"
            className="form-control"
            type="text"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateProject;
