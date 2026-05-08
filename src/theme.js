import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B1F28',
      light: '#C4404A',
      dark: '#6B1219',
    },
    secondary: {
      main: '#C2D4C4',
    },
    background: {
      default: '#F5EFE0',
      paper: '#FAF6EE',
    },
    text: {
      primary: '#1E1E1E',
      secondary: '#5C4A3A',
      disabled: '#8B7355',
    },
    divider: '#B8A898',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#9B1F28',
          '&:hover': { backgroundColor: '#6B1219' },
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
