import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ProjectsPage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'var(--color-bg-secondary)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h2'
          sx={{
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            color: 'var(--color-primary)',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Projects
        </Typography>
        <Card
          sx={{
            bgcolor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            boxShadow: 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' } }}>
              Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
