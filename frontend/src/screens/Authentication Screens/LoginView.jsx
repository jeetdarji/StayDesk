import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Grid, Paper, Typography, TextField, Button, Box, Hidden, CircularProgress 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../../components/message';
import Loader from '../../components/loader';
import { login } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    display: 'flex',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 900,
    minHeight: 550,
  },
  leftPanel: {
    background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #e94560)',
    backgroundSize: '400% 400%',
    animation: '$gradientShift 8s ease infinite',
    color: '#fff',
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  rightPanel: {
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 3),
    padding: theme.spacing(1.5),
    fontSize: '1rem',
  },
  logo: {
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    letterSpacing: '-1px',
  },
  tagline: {
    fontWeight: 500,
    opacity: 0.9,
    marginBottom: theme.spacing(6),
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  iconPlaceholder: {
    marginRight: theme.spacing(2),
    fontSize: '1.5rem',
  }
}));

const LoginView = ({ location, history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setValidationError('Please enter both email and password');
      return;
    }
    setValidationError('');
    dispatch(login(email, password));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          {/* Left Branding Panel */}
          <Hidden smDown>
            <Grid item md={5} className={classes.leftPanel}>
              <Typography variant="h3" className={classes.logo}>
                StayDesk
              </Typography>
              <Typography variant="h6" className={classes.tagline}>
                Manage smarter. Live better.
              </Typography>
              <Box>
                <div className={classes.featureItem}>
                  <span className={classes.iconPlaceholder}>🏠</span> Room Management
                </div>
                <div className={classes.featureItem}>
                  <span className={classes.iconPlaceholder}>📋</span> Attendance Tracking
                </div>
                <div className={classes.featureItem}>
                  <span className={classes.iconPlaceholder}>👥</span> Student Records
                </div>
              </Box>
            </Grid>
          </Hidden>

          {/* Right Login Panel */}
          <Grid item xs={12} md={7} className={classes.rightPanel}>
            <Box mb={2}>
              <Typography variant="h4" style={{ fontWeight: 700, marginBottom: '8px' }}>
                Sign In
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Welcome back! Please enter your details.
              </Typography>
            </Box>
            
            {(error || validationError) && (
              <Box mt={2}>
                <Message variant='danger'>{error || validationError}</Message>
              </Box>
            )}

            <form className={classes.form} onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Link to="#" style={{ textDecoration: 'none', color: '#e94560', fontWeight: 600, fontSize: '0.9rem' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    style={{ textDecoration: 'none', color: '#1a1a2e', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    Register new account
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginView;
