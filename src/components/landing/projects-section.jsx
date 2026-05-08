import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const PLACEHOLDER_PROJECTS = [
  { id: 1, title: '프로젝트 1' },
  { id: 2, title: '프로젝트 2' },
  { id: 3, title: '프로젝트 3' },
];

function ProjectsSection() {
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
            mb: 1,
            textAlign: 'center',
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            mb: 4,
            fontSize: '0.95rem',
          }}
        >
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 &apos;더 보기&apos; 버튼이 들어갈 예정입니다.
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {PLACEHOLDER_PROJECTS.map((project) => (
            <Grid size={{ xs: 12, md: 4 }} key={project.id}>
              <Card
                sx={{
                  bgcolor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'none',
                  height: 140,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardContent>
                  <Typography sx={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='outlined'
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              '&:hover': { borderColor: 'var(--color-button-hover)', color: 'var(--color-button-hover)' },
              px: 4,
              py: 1.2,
            }}
          >
            더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
