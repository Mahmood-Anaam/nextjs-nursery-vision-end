"use client";

import React, { useState, useEffect } from "react";
import CustomAppBar from "@/components/AppBar/AppBar";
import CustomDrawer from "@/components/Drawer/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

const RootLayout = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{ display: "flex" }}>
      <CustomAppBar handleDrawerToggle={handleDrawerToggle} />
      <CustomDrawer open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      <main
        style={{
          flexGrow: 1,
          padding: "16px",
          marginLeft: isMobile ? 0 : drawerOpen ? `${drawerWidth}px` : 0,
          marginTop: "64px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
