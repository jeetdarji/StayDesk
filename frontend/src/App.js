import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import HomeView from "../src/screens/homeView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { 
  CssBaseline, 
  Hidden, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography,
  makeStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Header from "./components/header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer";
import AddStudentView from "./screens/addStudentView";
import AnalysisView from "./screens/analysisView";
import LoginView from "./screens/Authentication Screens/LoginView";
import RegisterView from "./screens/Authentication Screens/RegisterView";
import StudentDetailsView from "./screens/studentDetailsView";
import AttendanceView from "./screens/attendanceView";
import ProfileView from "./screens/profileView";
import UserListView from "./screens/userListView";
import UserEditView from "./screens/userEditView";
import RoomView from "./screens/roomView";
import StudentView from "./screens/studentView";
import ComplaintView from "./screens/ComplaintView";
import FeeView from "./screens/FeeView";
import NotFound from "./screens/NotFound";
import { useSelector } from "react-redux";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#fff',
    color: theme.palette.text.primary,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 64, // App bar height
    width: '100%',
    overflowX: 'hidden',
  },
  contentLoggedIn: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }
}));

const AppContent = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
  const showSidebar = userInfo && !isAuthPage;

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      {showSidebar && (
        <>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {/* Dynamically set page title here if needed */}
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        </>
      )}

      <main className={`${classes.content} ${showSidebar ? classes.contentLoggedIn : ''}`} style={{ marginTop: showSidebar ? 64 : 0 }}>
        <Container fluid={!showSidebar} style={{ padding: showSidebar ? 0 : undefined }}>
          <Switch>
            <Route path="/user/:userId/edit" component={UserEditView} />
            <Route path="/userList" component={UserListView} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/attendance" component={AttendanceView} />
            <Route path="/analysis" component={AnalysisView} />
            <Route path="/rooms" component={RoomView} />
            <Route path="/students" component={StudentView} />
            <Route path="/complaints" component={ComplaintView} />
            <Route path="/fees" component={FeeView} />
            <Route path="/addStudent" component={AddStudentView} />
            <Route path="/student/edit/:id" component={AddStudentView} exact />
            <Route path="/student/:id" component={StudentDetailsView} exact />
            <Route path="/login" component={LoginView} exact />
            <Route path="/register" component={RegisterView} exact />
            <Route path="/search/:keyword" component={HomeView} exact />
            <Route path="/page/:pageNumber" component={HomeView} exact />
            <Route path="/search/:keyword/page/:pageNumber" component={HomeView} exact />
            <Route path="/" component={HomeView} exact />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
