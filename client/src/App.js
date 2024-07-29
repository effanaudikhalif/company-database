import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import { BranchContextProvider } from './context/BranchContext';
import { EmployeeContextProvider } from './context/EmployeeContext';
import { ClientContextProvider } from './context/ClientContext';
import { ProjectContextProvider } from './context/ProjectContext';
import UpdatePageBranch from './routes/UpdatePageBranch';
import UpdatePageClient from './routes/UpdatePageClient';
import UpdatePageEmployee from './routes/UpdatePageEmployee';
import UpdatePageProject from './routes/UpdatePageProject';

const App = () => {
  return (
    <BranchContextProvider>
      <EmployeeContextProvider>
        <ClientContextProvider>
          <ProjectContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/branch/:branch_id" element={<UpdatePageBranch />} />
                <Route path="/employee/:employee_id" element={<UpdatePageEmployee />} />
                <Route path="/client/:client_id" element={<UpdatePageClient />} />
                <Route path="/project/:project_id" element={<UpdatePageProject />} />
              </Routes>
            </Router>
          </ProjectContextProvider>
        </ClientContextProvider>
      </EmployeeContextProvider>
    </BranchContextProvider>
  );
};

export default App;
