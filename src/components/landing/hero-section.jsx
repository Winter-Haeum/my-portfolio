import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function HeroSection() {
  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
        borderBottom: '2px solid var(--color-border)',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-primary)',
            border: '3px solid var(--color-border)',
            boxShadow: '6px 6px 0px var(--color-border)',
            px: { xs: 3, md: 6 },
            py: { xs: 2, md: 3 },
            mb: 4,
          }}
        >
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              color: 'var(--color-text-primary)',
              fontWeight: 900,
              m: 0,
            }}
          >
            Hero 섹션
          </Typography>
        </Box>
        <Typography
          sx={{
            color: 'var(--color-text-secondary)',
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.8,
            maxWidth: 560,
            mx: 'auto',
          }}
        >
          여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default HeroSection;
