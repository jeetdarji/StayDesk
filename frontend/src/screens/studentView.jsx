import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { 
  Box, Typography, Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, Avatar,
  IconButton, Drawer, Grid, InputAdornment
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { listStudents } from "../actions/studentActions";
import Loading from "../components/loader";
import Message from "../components/message";

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  addButton: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    }
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  searchField: {
    width: '300px',
  },
  tableContainer: {
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  avatarCol: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  drawer: {
    width: 500,
    padding: theme.spacing(4),
  },
  drawerHeader: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
  },
  formField: {
    marginBottom: theme.spacing(3),
  }
}));

const StudentView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [filter, setFilter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students } = studentsList;

  useEffect(() => {
    document.title = 'Students | StayDesk';
    dispatch(listStudents("", 1));
  }, [dispatch]);

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  };

  const getRandomColor = (id) => {
    const colors = ['#e94560', '#00b894', '#0984e3', '#6c5ce7', '#e17055', '#fdcb6e'];
    const index = (id ? id.length : 0) % colors.length;
    return colors[index];
  };

  // Filter existing Redux state locally
  const filteredStudents = (students || []).filter(student => {
    // Basic search
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !student.roomNo.toString().includes(searchTerm)) {
      return false;
    }
    // Tab filter (mocking active/inactive since backend might not have it yet)
    // Assuming all fetched are active right now
    if (filter === 1) return true; // Active
    if (filter === 2) return false; // Inactive
    return true; // All
  });

  return (
    <Box>
      <Box className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 700, color: '#1a1a2e' }}>
          Students List
        </Typography>
        <Button 
          variant="contained" 
          className={classes.addButton}
          startIcon={<AddIcon />}
          onClick={() => setDrawerOpen(true)}
        >
          Add Student
        </Button>
      </Box>

      <Box className={classes.filters}>
        <Tabs 
          value={filter} 
          onChange={handleFilterChange} 
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="All Students" />
          <Tab label="Active" />
          <Tab label="Inactive" />
        </Tabs>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name or room..."
          className={classes.searchField}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Room No</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <Box className={classes.avatarCol}>
                      <Avatar style={{ backgroundColor: getRandomColor(student._id) }}>
                        {getInitials(student.name)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" style={{ fontWeight: 600 }}>{student.name}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{student.roomNo}</TableCell>
                  <TableCell>{student.number || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip 
                      label="Active" 
                      size="small" 
                      style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary" onClick={() => history.push(`/student/${student._id}`)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" style={{ color: '#e94560' }} onClick={() => history.push(`/student/edit/${student._id}`)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" style={{ color: '#636e72' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" style={{ padding: '30px' }}>
                    <Typography variant="body1" color="textSecondary">
                      No students found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Slide-in Drawer for Add Student */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box className={classes.drawer}>
          <Typography variant="h5" className={classes.drawerHeader}>
            Add New Student
          </Typography>

          {/* Simple mock form for now */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Full Name" variant="outlined" className={classes.formField} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Room No" variant="outlined" className={classes.formField} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Contact Number" variant="outlined" className={classes.formField} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email Address" variant="outlined" className={classes.formField} />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" gap="16px" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setDrawerOpen(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary">
              Save Student
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default StudentView;