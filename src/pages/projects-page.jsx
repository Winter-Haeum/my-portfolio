import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../utils/supabase-client';

const CARD_SX = {
  transition: 'all 0.15s ease',
  '&:hover': {
    transform: 'translate(-3px, -3px)',
    boxShadow: '7px 7px 0px #1A1A1A',
  },
};

function TechBadge({ tech }) {
  return (
    <Chip
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
  );
}

function ProjectButtons({ detailUrl, githubUrl }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {detailUrl && (
        <Button
          variant='contained'
          color='primary'
          size='small'
          startIcon={<OpenInNewIcon />}
          href={detailUrl}
          target='_blank'
          rel='noopener noreferrer'
          sx={{ fontSize: '0.75rem' }}
        >
          Live Demo
        </Button>
      )}
      {githubUrl && (
        <Button
          variant='outlined'
          size='small'
          startIcon={<GitHubIcon />}
          href={githubUrl}
          target='_blank'
          rel='noopener noreferrer'
          sx={{ fontSize: '0.75rem' }}
        >
          GitHub
        </Button>
      )}
    </Box>
  );
}

/**
 * FeaturedCard - 대표 프로젝트 카드 (전체 너비, 이미지 420px)
 */
function FeaturedCard({ project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card sx={{ mb: 4, ...CARD_SX }}>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {!imgError ? (
          <CardMedia
            component='img'
            image={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              height: { xs: 220, md: 420 },
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          />
        ) : (
          <Box
            sx={{
              height: { xs: 220, md: 420 },
              bgcolor: '#F4845F22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#1A1A1A66', fontSize: '3rem' }}>🖥️</Typography>
          </Box>
        )}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: '#F4845F',
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0px #1A1A1A',
            px: 1.5,
            py: 0.3,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#1A1A1A' }}>
            ⭐ Featured
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Typography variant='h3' sx={{ fontWeight: 700, fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            size='small'
            sx={{ border: '1.5px solid #1A1A1A', bgcolor: 'transparent', fontWeight: 600, fontSize: '0.7rem' }}
          />
        </Box>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.7, flexWrap: 'wrap', mb: 2.5 }}>
          {project.tech_stack?.map((tech) => <TechBadge key={tech} tech={tech} />)}
        </Box>
        <ProjectButtons detailUrl={project.detail_url} githubUrl={project.github_url} />
      </CardContent>
    </Card>
  );
}

/**
 * ProjectCard - 일반 프로젝트 카드 (그리드 배치, 이미지 260px)
 */
function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...CARD_SX }}>
      <Box sx={{ overflow: 'hidden' }}>
        {!imgError ? (
          <CardMedia
            component='img'
            image={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              height: 260,
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          />
        ) : (
          <Box sx={{ height: 260, bgcolor: '#F4845F22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: '#1A1A1A66', fontSize: '2.5rem' }}>🖥️</Typography>
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography variant='h3' sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            size='small'
            sx={{ border: '1.5px solid #1A1A1A', bgcolor: 'transparent', fontWeight: 600, fontSize: '0.65rem' }}
          />
        </Box>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1.5, fontSize: '0.88rem', flex: 1 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
          {project.tech_stack?.map((tech) => <TechBadge key={tech} tech={tech} />)}
        </Box>
        <ProjectButtons detailUrl={project.detail_url} githubUrl={project.github_url} />
      </CardContent>
    </Card>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .then(({ data }) => {
        setProjects(data || []);
        setLoading(false);
      });
  }, []);

  const featured = projects.filter((p) => p.is_featured);
  const rest = projects.filter((p) => !p.is_featured);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'var(--color-bg-secondary)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='lg'>
        {/* 섹션 타이틀 */}
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
            sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, color: 'var(--color-text-primary)', m: 0 }}
          >
            Projects
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color='primary' />
          </Box>
        ) : (
          <>
            {/* Featured 프로젝트 */}
            {featured.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}

            {/* 일반 프로젝트 그리드 */}
            {rest.length > 0 && (
              <>
                <Box
                  sx={{
                    display: 'inline-block',
                    bgcolor: '#4BAE76',
                    border: '2px solid #1A1A1A',
                    boxShadow: '3px 3px 0px #1A1A1A',
                    px: 2,
                    py: 0.5,
                    mb: 3,
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1A1A1A' }}>
                    More Projects
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {rest.map((project) => (
                    <Grid key={project.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                      <ProjectCard project={project} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {projects.length === 0 && (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Typography sx={{ color: 'text.secondary' }}>등록된 프로젝트가 없습니다.</Typography>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default ProjectsPage;
