"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";

import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
import SnackBar from "@/components/SnackBar";

const AuthRegister = ({ title, subtitle, subtext }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "Mahmood Anaam",
    email: "eng.mahmood.anaam@gmail.com",
    password: "112233445566",
    isAdmin: true,
  });

  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${DOMAIN}/api/users/register`, {
        ...formData,
      });
      setLoading(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      setLoading(false);
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
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box component="form" onSubmit={handleRegister}>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Name
          </Typography>
          <TextField
            id="username"
            variant="outlined"
            fullWidth
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleChange}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <TextField
            id="email"
            variant="outlined"
            fullWidth
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <TextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
          />
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
            >
              Sign Up
            </Button>
          )}
        </Box>
      </Box>
      {subtitle}

      <SnackBar
        open={snackBar.open}
        message={snackBar.message}
        severity={snackBar.severity}
        handleClose={handleClose}
      />
    </>
  );
};

export default AuthRegister;
