import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F4845F',
      light: '#F9A88A',
      dark: '#D4623D',
    },
    secondary: {
      main: '#4BAE76',
    },
    background: {
      default: '#FAF0E8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#555555',
      disabled: '#888888',
    },
    divider: '#1A1A1A',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #1A1A1A',
          boxShadow: '4px 4px 0px #1A1A1A',
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '2px solid #1A1A1A',
          boxShadow: '3px 3px 0px #1A1A1A',
          borderRadius: 4,
          fontWeight: 700,
          '&:hover': { boxShadow: '1px 1px 0px #1A1A1A', transform: 'translate(2px, 2px)' },
        },
        containedPrimary: {
          backgroundColor: '#F4845F',
          color: '#1A1A1A',
          '&:hover': { backgroundColor: '#D4623D' },
        },
        outlinedPrimary: {
          borderColor: '#1A1A1A',
          color: '#1A1A1A',
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
