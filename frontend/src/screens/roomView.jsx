import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Card, CardContent, 
  Chip, LinearProgress, IconButton, Tabs, Tab, 
  Drawer, TextField, Paper 
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    marginBottom: theme.spacing(3),
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  card: {
    borderRadius: 16,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  roomNo: {
    fontWeight: 700,
    fontSize: '1.25rem',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
  actions: {
    marginTop: 'auto',
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
  },
  drawer: {
    width: 400,
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

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 8,
    borderRadius: 4,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[200],
  },
  bar: {
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress);

// Mock Data
const initialRooms = [
  { id: 1, roomNo: '101', floor: 1, capacity: 4, occupied: 4 },
  { id: 2, roomNo: '102', floor: 1, capacity: 4, occupied: 2 },
  { id: 3, roomNo: '103', floor: 1, capacity: 2, occupied: 0 },
  { id: 4, roomNo: '201', floor: 2, capacity: 4, occupied: 3 },
  { id: 5, roomNo: '202', floor: 2, capacity: 3, occupied: 3 },
  { id: 6, roomNo: '203', floor: 2, capacity: 2, occupied: 1 },
];

const RoomView = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState(0);
  const [rooms, setRooms] = useState(initialRooms);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

  useEffect(() => {
    document.title = 'Rooms | StayDesk';
  }, []);

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const getOccupancyStatus = (occupied, capacity) => {
    if (occupied === 0) return { label: 'Vacant', color: '#00b894', bg: '#e8f5e9' }; // green
    if (occupied === capacity) return { label: 'Full', color: '#e17055', bg: '#ffebee' }; // red
    return { label: 'Partially Filled', color: '#fdcb6e', bg: '#fff8e1' }; // amber
  };

  const filteredRooms = rooms.filter(room => {
    if (filter === 1) return room.occupied > 0; // Occupied
    if (filter === 2) return room.occupied === 0; // Vacant
    return true; // All
  });

  const openDrawer = (room = null) => {
    setEditRoom(room);
    setDrawerOpen(true);
  };

  return (
    <Box>
      <Box className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 700, color: '#1a1a2e' }}>
          Rooms Management
        </Typography>
        <Button 
          variant="contained" 
          className={classes.addButton}
          startIcon={<AddIcon />}
          onClick={() => openDrawer()}
        >
          Add Room
        </Button>
      </Box>

      <Tabs 
        value={filter} 
        onChange={handleFilterChange} 
        className={classes.filters}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab label="All Rooms" />
        <Tab label="Occupied" />
        <Tab label="Vacant" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredRooms.map(room => {
          const status = getOccupancyStatus(room.occupied, room.capacity);
          const percentPercentage = (room.occupied / room.capacity) * 100;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card className={classes.card}>
                <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box className={classes.cardHeader}>
                    <Typography className={classes.roomNo}>
                      Room {room.roomNo}
                    </Typography>
                    <Chip 
                      label={status.label} 
                      size="small" 
                      style={{ backgroundColor: status.bg, color: status.color, fontWeight: 600 }} 
                    />
                  </Box>
                  
                  <Box className={classes.infoRow}>
                    <Typography color="textSecondary" variant="body2">Floor:</Typography>
                    <Typography fontWeight="500">{room.floor}</Typography>
                  </Box>
                  <Box className={classes.infoRow}>
                    <Typography color="textSecondary" variant="body2">Capacity:</Typography>
                    <Typography fontWeight="500">{room.capacity} Students</Typography>
                  </Box>
                  <Box className={classes.infoRow}>
                    <Typography color="textSecondary" variant="body2">Current Occupancy:</Typography>
                    <Typography fontWeight="500">{room.occupied} Students</Typography>
                  </Box>

                  <Box mt={2}>
                    <Box className={classes.progressLabel}>
                      <Typography variant="caption" color="textSecondary" style={{ fontWeight: 600 }}>Occupancy Rate</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ fontWeight: 600 }}>{Math.round(percentPercentage)}%</Typography>
                    </Box>
                    <BorderLinearProgress variant="determinate" value={percentPercentage} />
                  </Box>

                  <Box className={classes.actions}>
                    <IconButton size="small" color="primary">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" style={{ color: '#e94560' }} onClick={() => openDrawer(room)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Slide-in Drawer for Add/Edit Room */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box className={classes.drawer}>
          <Typography variant="h5" className={classes.drawerHeader}>
            {editRoom ? 'Edit Room' : 'Add New Room'}
          </Typography>

          <TextField 
            fullWidth 
            label="Room Number" 
            variant="outlined" 
            className={classes.formField}
            defaultValue={editRoom ? editRoom.roomNo : ''}
          />
          <TextField 
            fullWidth 
            label="Floor" 
            type="number" 
            variant="outlined" 
            className={classes.formField}
            defaultValue={editRoom ? editRoom.floor : ''}
          />
          <TextField 
            fullWidth 
            label="Capacity" 
            type="number" 
            variant="outlined" 
            className={classes.formField}
            defaultValue={editRoom ? editRoom.capacity : ''}
          />

          <Box mt={4} display="flex" gap="16px" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setDrawerOpen(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary">
              Save Room
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default RoomView;