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
        bgcolor: 'var(--color-bg-secondary)',
        py: { xs: 6, md: 10 },
        borderBottom: '2px solid var(--color-border)',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-primary)',
            border: '2px solid var(--color-border)',
            boxShadow: '4px 4px 0px var(--color-border)',
            px: 3,
            py: 1,
            mb: 2,
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, color: 'var(--color-text-primary)', m: 0 }}
          >
            Projects
          </Typography>
        </Box>
        <Typography sx={{ color: 'var(--color-text-muted)', mb: 4, fontSize: '0.95rem' }}>
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 &apos;더 보기&apos; 버튼이 들어갈 예정입니다.
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {PLACEHOLDER_PROJECTS.map((project) => (
            <Grid size={{ xs: 12, md: 4 }} key={project.id}>
              <Card
                sx={{
                  bgcolor: 'var(--color-bg-card)',
                  height: 140,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardContent>
                  <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
                    {project.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            sx={{
              bgcolor: '#FFB36B',
              color: '#222',
              border: '2px solid #222',
              borderRadius: '8px',
              boxShadow: '3px 3px 0px #222',
              fontWeight: 700,
              fontSize: '0.95rem',
              textTransform: 'none',
              px: 4,
              py: 1.2,
              transition: 'background-color 0.18s, box-shadow 0.18s, transform 0.15s',
              '&:hover': {
                bgcolor: '#FFC58A',
                boxShadow: '1px 1px 0px #222',
                transform: 'translate(1px, 1px)',
              },
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
