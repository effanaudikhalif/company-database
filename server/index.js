const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4700;

/* EMPLOYEE ROUTES */

//create a employee

app.post("/employee", async (req, res) => {
  try {
    const { employee_name, start_date, employee_email, branch_id } = req.body;
    const newEmployee = await pool.query(
      "INSERT INTO employee (employee_name, start_date, employee_email, branch_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [employee_name, start_date, employee_email, branch_id]
    );
    res.json(newEmployee.rows);
  } catch (err) {
    console.error("Failed to insert new employee:", err.message);
    res.status(500).send(err.message);
  }
});

//get all employees

app.get("/employee", async(req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employee ORDER BY employee_id ASC");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error("Failed to get all employees:", err.message);
    res.status(500).send(err.message);
  }
})

//get an employee

app.get("/employee/:employee_id", async(req, res) => {
  try {
    const {employee_id} = req.params;
    const employee = await pool.query("SELECT * FROM employee WHERE employee_id = $1", [employee_id]);

    res.json(employee.rows[0]); // just one row for an employee
  } catch (err) { 
    console.error("Failed to get employee:", err.message);
    res.status(500).send(err.message);
  }
})

//update an employee

app.put("/employee/:employee_id", async(req, res) => {
  try {
    const {employee_id} = req.params;
    const {employee_name, start_date, employee_email, branch_id} = req.body;
    const updateEmployee = await pool.query(
      "UPDATE employee SET employee_name = $1, start_date = $2, employee_email = $3, branch_id = $4 WHERE employee_id = $5", 
      [employee_name, start_date, employee_email, branch_id, employee_id]);
    res.json("Employee was updated!")
  } catch (err) { 
    console.error("Failed to update employee:", err.message);
    res.status(500).send(err.message);
  }
})

//delete an employee

app.delete("/employee/:employee_id", async (req, res) => {
  try {
    const {employee_id} = req.params;
    const deleteEmployee = await pool.query("DELETE FROM employee WHERE employee_id = $1", [employee_id]);

    res.json("Employee was deleted");
  } catch (err) {
    console.error("Failed to delete employee:", err.message);
    res.status(500).send(err.message);
  }
})

/* BRANCH ROUTES */

//create a branch

app.post("/branch", async (req, res) => {
  try {
    const { branch_name, manager_id } = req.body;
    const newBranch = await pool.query(
      "INSERT INTO branch (branch_name, manager_id) VALUES ($1, $2) RETURNING *",
      [branch_name, manager_id]
    );
    res.json(newBranch.rows);
  } catch (err) {
    console.error("Failed to insert new branch:", err.message);
    res.status(500).send(err.message);
  }
});

//get all branches

app.get("/branch", async(req, res) => {
  try {
    const allBranch = await pool.query("SELECT * FROM branch ORDER BY branch_id ASC");
    res.json(allBranch.rows);
  } catch (err) {
    console.error("Failed to get all branches:", err.message);
    res.status(500).send(err.message);
  }
})

//get a branch

app.get("/branch/:branch_id", async(req, res) => {
  try {
    const {branch_id} = req.params;
    const branch = await pool.query("SELECT * FROM branch WHERE branch_id = $1", [branch_id]);

    res.json(branch.rows[0]); 
  } catch (err) { 
    console.error("Failed to get branch:", err.message);
    res.status(500).send(err.message);
  }
})

//update an branch

app.put("/branch/:branch_id", async(req, res) => {
  try {
    const {branch_id} = req.params;
    const {branch_name, manager_id} = req.body;
    const updateEmployee = await pool.query(
      "UPDATE branch SET branch_name = $1, manager_id = $2 WHERE branch_id = $3", 
      [branch_name, manager_id, branch_id]);
    res.json("Branch was updated!")
  } catch (err) { 
    console.error("Failed to update branch:", err.message);
    res.status(500).send(err.message);
  }
})

//delete a branch

app.delete("/branch/:branch_id", async (req, res) => {
  try {
    const {branch_id} = req.params;
    const deleteBranch = await pool.query("DELETE FROM branch WHERE branch_id = $1", [branch_id]);

    res.json("Branch was deleted");
  } catch (err) {
    console.error("Failed to delete branch:", err.message);
    res.status(500).send(err.message);
  }
})

/* CLIENT ROUTES */

//create a client

app.post("/client", async (req, res) => {
  try {
    const {client_name, branch_id} = req.body;
    const newClient = await pool.query(
      "INSERT INTO client (client_name, branch_id) VALUES ($1, $2) RETURNING *",
      [client_name, branch_id]
    );
    res.json(newClient.rows);
  } catch (err) {
    console.error("Failed to insert new client:", err.message);
    res.status(500).send(err.message);
  }
});

//get all clients

app.get("/client", async(req, res) => {
  try {
    const allClient = await pool.query("SELECT * FROM client ORDER BY client_id ASC");
    res.json(allClient.rows);
  } catch (err) {
    console.error("Failed to get all clients:", err.message);
    res.status(500).send(err.message);
  }
})

//get a client

app.get("/client/:client_id", async(req, res) => {
  try {
    const {client_id} = req.params;
    const client = await pool.query("SELECT * FROM client WHERE client_id = $1", [client_id]);

    res.json(client.rows[0]); 
  } catch (err) { 
    console.error("Failed to get client:", err.message);
    res.status(500).send(err.message);
  }
})

//update a client

app.put("/client/:client_id", async(req, res) => {
  try {
    const {client_id} = req.params;
    const {client_name, branch_id} = req.body;
    const updateClient = await pool.query(
      "UPDATE client SET client_name = $1, branch_id = $2 WHERE client_id = $3", 
      [client_name, branch_id, client_id]);
    res.json("Client was updated!")
  } catch (err) { 
    console.error("Failed to update client:", err.message);
    res.status(500).send(err.message);
  }
})

//delete a client

app.delete("/client/:client_id", async (req, res) => {
  try {
    const {client_id} = req.params;
    const deleteBranch = await pool.query("DELETE FROM client WHERE client_id = $1", [client_id]);

    res.json("Client was deleted");
  } catch (err) {
    console.error("Failed to delete client:", err.message);
    res.status(500).send(err.message);
  }
})

/* PROJECT ROUTES */

//create a project

app.post("/project", async (req, res) => {
  try {
    const {client_id, manager_id, branch_id, start_date, end_date, description, deal_size} = req.body;
    const newProject = await pool.query(
      "INSERT INTO project (client_id, start_date, end_date, description, deal_size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [client_id, start_date, end_date, description, deal_size]
    );
    res.json(newProject.rows);
  } catch (err) {
    console.error("Failed to insert new project:", err.message);
    res.status(500).send(err.message);
  }
});

//get all project

app.get("/project", async(req, res) => {
  try {
    const allProject = await pool.query("SELECT * FROM project ORDER BY project_id ASC");
    res.json(allProject.rows);
  } catch (err) {
    console.error("Failed to get all projects:", err.message);
    res.status(500).send(err.message);
  }
})

//get a project

app.get("/project/:project_id", async(req, res) => {
  try {
    const {project_id} = req.params;
    const project = await pool.query("SELECT * FROM project WHERE project_id = $1", [project_id]);

    res.json(project.rows[0]); 
  } catch (err) { 
    console.error("Failed to get project:", err.message);
    res.status(500).send(err.message);
  }
})

//update a project

app.put("/project/:project_id", async(req, res) => {
  try {
    const {project_id} = req.params;
    const {client_id, start_date, end_date, description, deal_size} = req.body;
    const updateProject = await pool.query(
      "UPDATE project SET client_id = $1, start_date = $2, end_date = $3, description = $4, deal_size = $5 WHERE project_id = $6", 
      [client_id, start_date, end_date, description, deal_size, project_id]);
    res.json("Project was updated!")
  } catch (err) { 
    console.error("Failed to update project:", err.message);
    res.status(500).send(err.message);
  }
})

//delete a project

app.delete("/project/:project_id", async (req, res) => {
  try {
    const {project_id} = req.params;
    const deleteProject = await pool.query("DELETE FROM project WHERE project_id = $1", [project_id]);

    res.json("Project was deleted");
  } catch (err) {
    console.error("Failed to delete project:", err.message);
    res.status(500).send(err.message);
  }
})

app.listen(port, () => {
  console.log("server has started on port 4700");
});

