import React, { useState } from 'react';
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
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

function createSubdivisionData(subdivision_name, location, insert_date, update_date, quantityVilla, status, project_id) {
  return { subdivision_name, location, insert_date, update_date, quantityVilla, status, project_id };
}

const sampleRows = [
  createSubdivisionData("Pine Valley", "North Ridge", "2022-03-02", "2022-04-12", 120, "Active", "123"),
  createSubdivisionData("Oak Woodlands", "South Hill", "2022-05-15", "2022-06-17", 85, "Inactive", "456"),
];

export default function SubdivisionTable() {
  const [rows, setRows] = useState(sampleRows);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [newSubdivision, setNewSubdivision] = useState({
    name: '',
    location: '',
    insertDate: '',
    updateDate: '',
    quantityVilla: '',
    status: '',
    projectId: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (projectId) => {
    setRows(rows.filter(row => row.project_id !== projectId));
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event, prop) => {
    setNewSubdivision({
      ...newSubdivision,
      [prop]: event.target.value
    });
  };

  const handleChange = (prop) => (event) => {
    setNewSubdivision({ ...newSubdivision, [prop]: event.target.value });
  };

  const handleEditChange = (prop) => (event) => {
    setEditRowData({ ...editRowData, [prop]: event.target.value });
  };

  const handleAdd = () => {
    setRows([...rows, createSubdivisionData(
      newSubdivision.name,
      newSubdivision.location,
      newSubdivision.insertDate,
      newSubdivision.updateDate,
      newSubdivision.quantityVilla,
      newSubdivision.status,
      newSubdivision.projectId
    )]);
    handleClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const startEdit = (row) => {
    setEditRowId(row.project_id);
    setEditRowData({ ...row });
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setEditRowData({});
  };

  const saveEdit = () => {
    const updatedRows = rows.map(row => row.project_id === editRowId ? { ...editRowData } : row);
    setRows(updatedRows);
    cancelEdit();
  };

  const filteredRows = rows.filter(row =>
    row.subdivision_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render UI code follows...

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Subdivision</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subdivision Name"
            type="text"
            fullWidth
            value={newSubdivision.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            value={newSubdivision.location}
            onChange={handleChange('location')}
          />
          <TextField
            margin="dense"
            id="insertDate"
            label="Insert Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newSubdivision.insertDate}
            onChange={handleChange('insertDate')}
          />
          <TextField
            margin="dense"
            id="updateDate"
            label="Update Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newSubdivision.updateDate}
            onChange={handleChange('updateDate')}
          />
          <TextField
            margin="dense"
            id="quantityVilla"
            label="Quantity Villa"
            type="number"
            fullWidth
            value={newSubdivision.quantityVilla}
            onChange={handleChange('quantityVilla')}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={newSubdivision.status}
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
            value={newSubdivision.projectId}
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

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
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
        />
        <Tooltip title="Add New Subdivision">
          <IconButton color="primary" onClick={handleClickOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <div style={{ padding: '12px', width: '100%' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Insert Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.project_id}>
                  {editRowId === row.project_id ? (
                    // Editable cells for the row in edit mode
                    <>
                      <TableCell>
                        <TextField
                          value={editRowData.subdivision_name}
                          onChange={handleEditChange('subdivision_name')}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={editRowData.location}
                          onChange={handleEditChange('location')}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="date"
                          value={editRowData.insert_date}
                          onChange={handleEditChange('insert_date')}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="date"
                          value={editRowData.update_date}
                          onChange={handleEditChange('update_date')}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={editRowData.quantityVilla}
                          onChange={handleEditChange('quantityVilla')}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={editRowData.status}
                          onChange={handleEditChange('status')}
                          size="small"
                          displayEmpty
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {editRowData.project_id}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={saveEdit}><SaveIcon /></IconButton>
                        <IconButton onClick={cancelEdit}><CancelIcon /></IconButton>
                      </TableCell>
                    </>
                  ) : (
                    // Non-editable row display
                    <>
                      <TableCell>{row.subdivision_name}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.insert_date}</TableCell>
                      <TableCell>{row.update_date}</TableCell>
                      <TableCell>{row.quantityVilla}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.project_id}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => startEdit(row)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(row.project_id)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </>
                  )}
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