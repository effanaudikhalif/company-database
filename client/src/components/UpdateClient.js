import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientFinder from "../api/ClientFinder";

const UpdateClient = () => {
  const { client_id } = useParams();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [branchID, setBranchID] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await ClientFinder.get(`/${client_id}`);
        if (response.data) {
          setClientName(response.data.client_name);
          setBranchID(response.data.branch_id);
        }
      } catch (err) {
        console.error("Error fetching client details:", err);
      }
    };
    fetchClient();
  }, [client_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedClient = await ClientFinder.put(`/${client_id}`, {
        client_name: clientName,
        branch_id: branchID
      });
      if (updatedClient.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to update the client:", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ paddingBottom: '20px' }}>
          <label htmlFor="clientName">Client Name</label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            id="client_name"
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

export default UpdateClient;
