import React from "react"
import BranchList from "../components/BranchList"
import EmployeeList from "../components/EmployeeList"
import ClientList from "../components/ClientList"
import ProjectList from "../components/ProjectList"
import AddBranch from "../components/AddBranch"
import AddEmployee from "../components/AddEmployee"
import AddClient from "../components/AddClient"
import AddProject from "../components/AddProject"

const Home = () => {
  return (
    <div className="home-layout">
      <div className="branch">
        
        <h1 className="text-title">Branch</h1>
        <BranchList />
        <AddBranch />
      </div>
      <div className="employee">
        <h1 className="text-title">Employee</h1>
        <EmployeeList />
        <AddEmployee />
      </div>
      <div className="client">
        <h1 className="text-title">Client</h1>
        <ClientList />
        <AddClient />
      </div>
      <div className="project">
        <h1 className="text-title">Project</h1>
        <ProjectList />
        <AddProject />
      </div>
    </div>
  )
}

export default Home