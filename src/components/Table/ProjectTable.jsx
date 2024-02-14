import * as React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Container,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box
} from "@mui/material";
import "./Table.css";
import EditProjectDialog from "../Popup/EditProject";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useState, useEffect } from "react";
import CreateProjectDialog from "../Popup/CreateProject";
// import { ObjectId } from "mongodb"; 

function createProjectData(_id, project_name, start_date, end_date, status, description, Projects, Project_id) {
  return { _id, project_name, start_date, end_date, status, description, Projects, Project_id };
}


export default function ProjectTable() {
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    project_name: '',
    start_date: '',
    end_date: '',
    description: '',
    status: '',
  });
  const [editProject, setEditProject] = useState(null); // State cho dự án đang chỉnh sửa
  const [openEditDialog, setOpenEditDialog] = useState(false); // State để mở và đóng dialog chỉnh sửa


  useEffect(() => {
    // Fetch projects on component mount
    fetchProjects();
    // handleSaveEdit();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      const response = await fetch("http://localhost:5000/api/v1/projects/", {
        headers: {
          'Authorization': `Bearer ${token}`, // Thêm token vào header
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setProjects(Array.isArray(data.result) ? data.result : []);
      } else {
        console.error("Failed to fetch projects" + response.status);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/v1/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.ok) {
        // Update the projects list after deletion
        fetchProjects();
        console.log("Project deleted successfully");
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // const handleSaveEdit = async () => {
  //   if (!editProject) {
  //     debugger;
  //     console.error("No project selected for update");
  //     return;
  //   }else{
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await fetch(`http://localhost:5000/api/v1/projects/${editProject._id}`, {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`, 
  //         },
  //         body: JSON.stringify(editProject),
  //       });

  //     console.log('response',response);

  //       if (response.ok) {
  //         fetchProjects();
  //         console.log("Project updated successfully");
  //       } else {
  //         console.error("Failed to update project");
  //       }
  //     } catch (error) {
  //       console.error("Error updating project:", error);
  //     }
  //   }


  //   handleCloseEditDialog();
  // };
  
  const handleUpdate = async () => {
    console.log('editProject', editProject);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/v1/projects/${editProject._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editProject._id),
      });
      if (response.ok) {
        // Update the projects list after deletion
        fetchProjects();
        console.log("Project update successfully");
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
    handleCloseEditDialog();
  };


  const handleOpenEditDialog = (project) => {
    setEditProject(project);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditProject(null);
  };


  const handleChange = (prop) => (event) => {
    setNewProject({ ...newProject, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event, prop) => {
    setNewProject({
      ...newProject,
      [prop]: event.target.value
    });
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };


  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProject), // Send the new project data
      });
  
      if (response.ok) {
        const addedProject = await response.json();
        setProjects([...projects, addedProject]); // Update the state
        console.log("Project added successfully");
      } else {
        console.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
    handleClose();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <h3>Project List</h3>

      <CreateProjectDialog
      open={openDialog}
      handleClose={() => setOpenDialog(false)}
      handleProjectAdd={handleAdd}
    />

      <Box display="flex" justifyContent="flex-end" mb={2}>
        {/* <TextField
          id="search-field"
          label="Search"
          type="search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 4 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
        <Tooltip title="Add New Subdivision">
          <IconButton color="primary" onClick={handleClickOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Dialog chỉnh sửa dự án */}
      <EditProjectDialog
        editProject={editProject}
        setEditProject={setEditProject}
        openEditDialog={openEditDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        handleUpdate={handleUpdate}
      />


      <div style={{ padding: '12px', width: '100%' }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell align="left">Project Name</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="left">Description</TableCell>
                  {/* <TableCell align="left">Projects</TableCell> */}
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {Array.isArray(projects) && projects.map((project, index) => (
                  <TableRow key={project._id}>
                    <TableCell>{index + 1}</TableCell>
                    {/* <TableCell component="th" scope="row">
                    {project._id || 'N/A'}
                  </TableCell> */}
                    <TableCell align="left">{project.project_name || 'N/A'}</TableCell>
                    <TableCell align="left">{project.start_date || 'N/A'}</TableCell>
                    <TableCell align="left">{project.end_date || 'N/A'}</TableCell>
                    <TableCell align="left">{project.description || 'N/A'}</TableCell>
                    {/* <TableCell align="left">{project.Projects || 'N/A'}</TableCell> */}
                    <TableCell align="left">{project.status || 'N/A'}</TableCell>
                    <TableCell align="left">
                      <button onClick={() => handleDelete(project._id)}>Delete</button>
                      <button onClick={() => handleOpenEditDialog(project)}>Update</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Container>
  );
}
