import React, { useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Container } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

function createSubdivisionData(subdivision_name, location, insert_date, update_date, quantityVilla, status, project_id, villas) {
  return { subdivision_name, location, insert_date, update_date, quantityVilla, status, project_id, villas };
}

const sampleRows = [
  createSubdivisionData("Pine Valley", "North Ridge", "2022-03-02", "2022-04-12", 120, "Active", "123", []),
  createSubdivisionData("Oak Woodlands", "South Hill", "2022-05-15", "2022-06-17", 85, "Inactive", "456", []),
];

export default function SubdivisionTable() {
  const [rows, setRows] = useState(sampleRows);

  const handleClickOpen = () => {
   
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      
      <Box display="flex" justifyContent="flex-end" mb={6}>
        <Tooltip title="Add New Subdivision">
          <IconButton color="primary" onClick={handleClickOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <div style={{ padding: '12px', width: '100%' }}> 
      <Paper sx={{ width: 'auto', overflow: 'hidden', margin: 'auto' }}>
        <TableContainer>
          <Table aria-label="subdivision table" sx={{ minWidth: '750px', maxWidth: '100%' }}> 
          <TableHead>
            <TableRow>
              <TableCell > Name</TableCell>
              <TableCell align="left" >Location</TableCell>
              <TableCell align="left">Insert Date</TableCell>
              <TableCell align="left">Update Date</TableCell>
              <TableCell align="left">Quantity Villa</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Project ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{row.subdivision_name}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.insert_date}</TableCell>
                <TableCell align="left">{row.update_date}</TableCell>
                <TableCell align="left">{row.quantityVilla}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.project_id}</TableCell>
                <TableCell align="right">
                  <IconButton><EditIcon /></IconButton>
                  <IconButton><DeleteIcon /></IconButton>
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
