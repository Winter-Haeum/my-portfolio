import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function AboutMeSection() {
  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        py: { xs: 6, md: 10 },
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h2'
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: 'var(--color-primary)',
            mb: 3,
            textAlign: 'center',
          }}
        >
          About Me
        </Typography>
        <Card
          sx={{
            bgcolor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            boxShadow: 'none',
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              여기는 About Me 섹션입니다. 간단한 자기소개와 &apos;더 알아보기&apos; 버튼이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            sx={{
              bgcolor: 'var(--color-button-primary)',
              '&:hover': { bgcolor: 'var(--color-button-hover)' },
              px: 4,
              py: 1.2,
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutMeSection;
