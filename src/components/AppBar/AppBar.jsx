"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { IconBellRinging, IconHelp, IconMenu2 } from "@tabler/icons-react";
import Logo from "../Logo";
import Profile from "@/components/AppBar/Profile";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
}));

const CustomAppBar = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: "20px" }}
          onClick={handleDrawerToggle}
        >
          <IconMenu2 />
        </IconButton>

        <Logo
          src="/images/logo.png"
          width={30}
          height={30}
          title="NurseryVision"
        />

        {!isMobile && (
          <>
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>

            <IconButton>
              <IconHelp />
            </IconButton>
          </>
        )}
        <Profile />
      </Toolbar>
    </StyledAppBar>
  );
};

export default CustomAppBar;
