import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { deepOrange, blue, grey } from '@mui/material/colors';


const Sidebar = (props) => {
    const { drawerWidth } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleNewChat = () => {
        window.location.reload();
    }

    const drawer = (
        <div>
            <MenuItem sx={{ textAlign: 'center', justifyContent: 'center', my: 1 }}>
                <ListItemAvatar sx={{ minWidth: 44, mx: 1 }}>
                    <Avatar alt="My Chat Web" sx={{ width: 44, height: 44, bgcolor: deepOrange[500] }}>
                        <DevicesRoundedIcon sx={{ fontSize: '1.5rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="My Chat Web" primaryTypographyProps={{ fontSize: '1.05rem' }} secondary="GPT App" secondaryTypographyProps={{ fontSize: '0.95rem' }} sx={{ mx: 1 }} />
            </MenuItem>
            <Divider sx={{ marginTop: 0 }} />

            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNewChat}>
                        <ListItemIcon>
                            <AddCircleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary='新的聊天' />
                    </ListItemButton>
                </ListItem>
            </List>

            <AppBar position="fixed" elevation={0}
                sx={{
                    top: 'auto',
                    bottom: 0,
                    left: 0,
                    right: 'auto',
                    width: drawerWidth,
                    bgcolor: 'rgba(0, 0, 0, 0)',
                }}
            >
                <Divider />
                <Toolbar>
                    <Avatar icon={<AccountCircleIcon />} sx={{ bgcolor: deepOrange[500] }} />
                    <Box sx={{ ml: 2, mr: 'auto' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px', color: 'black' }}>
                            ADA CHEN
                        </Typography>
                    </Box>
                    <IconButton href="https://airfly-project.netlify.app/">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div >
    );


    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    display: { xs: 'block', sm: 'none' }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}

export default Sidebar;