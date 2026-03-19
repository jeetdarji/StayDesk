import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Button, TextField, Grid, Card, CardContent,
  Chip, Drawer, MenuItem, Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  boardContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    overflowX: 'auto',
    paddingBottom: theme.spacing(2),
  },
  column: {
    flex: '1 1 300px',
    minWidth: 280,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  columnHeader: {
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  card: {
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
    }
  },
  priorityHigh: { backgroundColor: '#ffebee', color: '#d32f2f' },
  priorityMedium: { backgroundColor: '#fff8e1', color: '#f57c00' },
  priorityLow: { backgroundColor: '#e8f5e9', color: '#2e7d32' },
  drawer: {
    width: 450,
    padding: theme.spacing(4),
  },
  formField: {
    marginBottom: theme.spacing(2),
  }
}));

// Mock Data
const initialComplaints = [
  { id: 1, title: 'AC not working', description: 'The AC in my room is blowing warm air.', category: 'Maintenance', priority: 'High', status: 'Open', roomNo: '101', raisedBy: 'Rahul', timeAgo: '2h ago' },
  { id: 2, title: 'Water leaking', description: 'Tap is leaking in bathroom.', category: 'Water', priority: 'Medium', status: 'In Progress', roomNo: '205', raisedBy: 'Amit', timeAgo: '5h ago' },
  { id: 3, title: 'Wi-Fi slow', description: 'Getting very low speeds.', category: 'Other', priority: 'Low', status: 'Resolved', roomNo: '110', raisedBy: 'Vikas', timeAgo: '1d ago' },
];

const ComplaintView = () => {
  const classes = useStyles();
  const [complaints, setComplaints] = useState(initialComplaints);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    document.title = 'Complaints | StayDesk';
    // fetch complaints here later
  }, []);

  const openDrawer = (complaint = null) => {
    setSelectedComplaint(complaint);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedComplaint(null);
  };

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'High': case 'Urgent': return classes.priorityHigh;
      case 'Medium': return classes.priorityMedium;
      case 'Low': return classes.priorityLow;
      default: return {};
    }
  };

  const renderColumn = (status, title, color) => {
    const list = complaints.filter(c => c.status === status);
    return (
      <Box className={classes.column}>
        <Box className={classes.columnHeader}>
          <Typography variant="subtitle1" style={{ fontWeight: 700, color }}>
            {title}
          </Typography>
          <Chip label={list.length} size="small" style={{ fontWeight: 600 }} />
        </Box>
        {list.map(c => (
          <Card key={c.id} className={classes.card} onClick={() => openDrawer(c)}>
            <CardContent style={{ padding: '16px' }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Chip size="small" label={c.category} style={{ fontSize: '0.7rem', fontWeight: 600 }} />
                <Typography variant="caption" color="textSecondary">{c.timeAgo}</Typography>
              </Box>
              <Typography variant="subtitle2" style={{ fontWeight: 600, marginBottom: '4px' }}>
                {c.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" noWrap style={{ marginBottom: '12px' }}>
                {c.description}
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" style={{ fontWeight: 500 }}>Room {c.roomNo}</Typography>
                <Chip 
                  size="small" 
                  label={c.priority} 
                  className={getPriorityStyle(c.priority)}
                  style={{ fontSize: '0.7rem', height: '20px' }} 
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Box className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 700, color: '#1a1a2e' }}>
          Complaint Desk
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => openDrawer()}
        >
          New Complaint
        </Button>
      </Box>

      {/* Kanban Board */}
      <Box className={classes.boardContainer}>
        {renderColumn('Open', 'Open', '#e17055')}
        {renderColumn('In Progress', 'In Progress', '#fdcb6e')}
        {renderColumn('Resolved', 'Resolved', '#00b894')}
        {renderColumn('Closed', 'Closed', '#636e72')}
      </Box>

      {/* Slide-in Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box className={classes.drawer}>
          <Typography variant="h5" style={{ fontWeight: 700, marginBottom: '24px' }}>
            {selectedComplaint ? 'Update Complaint' : 'File New Complaint'}
          </Typography>

          <TextField 
            fullWidth 
            label="Title" 
            variant="outlined" 
            className={classes.formField}
            defaultValue={selectedComplaint?.title || ''}
            disabled={!!selectedComplaint}
          />
          <TextField 
            fullWidth 
            label="Room No" 
            variant="outlined" 
            className={classes.formField}
            defaultValue={selectedComplaint?.roomNo || ''}
            disabled={!!selectedComplaint}
          />
          
          {!selectedComplaint && (
            <>
              <TextField 
                fullWidth select label="Category" variant="outlined" className={classes.formField} defaultValue="Maintenance"
              >
                {['Maintenance', 'Cleanliness', 'Food', 'Security', 'Electricity', 'Water', 'Other'].map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
              <TextField fullWidth select label="Priority" variant="outlined" className={classes.formField} defaultValue="Medium">
                {['Low', 'Medium', 'High', 'Urgent'].map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
              <TextField fullWidth label="Description" variant="outlined" multiline rows={4} className={classes.formField} />
            </>
          )}

          {selectedComplaint && (
            <>
              <TextField 
                fullWidth select label="Status" variant="outlined" className={classes.formField} 
                defaultValue={selectedComplaint.status}
              >
                {['Open', 'In Progress', 'Resolved', 'Closed'].map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
              <TextField 
                fullWidth label="Admin Note" variant="outlined" multiline rows={3} className={classes.formField} 
                placeholder="Add notes for resolving..."
              />
            </>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary">
              {selectedComplaint ? 'Update Status' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ComplaintView;