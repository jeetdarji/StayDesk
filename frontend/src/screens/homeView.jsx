import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid, Card, CardContent, Typography, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import BusinessIcon from "@material-ui/icons/Business";
import HotelIcon from "@material-ui/icons/Hotel";
import PeopleIcon from "@material-ui/icons/People";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Avatar from '@material-ui/core/Avatar';
import EventNoteIcon from '@material-ui/icons/EventNote';

import { listStudents } from "../actions/studentActions";
import Loading from "../components/loader";

const useStyles = makeStyles((theme) => ({
  pageTitle: { 
    fontWeight: 700, 
    marginBottom: theme.spacing(3), 
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1)
  },
  statCard: { 
    borderRadius: 16, 
    display: 'flex', 
    alignItems: 'center', 
    padding: theme.spacing(2),
    height: '100%',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  iconBox: { 
    width: 60, 
    height: 60, 
    borderRadius: '16px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: theme.spacing(2) 
  },
  iconRooms: { backgroundColor: 'rgba(26, 26, 46, 0.1)', color: '#1a1a2e' },
  iconOccupied: { backgroundColor: 'rgba(233, 69, 96, 0.1)', color: '#e94560' },
  iconStudents: { backgroundColor: 'rgba(0, 184, 148, 0.1)', color: '#00b894' },
  iconAttendance: { backgroundColor: 'rgba(253, 203, 110, 0.1)', color: '#fdcb6e' },
  sectionTitle: { 
    fontWeight: 600, 
    marginBottom: theme.spacing(2) 
  },
  cardLabel: { 
    color: theme.palette.text.secondary, 
    fontWeight: 600,
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  cardValue: { 
    fontWeight: 800, 
    fontSize: '1.8rem',
    lineHeight: 1.2
  },
  panel: {
    padding: theme.spacing(3),
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    height: '100%'
  },
  roomGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))', 
    gap: '10px',
    marginTop: theme.spacing(2)
  },
  roomSquare: { 
    aspectRatio: '1', 
    borderRadius: '10px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#fff', 
    fontSize: '0.75rem', 
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  vacantRoom: { backgroundColor: theme.palette.error.main, opacity: 0.85 }, 
  occupiedRoom: { backgroundColor: theme.palette.success.main },
  tableContainer: {
    boxShadow: 'none',
    border: '1px solid rgba(0,0,0,0.05)'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5, 0),
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  activityIcon: {
    backgroundColor: 'rgba(26, 26, 46, 0.05)',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  activityText: {
    fontWeight: 500,
  },
  activityTime: {
    color: theme.palette.text.secondary,
    fontSize: '0.8rem',
    marginLeft: 'auto'
  }
}));

const HomeView = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, students } = studentsList;

  useEffect(() => {
    document.title = 'Dashboard | StayDesk';
    if (!userLoading && !userInfo) {
      history.push("/login");
    } else {
      // Fetch students for the dashboard
      dispatch(listStudents("", 1));
    }
  }, [dispatch, history, userInfo, userLoading]);

  if (loading || userLoading) return <Loading />;

  const recentStudents = students ? students.slice(0, 5) : [];
  const totalStudents = students ? students.length : 0;
  
  // Mock data for dashboard
  const totalRoomsCount = 24;
  const occupiedCount = 18;
  const attendanceRate = "85%";

  const activityFeed = [
    { id: 1, action: "Attendance marked for Floor 1", time: "10 mins ago" },
    { id: 2, action: "New student Rohit Verma enrolled", time: "1 hour ago" },
    { id: 3, action: "Room 105 marked as vacant", time: "2 hours ago" },
    { id: 4, action: "Fee payment received from Amit Patel", time: "5 hours ago" },
    { id: 5, action: "Maintenance complaint #102 resolved", time: "1 day ago" },
  ];

  return (
    <Box pb={4}>
      <Typography variant="h4" className={classes.pageTitle}>
        Dashboard Overview
      </Typography>

      {/* Top Stats Row */}
      <Grid container spacing={3} style={{ marginBottom: '24px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.statCard}>
            <Box className={`${classes.iconBox} ${classes.iconRooms}`}>
              <BusinessIcon fontSize="large" />
            </Box>
            <Box>
              <Typography className={classes.cardLabel}>Total Rooms</Typography>
              <Typography className={classes.cardValue}>{totalRoomsCount}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.statCard}>
            <Box className={`${classes.iconBox} ${classes.iconOccupied}`}>
              <HotelIcon fontSize="large" />
            </Box>
            <Box>
              <Typography className={classes.cardLabel}>Occupied</Typography>
              <Typography className={classes.cardValue}>{occupiedCount}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.statCard}>
            <Box className={`${classes.iconBox} ${classes.iconStudents}`}>
              <PeopleIcon fontSize="large" />
            </Box>
            <Box>
              <Typography className={classes.cardLabel}>Students Enrolled</Typography>
              <Typography className={classes.cardValue}>{totalStudents}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.statCard}>
            <Box className={`${classes.iconBox} ${classes.iconAttendance}`}>
              <CheckCircleIcon fontSize="large" />
            </Box>
            <Box>
              <Typography className={classes.cardLabel}>Today's Attendance</Typography>
              <Typography className={classes.cardValue}>{attendanceRate}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Middle Grid */}
      <Grid container spacing={3}>
        {/* Left: Recent Students */}
        <Grid item xs={12} md={7}>
          <Paper className={classes.panel}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recently Enrolled Students
            </Typography>
            <TableContainer className={classes.tableContainer}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Room No</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar style={{ width: 32, height: 32, backgroundColor: '#e94560', fontSize: '0.9rem' }}>
                          {student.name.charAt(0)}
                        </Avatar>
                        <span style={{ fontWeight: 500 }}>{student.name}</span>
                      </TableCell>
                      <TableCell>{student.roomNo}</TableCell>
                      <TableCell>
                        <Chip 
                          label="Active" 
                          size="small" 
                          style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {recentStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" style={{ padding: '20px' }}>
                        No students enrolled yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Right: Occupancy Visual */}
        <Grid item xs={12} md={5}>
          <Paper className={classes.panel}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" className={classes.sectionTitle} style={{ margin: 0 }}>
                Room Occupancy
              </Typography>
            </Box>
            
            <Box display="flex" gap="16px" mb={2} pl={1}>
              <Box display="flex" alignItems="center">
                <span style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: '#00b894', marginRight: 6 }}></span>
                <Typography variant="caption" color="textSecondary">Occupied</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <span style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: '#e17055', marginRight: 6, marginLeft: 12 }}></span>
                <Typography variant="caption" color="textSecondary">Vacant</Typography>
              </Box>
            </Box>

            <div className={classes.roomGrid}>
              {Array.from({ length: totalRoomsCount }, (_, i) => {
                const roomNo = 101 + i;
                const isOccupied = i < occupiedCount;
                return (
                  <div 
                    key={roomNo} 
                    className={`${classes.roomSquare} ${isOccupied ? classes.occupiedRoom : classes.vacantRoom}`}
                    title={`Room ${roomNo} - ${isOccupied ? 'Occupied' : 'Vacant'}`}
                  >
                    {roomNo}
                  </div>
                );
              })}
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom: Activity Feed */}
      <Grid container spacing={3} style={{ marginTop: '8px' }}>
        <Grid item xs={12}>
          <Paper className={classes.panel}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recent Activity
            </Typography>
            <Box>
              {activityFeed.map(item => (
                <div key={item.id} className={classes.activityItem}>
                  <Avatar className={classes.activityIcon}>
                    <EventNoteIcon />
                  </Avatar>
                  <Typography className={classes.activityText}>{item.action}</Typography>
                  <Typography className={classes.activityTime}>{item.time}</Typography>
                </div>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default HomeView;
