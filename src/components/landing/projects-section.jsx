import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../../utils/supabase-client';

const CARD_SX = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.15s ease',
  '&:hover': {
    transform: 'translate(-3px, -3px)',
    boxShadow: '7px 7px 0px var(--color-border)',
  },
};

/**
 * ProjectCard - 홈 Projects 섹션용 카드
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 [Required]
 */
function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card sx={CARD_SX}>
      <Box sx={{ overflow: 'hidden', position: 'relative' }}>
        {!imgError ? (
          <CardMedia
            component='img'
            image={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              height: 200,
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              bgcolor: '#F4845F22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#1A1A1A66', fontSize: '2.5rem' }}>🖥️</Typography>
          </Box>
        )}
        {project.is_featured && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: '#F4845F',
              border: '2px solid #1A1A1A',
              boxShadow: '2px 2px 0px #1A1A1A',
              px: 1.2,
              py: 0.2,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#1A1A1A' }}>
              ⭐ Featured
            </Typography>
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            size='small'
            sx={{ border: '1.5px solid #1A1A1A', bgcolor: 'transparent', fontWeight: 600, fontSize: '0.65rem' }}
          />
        </Box>
        <Typography sx={{ color: 'var(--color-text-muted)', lineHeight: 1.6, mb: 1.5, fontSize: '0.88rem', flex: 1 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size='small'
              sx={{
                bgcolor: 'var(--color-primary, #F4845F)',
                color: '#1A1A1A',
                border: '1.5px solid #1A1A1A',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {project.detail_url && (
            <Button
              variant='contained'
              color='primary'
              size='small'
              startIcon={<OpenInNewIcon />}
              href={project.detail_url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{ fontSize: '0.75rem' }}
            >
              Live Demo
            </Button>
          )}
          {project.github_url && (
            <Button
              variant='outlined'
              size='small'
              startIcon={<GitHubIcon />}
              href={project.github_url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{ fontSize: '0.75rem' }}
            >
              GitHub
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .limit(3)
      .then(({ data }) => {
        setProjects(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-secondary)',
        py: { xs: 6, md: 10 },
        borderBottom: '2px solid var(--color-border)',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-primary)',
            border: '2px solid var(--color-border)',
            boxShadow: '4px 4px 0px var(--color-border)',
            px: 3,
            py: 1,
            mb: 4,
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, color: 'var(--color-text-primary)', m: 0 }}
          >
            Projects
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color='primary' />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {projects.map((project) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            onClick={() => navigate('/projects')}
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
