"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const AuthReset = ({ title, subtitle, subtext }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <TextField
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="textSecondary"
            mt={5}
          >
            We will send you an email with instructions on how to reset your
            password.
          </Typography>
        </Box>
      </Stack>
      <Box mt="25px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={handleResetPassword}
        >
          Reset Password
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthReset;
