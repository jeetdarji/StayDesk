import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a2e',        // deep navy
      light: '#16213e',
      dark: '#0f0f1a',
    },
    secondary: {
      main: '#e94560',        // vibrant coral-red accent
      light: '#ff6b81',
      dark: '#c73652',
    },
    background: {
      default: '#f8f9fc',
      paper: '#ffffff',
    },
    success: { main: '#00b894' },
    warning: { main: '#fdcb6e' },
    error:   { main: '#e17055' },
    text: {
      primary: '#1a1a2e',
      secondary: '#636e72',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)',
    '0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.05)',
    '0 20px 25px rgba(0,0,0,0.08), 0 10px 10px rgba(0,0,0,0.04)',
    ...Array(20).fill('none'),
  ],
  overrides: {
    MuiButton: {
      root: { borderRadius: 10, padding: '10px 24px', fontSize: '0.875rem' },
      contained: { boxShadow: '0 4px 14px rgba(233,69,96,0.3)' },
      containedPrimary: {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        '&:hover': { background: 'linear-gradient(135deg, #16213e 0%, #0f0f1a 100%)' },
      },
      containedSecondary: {
        background: 'linear-gradient(135deg, #e94560 0%, #c73652 100%)',
        '&:hover': { background: 'linear-gradient(135deg, #ff6b81 0%, #e94560 100%)' },
      },
    },
    MuiCard: {
      root: {
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.10)',
        },
      },
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
          '&:hover fieldset': { borderColor: '#e94560' },
          '&.Mui-focused fieldset': { borderColor: '#e94560' },
        },
      },
    },
    MuiChip: {
      root: { borderRadius: 8, fontWeight: 600, fontSize: '0.75rem' },
    },
    MuiTableHead: {
      root: {
        '& .MuiTableCell-head': {
          backgroundColor: '#1a1a2e',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '0.8rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        },
      },
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': { backgroundColor: '#f8f9fc' },
        '&:hover': { backgroundColor: '#fff5f6 !important' },
      },
    },
    MuiDrawer: {
      paper: { backgroundColor: '#1a1a2e', color: '#ffffff' },
    },
  },
});

export default theme;
