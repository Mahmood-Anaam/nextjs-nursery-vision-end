'use client';

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {

  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to proceed?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={() => { onConfirm(); onClose(); }} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
