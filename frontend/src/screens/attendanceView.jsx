import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, Typography, Button, TextField, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Switch,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventIcon from '@material-ui/icons/Event';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { getStudentsByRoomNo as action, listStudents } from "../actions/studentActions";
import Loading from "../components/loader";
import Message from "../components/message";

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  topControls: {
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: theme.spacing(2, 3),
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  tableContainer: {
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginBottom: theme.spacing(10), // Space for sticky bottom
  },
  avatarCol: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  roomGroups: {
    marginBottom: theme.spacing(3)
  },
  roomHeader: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(1, 2),
    borderRadius: '8px 8px 0 0',
    fontWeight: 600,
  },
  presentText: {
    color: theme.palette.success.main,
    fontWeight: 600
  },
  absentText: {
    color: theme.palette.error.main,
    fontWeight: 600
  },
  stickyFooter: {
    position: 'fixed',
    bottom: 0,
    left: 260, // Width of sidebar
    right: 0,
    padding: theme.spacing(2, 4),
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    [theme.breakpoints.down('sm')]: {
      left: 0,
    }
  },
  bulkButtons: {
    display: 'flex',
    gap: theme.spacing(1),
  }
}));

const AttendanceView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Get current date string formatted nicely for default input
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [attendanceState, setAttendanceState] = useState({}); // { studentId: true/false }

  // Temporarily grab all students from studentList for the current view since we want room groupings
  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students } = studentsList;

  useEffect(() => {
    document.title = 'Attendance | StayDesk';
    dispatch(listStudents("", 1));
  }, [dispatch]);

  // Group students by room
  const studentsByRoom = {};
  if (students) {
    students.forEach(student => {
      if (!studentsByRoom[student.roomNo]) {
        studentsByRoom[student.roomNo] = [];
      }
      studentsByRoom[student.roomNo].push(student);
    });
  }

  // Initialize attendance state if empty
  useEffect(() => {
    if (students && Object.keys(attendanceState).length === 0) {
      const initialState = {};
      students.forEach(s => initialState[s._id] = true); // Default everyone to present
      setAttendanceState(initialState);
    }
  }, [students]);

  const handleToggle = (id) => {
    setAttendanceState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const markAll = (status) => {
    if(!students) return;
    const newState = {};
    students.forEach(s => {
      newState[s._id] = status;
    });
    setAttendanceState(newState);
  };

  const saveAttendance = () => {
    // In actual implementation, dispatch action to save taking attendanceState and selectedDate
    alert("Attendance saved successfully for " + selectedDate);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  };

  return (
    <Box>
      <Box className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 700, color: '#1a1a2e' }}>
          Daily Attendance
        </Typography>
        <Button 
          variant="outlined" 
          color="primary"
          startIcon={<GetAppIcon />}
        >
          Export CSV
        </Button>
      </Box>

      <Box className={classes.topControls}>
        <EventIcon color="action" />
        <TextField
          id="date"
          label="Attendance Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          size="small"
        />
        
        <Box ml="auto" className={classes.bulkButtons}>
          <Button 
            variant="contained" 
            size="small" 
            style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}
            startIcon={<CheckCircleIcon />}
            onClick={() => markAll(true)}
          >
            Mark All Present
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            style={{ backgroundColor: '#ffebee', color: '#d32f2f' }}
            startIcon={<CancelIcon />}
            onClick={() => markAll(false)}
          >
            Mark All Absent
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Box pb={6}>
          {Object.keys(studentsByRoom).sort().map(roomNo => (
            <Box key={roomNo} className={classes.roomGroups}>
              <Typography className={classes.roomHeader}>
                Room {roomNo}
              </Typography>
              <TableContainer component={Paper} style={{ borderRadius: '0 0 8px 8px' }}>
                <Table size="small">
                  <TableBody>
                    {studentsByRoom[roomNo].map(student => {
                      const isPresent = attendanceState[student._id] !== false;
                      return (
                        <TableRow key={student._id}>
                          <TableCell style={{ width: '60%' }}>
                            <Box className={classes.avatarCol}>
                              <Avatar style={{ width: 32, height: 32, backgroundColor: isPresent ? '#00b894' : '#e17055' }}>
                                {getInitials(student.name)}
                              </Avatar>
                              <Typography style={{ fontWeight: 500 }}>
                                {student.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            <Typography className={isPresent ? classes.presentText : classes.absentText}>
                              {isPresent ? 'Present' : 'Absent'}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" style={{ width: '20%' }}>
                            <Switch
                              checked={isPresent}
                              onChange={() => handleToggle(student._id)}
                              color="primary"
                              inputProps={{ 'aria-label': 'attendance toggle' }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
          {(!students || students.length === 0) && (
            <Paper style={{ padding: '40px', textAlign: 'center' }}>
              <Typography color="textSecondary">No students to mark attendance for.</Typography>
            </Paper>
          )}
        </Box>
      )}

      {/* Sticky Save Button at Bottom */}
      <Box className={classes.stickyFooter}>
        <Typography variant="body2" color="textSecondary">
          <strong>{Object.values(attendanceState).filter(v => v).length}</strong> present out of <strong>{Object.keys(attendanceState).length}</strong> students
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={saveAttendance}
          style={{ width: 200 }}
        >
          Save Attendance
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceView;
