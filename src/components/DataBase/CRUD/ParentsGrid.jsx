"use client";

import React, { useState, useEffect, useReducer } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  TextField,
  MenuItem,
} from "@mui/material";
import { IconEdit, IconTrash, IconEye, IconPlus } from "@tabler/icons-react";
import ChildrenGrid from "./ChildrenGrid";
import ConfirmationDialog from "./ConfirmationDialog";
import SnackBar from "../../SnackBar";


const initialState = {
  parents: [],
  loading: true,
  selectedParent: null,
  openChildrenDialog: false,
  openEditDialog: false,
  openConfirmDialog: false,
  confirmAction: null,
  pageSize: 5,
  snackbar: { open: false, message: "", severity: "success" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PARENTS":
      return { ...state, parents: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SELECTED_PARENT":
      return { ...state, selectedParent: action.payload };
    case "TOGGLE_CHILDREN_DIALOG":
      return { ...state, openChildrenDialog: !state.openChildrenDialog };
    case "TOGGLE_EDIT_DIALOG":
      return { ...state, openEditDialog: !state.openEditDialog };
    case "TOGGLE_CONFIRM_DIALOG":
      return { ...state, openConfirmDialog: !state.openConfirmDialog };
    case "SET_CONFIRM_ACTION":
      return { ...state, confirmAction: action.payload };
    case "SET_SNACKBAR":
      return { ...state, snackbar: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    default:
      return state;
  }
};

const ParentsGrid = () => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch("/api/database/crud/parents",{
      cache: 'no-store'
    });
    const data = await response.json();
    dispatch({ type: "SET_PARENTS", payload: data });
  };

  const handleShowChildren = (parent) => {
    dispatch({ type: "SET_SELECTED_PARENT", payload: parent });
    dispatch({ type: "TOGGLE_CHILDREN_DIALOG" });
  };

  const handleEditParent = (parent) => {
    dispatch({ type: "SET_SELECTED_PARENT", payload: parent });
    dispatch({ type: "TOGGLE_EDIT_DIALOG" });
  };

  const handleAddParent = () => {
    dispatch({ type: "SET_SELECTED_PARENT", payload: { email: "", name: "", phone: "", gender: "", address: "" } });
    dispatch({ type: "TOGGLE_EDIT_DIALOG" });
  };

  const handleDeleteParent = (parent) => {
    dispatch({ type: "SET_SELECTED_PARENT", payload: parent });
    dispatch({
      type: "SET_CONFIRM_ACTION",
      payload: () => {deleteParent(parent.id)},
    });
    dispatch({ type: "TOGGLE_CONFIRM_DIALOG" });
  };

  const deleteParent = async (id) => {
 
    const response = await fetch(`/api/database/crud/parents/${id}`, { method: "DELETE" });
    fetchParents();
    dispatch({
      type: "SET_SNACKBAR",
      payload: {
        open: true,
        message: "Parent deleted successfully",
        severity: "success",
      },
    });
  };

  const handleSaveParent = async () => {

    const method = state.selectedParent.id ? "PUT" : "POST";
    const url = state.selectedParent.id
      ? `/api/database/crud/parents/${state.selectedParent.id}`
      : "/api/database/crud/parents";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.selectedParent),
    });
    fetchParents();
    dispatch({ type: "TOGGLE_EDIT_DIALOG" });
    dispatch({
      type: "SET_SNACKBAR",
      payload: {
        open: true,
        message: `Parent ${
          state.selectedParent.id ? "updated" : "created"
        } successfully`,
        severity: "success",
      },
    });

 


  };

  const handleCloseSnackbar = () => {
    dispatch({
      type: "SET_SNACKBAR",
      payload: { ...state.snackbar, open: false },
    });
  };

  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 90 },
    { field: "email", headerName: "Email", type: "string", width: 150 },
    { field: "name", headerName: "Name", type: "string", width: 150 },
    { field: "phone", headerName: "Phone", type: "string", width: 150 },
    { field: "gender", headerName: "Gender", type: "string", width: 100 },
    { field: "address", headerName: "Address", type: "string", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleShowChildren(params.row)}>
            <IconEye />
          </IconButton>
          <IconButton onClick={() => handleEditParent(params.row)}>
            <IconEdit />
          </IconButton>
          <IconButton onClick={() => handleDeleteParent(params.row)}>
            <IconTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
          borderRight: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-virtualScrollerRenderZone": {
          "& .MuiDataGrid-row": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-toolbarContainer": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <div style={{ height: 600, width: "100%" }}>
      <Button
          variant="contained"
          color="primary"
          startIcon={<IconPlus />}
          onClick={handleAddParent}
          style={{ marginTop: 10 }}
        >
          Add Parent
        </Button>
        <DataGrid
          rows={state.parents}
          columns={columns}
          pageSize={state.pageSize}
          onPageSizeChange={(newPageSize) =>
            dispatch({ type: "SET_PAGE_SIZE", payload: newPageSize })
          }
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
          loading={state.loading}
          slots={{
            toolbar: GridToolbar,
            
            
          }}
          
        />
        {/* <Button
          variant="contained"
          color="primary"
          startIcon={<IconPlus />}
          onClick={handleAddParent}
          style={{ marginTop: 10 }}
        >
          Add Parent
        </Button> */}
      </div>
      <Dialog
        open={state.openChildrenDialog}
        onClose={() => dispatch({ type: "TOGGLE_CHILDREN_DIALOG" })}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Children of {state.selectedParent?.name}</DialogTitle>
        <DialogContent>
          {state.selectedParent && (
            <ChildrenGrid parent={state.selectedParent} />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch({ type: "TOGGLE_CHILDREN_DIALOG" })}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={state.openEditDialog}
        onClose={() => dispatch({ type: "TOGGLE_EDIT_DIALOG" })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {state.selectedParent?.id ? "Edit Parent" : "Add Parent"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            value={state.selectedParent?.email || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_PARENT",
                payload: { ...state.selectedParent, email: e.target.value },
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={state.selectedParent?.name || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_PARENT",
                payload: { ...state.selectedParent, name: e.target.value },
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={state.selectedParent?.phone || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_PARENT",
                payload: { ...state.selectedParent, phone: e.target.value },
              })
            }
            fullWidth
            margin="normal"
          />

          <TextField
            label="Gender"
            select
            value={state.selectedParent?.gender || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_PARENT",
                payload: { ...state.selectedParent, gender: e.target.value },
              })
            }
            fullWidth
            margin="normal"
          >
            {["MALE", "FEMALE", "OTHER"].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Address"
            value={state.selectedParent?.address || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_PARENT",
                payload: { ...state.selectedParent, address: e.target.value },
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch({ type: "TOGGLE_EDIT_DIALOG" })}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveParent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        open={state.openConfirmDialog}
        onClose={() => dispatch({ type: "TOGGLE_CONFIRM_DIALOG" })}
        onConfirm={state.confirmAction}
      />
      <SnackBar
        open={state.snackbar.open}
        message={state.snackbar.message}
        severity={state.snackbar.severity}
        handleClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default ParentsGrid;
