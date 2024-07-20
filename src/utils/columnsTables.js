import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";

import {
  EditIcon,
  DeleteIcon,
  SaveIcon,
  CancelIcon,
} from "@mui/icons-material";

export const parentColumns = [
  { field: "id", headerName: "ID", width: 90, type: "number" },
  {
    field: "name",
    headerName: "Name",
    width: 180,
    type: "string",
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    type: "string",
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    type: "string",
    editable: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
    type: "singleSelect",
    valueOptions: ["MALE", "FEMALE", "OTHER"],
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
    type: "string",
    editable: true,
  },

  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];
