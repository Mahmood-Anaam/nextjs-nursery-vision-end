'use client';

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from '@mui/material';
import { IconTrash, IconAdd } from '@tabler/icons-react';
import ConfirmationDialog from './ConfirmationDialog';

const PhotosGrid = ({ child }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPhotos, setNewPhotos] = useState([]);
  const [openAddPhotoDialog, setOpenAddPhotoDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    const response = await fetch(`/api/database/crud/facePhotos?childId=${child.id}`);
    const data = await response.json();
    setPhotos(data);
    setLoading(false);
  };

  const handleFileChange = (e) => {
    setNewPhotos(Array.from(e.target.files));
  };

  const handleDeletePhoto = (photo) => {
    setConfirmAction(() => () => deletePhoto(photo.id));
    setOpenConfirmDialog(true);
  };

  const deletePhoto = async (photoId) => {
    await fetch(`/api/database/crud/facePhotos/${photoId}`, { method: 'DELETE' });
    fetchPhotos();
  };

  const handleUploadPhotos = async () => {
    const formData = new FormData();
    newPhotos.forEach((photo) => {
      formData.append('photos', photo);
    });
    await fetch(`/api/database/crud/facePhotos`, {
      method: 'POST',
      body: formData,
    });
    fetchPhotos();
    setOpenAddPhotoDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'photo', headerName: 'Photo', width: 250, renderCell: (params) => (
      <img src={params.value} alt="Child Photo" style={{ width: '100%', height: 'auto' }} />
    ) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeletePhoto(params.row)}>
          <IconTrash />
        </IconButton>
      ),
    },
  ];

  return (
    <Box mt={4}>
      <Button variant="contained" startIcon={<IconAdd />} onClick={() => setOpenAddPhotoDialog(true)}>
        Add Photos
      </Button>
      {loading ? (
        <LinearProgress />
      ) : (
        <DataGrid
          rows={photos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
        />
      )}
      <Dialog open={openAddPhotoDialog} onClose={() => setOpenAddPhotoDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Photos</DialogTitle>
        <DialogContent>
          <input type="file" multiple onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddPhotoDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleUploadPhotos} color="primary">Upload</Button>
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

export default PhotosGrid;
