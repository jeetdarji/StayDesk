import React, { useEffect } from 'react';
import { Typography, Container, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = '404 Not Found | StayDesk';
  }, []);

  return (
    <Container style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h1" color="primary">404</Typography>
      <Typography variant="h4" color="textSecondary" style={{ margin: '20px 0' }}>
        Page not found
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => history.push('/')}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default NotFound;