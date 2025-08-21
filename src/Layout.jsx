import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import MainForm from './MainForm';


const Layout = () => {
    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar drawerWidth={drawerWidth} />
            <MainForm drawerWidth={drawerWidth} />
        </Box>
    );
}

export default Layout;