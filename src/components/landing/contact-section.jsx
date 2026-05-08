import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ContactSection() {
  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-secondary)',
        py: { xs: 6, md: 10 },
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
          Contact
        </Typography>
        <Card
          sx={{
            bgcolor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            boxShadow: 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ContactSection;
