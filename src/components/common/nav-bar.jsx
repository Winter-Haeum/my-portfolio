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
    <AppBar position='sticky' sx={{ bgcolor: 'var(--color-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ fontWeight: 700, color: 'var(--color-bg-primary)', letterSpacing: 1 }}>
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
                color: 'var(--color-bg-primary)',
                fontWeight: 500,
                '&.active': {
                  color: 'var(--color-accent)',
                  borderBottom: '2px solid var(--color-accent)',
                  borderRadius: 0,
                },
                '&:hover': { color: 'var(--color-accent)' },
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
