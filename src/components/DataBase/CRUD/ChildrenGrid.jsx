'use client';

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress } from '@mui/material';
import PhotosGrid from './PhotosGrid';
import { IconEdit, IconTrash, IconView } from '@tabler/icons-react';
import ConfirmationDialog from './ConfirmationDialog';

const ChildrenGrid = ({ parent }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(null);
  const [openPhotosDialog, setOpenPhotosDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    setLoading(true);
    const response = await fetch(`/api/database/crud/children?parentId=${parent.id}`);
    const data = await response.json();
    setChildren(data);
    setLoading(false);
  };

  const handleShowPhotos = (child) => {
    setSelectedChild(child);
    setOpenPhotosDialog(true);
  };

  const handleEditChild = (child) => {
    setSelectedChild(child);
    setOpenEditDialog(true);
  };

  const handleDeleteChild = (child) => {
    setSelectedChild(child);
    setConfirmAction(() => () => deleteChild(child.id));
    setOpenConfirmDialog(true);
  };

  const deleteChild = async (id) => {
    await fetch(`/api/database/crud/children/${id}`, { method: 'DELETE' });
    fetchChildren();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'checkIn', headerName: 'Check In', width: 150 },
    { field: 'checkOut', headerName: 'Check Out', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleShowPhotos(params.row)}>
            <IconView />
          </IconButton>
          <IconButton onClick={() => handleEditChild(params.row)}>
            <IconEdit />
          </IconButton>
          <IconButton onClick={() => handleDeleteChild(params.row)}>
            <IconTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box mt={4}>
      {loading ? (
        <LinearProgress />
      ) : (
        <DataGrid
          rows={children}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
        />
      )}
      <Dialog open={openPhotosDialog} onClose={() => setOpenPhotosDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Photos of {selectedChild?.name}</DialogTitle>
        <DialogContent>
          {selectedChild && <PhotosGrid child={selectedChild} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPhotosDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={confirmAction}
      />
    </Box>
  );
};

export default ChildrenGrid;
