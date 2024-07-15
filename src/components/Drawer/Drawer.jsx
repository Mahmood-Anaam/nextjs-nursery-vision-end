'use client';

import React from 'react';
import {Drawer,useMediaQuery} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import DrawerItems from './DrawerItems';

const drawerWidth = 240;

const DrawerPaper = styled('div')(({ theme }) => ({
  width: drawerWidth,
  boxSizing: 'border-box',
  paddingTop: theme.spacing(8), 
}));



const CustomDrawer = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
      variant={isMobile ? 'temporary' : 'persistent'}
      sx={{ [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', width: drawerWidth } }}
    >
      <DrawerPaper>

      <DrawerItems />

      </DrawerPaper>
    </Drawer>
  );
};



















export default CustomDrawer;
