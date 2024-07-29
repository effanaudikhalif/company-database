import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProject] = useState([]);

  const addProject = (project) => {
    setProject([...projects, project])
  }

  return (
    <ProjectContext.Provider value={{ projects, setProject, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
