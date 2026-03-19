import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  Hidden,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from '../actions/userActions';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRight: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoContainer: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    fontWeight: 800,
    letterSpacing: '-1px',
    color: '#fff',
  },
  navList: {
    flexGrow: 1,
    padding: theme.spacing(0, 2),
  },
  listItem: {
    borderRadius: 8,
    marginBottom: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  activeListItem: {
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    '&:hover': {
      backgroundColor: 'rgba(233, 69, 96, 0.15)',
    },
    '& $listIcon': {
      color: theme.palette.secondary.main,
    },
    '& $listText': {
      color: theme.palette.secondary.main,
      fontWeight: 700,
    },
  },
  listIcon: {
    color: 'rgba(255, 255, 255, 0.7)',
    minWidth: 40,
  },
  listText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
  },
  userProfile: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    fontWeight: 600,
    marginRight: theme.spacing(2),
  },
  userName: {
    fontWeight: 600,
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 120,
  },
  userRole: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  logoutButton: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 'auto',
    '&:hover': {
      color: theme.palette.error.main,
    }
  }
}));

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleNavigation = (path) => {
    history.push(path);
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Rooms', icon: <BusinessIcon />, path: '/rooms' },
    { text: 'Students', icon: <PeopleIcon />, path: '/students' },
    { text: 'Attendance', icon: <LibraryAddCheckIcon />, path: '/attendance' },
    { text: 'Complaints', icon: <ReportProblemIcon />, path: '/complaints' },
    { text: 'Fees', icon: <AccountBalanceWalletIcon />, path: '/fees' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/profile' },
  ];

  if (!userInfo) return null; // Don't show sidebar if not logged in

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const drawer = (
    <>
      <Box>
        <div className={classes.logoContainer}>
          <Typography variant="h4" className={classes.logoText}>
            StayDesk
          </Typography>
        </div>
        <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 16 }} />
        <List className={classes.navList}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              className={`${classes.listItem} ${
                location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path)) 
                  ? classes.activeListItem 
                  : ''
              }`}
            >
              <ListItemIcon className={classes.listIcon}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                classes={{ primary: classes.listText }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={classes.userProfile}>
        <Avatar className={classes.avatar}>
          {getInitials(userInfo.name)}
        </Avatar>
        <Box>
          <Typography className={classes.userName}>{userInfo.name}</Typography>
          <Typography className={classes.userRole}>
            {userInfo.isAdmin ? 'Admin' : 'User'}
          </Typography>
        </Box>
        <IconButton onClick={logoutHandler} className={classes.logoutButton} size="small">
          <ExitToAppIcon fontSize="small" />
        </IconButton>
      </Box>
    </>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;