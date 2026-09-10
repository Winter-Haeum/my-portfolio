import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function ScrollToTopButton() {
  return (
    <Box
      component='button'
      type='button'
      onClick={scrollToTop}
      aria-label='페이지 맨 위로 이동'
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24 },
        bottom: { xs: 'calc(16px + env(safe-area-inset-bottom))', md: 24 },
        zIndex: 1300,
        width: { xs: 48, md: 52 },
        height: { xs: 48, md: 52 },
        p: 0,
        m: 0,
        appearance: 'none',
        bgcolor: '#F4845F',
        border: '2.5px solid var(--color-border)',
        boxShadow: '4px 4px 0px var(--color-border)',
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
          boxShadow: '6px 6px 0px var(--color-border)',
          bgcolor: '#F5956F',
        },
        '&:active': {
          transform: 'translate(2px, 2px)',
          boxShadow: '2px 2px 0px var(--color-border)',
        },
        '&:focus-visible': {
          outline: '3px solid var(--color-secondary)',
          outlineOffset: '2px',
        },
      }}
    >
      <Typography sx={{ fontSize: '1rem', fontWeight: 900, lineHeight: 1, color: 'var(--color-text-primary)' }}>
        ↑
      </Typography>
      <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.08em', lineHeight: 1, color: 'var(--color-text-primary)' }}>
        TOP
      </Typography>
    </Box>
  );
}

export default ScrollToTopButton;
