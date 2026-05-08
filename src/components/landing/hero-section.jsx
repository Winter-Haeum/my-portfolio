import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function HeroSection() {
  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-secondary)',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
        borderBottom: '2px solid var(--color-border)',
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '2rem', md: '3.5rem' },
            color: 'var(--color-primary)',
            fontWeight: 700,
            mb: 2,
          }}
        >
          Hero 섹션
        </Typography>
        <Typography
          sx={{
            color: 'var(--color-text-secondary)',
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.8,
          }}
        >
          여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default HeroSection;
