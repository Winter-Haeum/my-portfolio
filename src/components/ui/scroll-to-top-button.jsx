import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function ScrollToTopButton() {
  return (
    <Box
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24 },
        bottom: { xs: 'calc(16px + env(safe-area-inset-bottom))', md: 24 },
        zIndex: 1300,
        width: { xs: 48, md: 52 },
        height: { xs: 48, md: 52 },
        bgcolor: '#F4845F',
        border: '2.5px solid #1A1A1A',
        boxShadow: '4px 4px 0px #1A1A1A',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.2,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.15s ease',
        '&:hover': {
          transform: 'translate(-2px, -2px)',
          boxShadow: '6px 6px 0px #1A1A1A',
          bgcolor: '#F5956F',
        },
        '&:active': {
          transform: 'translate(2px, 2px)',
          boxShadow: '2px 2px 0px #1A1A1A',
        },
      }}
    >
      <Typography sx={{ fontSize: '1rem', fontWeight: 900, lineHeight: 1, color: '#1A1A1A' }}>
        ↑
      </Typography>
      <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.08em', lineHeight: 1, color: '#1A1A1A' }}>
        TOP
      </Typography>
    </Box>
  );
}

export default ScrollToTopButton;
