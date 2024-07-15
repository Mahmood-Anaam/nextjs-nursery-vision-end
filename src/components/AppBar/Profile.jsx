"use client";

import React, { useState } from "react";

import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { IconUser } from "@tabler/icons-react";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import SnackBar from "../Snackbar";


const Profile = () => {

  const [anchorEl2, setAnchorEl2] = useState(null);
  const router = useRouter();
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleMyProfile = () => {
    alert("handle My Profile");
  };

  const handleLogOut = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      setSnackBar({
        open: true,
        message: error?.response?.data.message || "An error occurred",
        severity: "error",
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };


  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem divider={true} onClick={handleMyProfile}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>

        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Box>
      </Menu>

      <SnackBar
        open={snackBar.open}
        message={snackBar.message}
        severity={snackBar.severity}
        handleClose={handleClose}
      />

    </Box>

  );
};

export default Profile;
