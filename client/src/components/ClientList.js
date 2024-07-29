import React, { useContext, useEffect } from 'react';
import ClientFinder from '../api/ClientFinder';
import { ClientContext } from '../context/ClientContext';
import updateIcon from "./updateicon.png"
import deleteIcon from "./deleteicon.png"
import { useNavigate } from 'react-router-dom';


const ClientList = () => {
  const { clients, setClient } = useContext(ClientContext);
  let navigate = useNavigate(); // Replaces useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ClientFinder.get("/");
        setClient(response.data);  // Adjust according to your actual API response structure
      } catch (err) {
        console.error('Failed to fetch client data:', err);
      }
    };

    fetchData();
  }, [setClient]);

  const handleDelete = async (client_id) => {
    try {
      const response = await ClientFinder.delete(`/${client_id}`);
      if (response.status === 200) {  // Check if the response status is OK
        setClient(clients.filter(client => client.client_id !== client_id));
        window.location.reload();
      } else {
        console.error('Failed to delete client:', response.status);
      }
    } catch (err) {
      console.error('Error deleting client:', err);
    }
  }

  const handleUpdate = (client_id) => {
    navigate(`/client/${client_id}`)
  }

  return (
    <div className="container">
      <table className="table table-hover">
        <thead className="table-active">
          <tr >
            <th scope="col">Client ID</th>
            <th scope="col">Client Name</th>
            <th scope="col">Branch ID</th>
            <th scope="col">Project Count</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.client_id}>
              <td>{client.client_id}</td>
              <td>{client.client_name}</td>
              <td>{client.branch_id}</td>
              <td>{client.project_count}</td>
              <td>
                <button onClick={() => handleUpdate(client.client_id)}>
                  <img src={updateIcon} alt="Update" style={{ width: '25px', height: '25px' }} />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(client.client_id)}>
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

export default ClientList;
