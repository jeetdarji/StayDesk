import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Grid, Card, CardContent, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, MenuItem, Chip
} from '@material-ui/core';

const FeeView = () => {
  useEffect(() => {
    document.title = 'Fees | StayDesk';
  }, []);

  const [fees, setFees] = useState([
    { _id: '1', studentName: 'John Doe', roomNo: '101', amount: 5000, month: 'March 2025', status: 'Pending', paidOn: null },
    { _id: '2', studentName: 'Jane Smith', roomNo: '102', amount: 5000, month: 'March 2025', status: 'Paid', paidOn: '2025-03-01' },
    { _id: '3', studentName: 'Sam Wilson', roomNo: '103', amount: 5000, month: 'February 2025', status: 'Overdue', paidOn: null },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentMode, setPaymentMode] = useState('UPI');

  const handleOpen = (fee) => {
    setSelectedFee(fee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFee(null);
  };

  const handlePay = () => {
    setFees(fees.map(f => f._id === selectedFee._id ? { ...f, status: 'Paid', paidOn: new Date().toISOString().split('T')[0], paymentMode } : f));
    handleClose();
  };

  const totalCollected = fees.filter(f => f.status === 'Paid').reduce((acc, f) => acc + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'Pending').reduce((acc, f) => acc + f.amount, 0);
  const totalOverdue = fees.filter(f => f.status === 'Overdue').reduce((acc, f) => acc + f.amount, 0);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', color: '#1a1a2e' }}>
          Fee & Rent Tracker
        </Typography>

        <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Total Collected</Typography>
                <Typography variant="h3">₹{totalCollected}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#fdcb6e', color: '#1a1a2e' }}>
              <CardContent>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h3">₹{totalPending}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#e17055', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Overdue</Typography>
                <Typography variant="h3">₹{totalOverdue}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Paid On</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee._id}>
                  <TableCell>{fee.studentName}</TableCell>
                  <TableCell>{fee.roomNo}</TableCell>
                  <TableCell>₹{fee.amount}</TableCell>
                  <TableCell>{fee.month}</TableCell>
                  <TableCell>
                    <Chip 
                      label={fee.status} 
                      style={{ 
                        backgroundColor: fee.status === 'Paid' ? '#00b894' : fee.status === 'Overdue' ? '#e17055' : '#fdcb6e',
                        color: fee.status === 'Pending' ? '#1a1a2e' : 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  </TableCell>
                  <TableCell>{fee.paidOn ? new Date(fee.paidOn).toLocaleDateString() : '-'}</TableCell>
                  <TableCell align="right">
                    {fee.status !== 'Paid' && (
                      <Button variant="contained" color="primary" size="small" onClick={() => handleOpen(fee)} style={{ backgroundColor: '#e94560' }}>
                        Mark Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mark Fee as Paid - {selectedFee?.studentName}</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Typography variant="body1" gutterBottom>Amount: ₹{selectedFee?.amount}</Typography>
            <Typography variant="body1" gutterBottom>Month: {selectedFee?.month}</Typography>
            <TextField
              select
              label="Payment Mode"
              fullWidth
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              margin="normal"
              variant="outlined"
            >
              {['Cash', 'UPI', 'Bank Transfer', 'Other'].map((mode) => (
                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePay} variant="contained" color="primary" style={{ backgroundColor: '#00b894' }}>Confirm Payment</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FeeView;
