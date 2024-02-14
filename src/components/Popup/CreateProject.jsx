// CreateProjectDialog.js

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const CreateProjectDialog = ({ open, handleClose, handleInputChange, setProjects, projects }) => {
  const [newProject, setNewProject] = useState({
    project_name: '',
    start_date: '',
    end_date: '',
    description: '',
    status: '',
  });

  const handleChange = (prop) => (event) => {
    setNewProject({ ...newProject, [prop]: event.target.value });
  };

//   const handleAdd = () => {
//     handleProjectAdd(newProject);
//     handleClose();
//   };

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
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={newProject.project_name}
            onChange={handleChange('project_name')}
          />
          <TextField
            margin="dense"
            id="start_date"
            label="Start Date"
            type="text"
            fullWidth
            value={newProject.start_date}
            onChange={handleChange('start_date')}
          />
          <TextField
            margin="dense"
            id="end_date"
            label="End Date"
            type="text"
            fullWidth
            value={newProject.end_date}
            onChange={handleChange('end_date')}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={newProject.description}
            onChange={handleChange('description')}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={newProject.status}
              onChange={handleInputChange}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            id="projectId"
            label="Project ID"
            type="text"
            fullWidth
            value={newProject.projectId}
            onChange={handleChange('projectId')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default CreateProjectDialog;
