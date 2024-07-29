import React, { useContext, useEffect } from 'react';
import ProjectFinder from '../api/ProjectFinder';
import { ProjectContext } from '../context/ProjectContext';
import updateIcon from "./updateicon.png"
import deleteIcon from "./deleteicon.png"
import { useNavigate } from 'react-router-dom';


const ProjectList = () => {
  const { projects, setProject } = useContext(ProjectContext);
  let navigate = useNavigate(); // Replaces useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectFinder.get("/");
        setProject(response.data);  // Adjust based on actual API response structure
      } catch (err) {
        console.error('Failed to fetch project data:', err);
      }
    };

    fetchData();
  }, [setProject]);

  const handleDelete = async (project_id) => {
    try {
      const response = await ProjectFinder.delete(`/${project_id}`);
      if (response.status === 200) {  // Check if the response status is OK
        setProject(projects.filter(project => project.project_id !== project_id));
        window.location.reload();
      } else {
        console.error('Failed to delete employee:', response.status);
      }
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  }

  const handleUpdate = (project_id) => {
    navigate(`/project/${project_id}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr className="table-active">
            <th scope="col">Project ID</th>
            <th scope="col">Client ID</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Description</th>
            <th scope="col">Deal Size</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.project_id}>
              <td>{project.project_id}</td>
              <td>{project.client_id}</td>
              <td>{formatDate(project.start_date)}</td>
              <td>{formatDate(project.end_date)}</td>
              <td>{project.description}</td>
              <td>{project.deal_size}</td>
              <td>
                <button onClick={() => handleUpdate(project.project_id)}>
                  <img src={updateIcon} alt="Update" style={{ width: '25px', height: '25px' }} />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(project.project_id)}>
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

export default ProjectList;
