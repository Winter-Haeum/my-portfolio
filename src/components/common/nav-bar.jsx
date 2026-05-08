import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

function NavBar() {
  return (
    <AppBar
      position='sticky'
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        borderBottom: '2px solid var(--color-border)',
        boxShadow: '0 2px 0px var(--color-border)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            letterSpacing: 1,
            px: 1.5,
            py: 0.5,
            border: '2px solid var(--color-border)',
            bgcolor: 'var(--color-primary)',
            boxShadow: '3px 3px 0px var(--color-border)',
          }}
        >
          Portfolio
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.to === '/'}
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: 700,
                border: '2px solid transparent',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  transform: 'none',
                  bgcolor: 'var(--color-primary-light)',
                  border: '2px solid var(--color-border)',
                },
                '&.active': {
                  bgcolor: 'var(--color-secondary)',
                  border: '2px solid var(--color-border)',
                  boxShadow: '2px 2px 0px var(--color-border)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
