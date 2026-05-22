import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import TechBadge from '../components/ui/tech-badge';

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

const CARD_HOVER_SX = {
  transition: 'all 0.18s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translate(-4px, -4px)',
    boxShadow: '8px 8px 0px #1A1A1A',
  },
  '&:active': {
    transform: 'translate(0px, 0px)',
    boxShadow: '2px 2px 0px #1A1A1A',
  },
};

/**
 * ActionButtons - Live Demo / GitHub 버튼
 *
 * Props:
 * @param {string} detailUrl - 라이브 데모 URL [Optional]
 * @param {string} githubUrl - GitHub URL [Optional]
 */
function ActionButtons({ detailUrl, githubUrl }) {
  return (
    <Box
      sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
      onClick={(e) => e.stopPropagation()}
    >
      {detailUrl && (
        <Button
          size='small'
          startIcon={<OpenInNewIcon />}
          href={detailUrl}
          target='_blank'
          rel='noopener noreferrer'
          sx={{
            bgcolor: '#fff',
            color: '#1A1A1A',
            border: '2px solid #1A1A1A',
            boxShadow: '3px 3px 0px #1A1A1A',
            fontSize: '0.75rem',
            '&:hover': {
              bgcolor: '#F4845F',
              boxShadow: '1px 1px 0px #1A1A1A',
              transform: 'translate(2px, 2px)',
            },
          }}
        >
          Live Demo
        </Button>
      )}
      {githubUrl && (
        <Button
          size='small'
          startIcon={<GitHubIcon />}
          href={githubUrl}
          target='_blank'
          rel='noopener noreferrer'
          sx={{
            bgcolor: '#fff',
            color: '#1A1A1A',
            border: '2px solid #1A1A1A',
            boxShadow: '3px 3px 0px #1A1A1A',
            fontSize: '0.75rem',
            '&:hover': {
              bgcolor: '#E5E5E5',
              boxShadow: '1px 1px 0px #1A1A1A',
              transform: 'translate(2px, 2px)',
            },
          }}
        >
          GitHub
        </Button>
      )}
    </Box>
  );
}

/**
 * FeaturedCard - 대표 프로젝트 카드 (전체 너비)
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 [Required]
 * @param {function} onNavigate - 카드 클릭 시 호출 함수 [Required]
 */
function FeaturedCard({ project, onNavigate }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card sx={{ mb: 4, ...CARD_HOVER_SX }} onClick={() => onNavigate(project)}>
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
              '&:hover': { transform: 'scale(1.02)' },
            }}
          />
        ) : (
          <Box
            sx={{
              height: { xs: 220, md: 420 },
              bgcolor: '#FAF0E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#1A1A1A33', fontSize: '3.5rem' }}>🖥️</Typography>
          </Box>
        )}
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            bgcolor: '#F4845F',
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0px #1A1A1A',
            px: 1.5,
            py: 0.3,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '0.73rem', color: '#1A1A1A' }}>
            ⭐ Featured
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 1,
            mb: 1.5,
          }}
        >
          <Typography
            variant='h3'
            sx={{ fontWeight: 800, fontSize: { xs: '1.3rem', md: '1.7rem' } }}
          >
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            size='small'
            sx={{
              border: '1.5px solid #1A1A1A',
              bgcolor: 'transparent',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
        </Box>
        <Typography
          sx={{
            color: 'text.secondary',
            lineHeight: 1.75,
            mb: 2.5,
            fontSize: { xs: '0.9rem', md: '0.98rem' },
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.7, flexWrap: 'wrap', mb: 2.5 }}>
          {project.tech_stack?.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </Box>
        <ActionButtons detailUrl={project.detail_url} githubUrl={project.github_url} />
      </CardContent>
    </Card>
  );
}

/**
 * ProjectCard - 일반 프로젝트 카드 (그리드)
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 [Required]
 * @param {function} onNavigate - 카드 클릭 시 호출 함수 [Required]
 */
function ProjectCard({ project, onNavigate }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...CARD_HOVER_SX }}
      onClick={() => onNavigate(project)}
    >
      <Box sx={{ overflow: 'hidden' }}>
        {!imgError ? (
          <CardMedia
            component='img'
            image={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              height: 220,
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          />
        ) : (
          <Box
            sx={{
              height: 220,
              bgcolor: '#FAF0E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#1A1A1A33', fontSize: '2.5rem' }}>🖥️</Typography>
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 0.5,
          }}
        >
          <Typography variant='h3' sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            size='small'
            sx={{
              border: '1.5px solid #1A1A1A',
              bgcolor: 'transparent',
              fontWeight: 600,
              fontSize: '0.65rem',
            }}
          />
        </Box>
        <Typography
          sx={{
            color: 'text.secondary',
            lineHeight: 1.65,
            mb: 1.5,
            fontSize: '0.88rem',
            flex: 1,
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
          {project.tech_stack?.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </Box>
        <ActionButtons detailUrl={project.detail_url} githubUrl={project.github_url} />
      </CardContent>
    </Card>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleNavigate = (project) => {
    navigate(`/projects/${slugify(project.title)}`, { state: { project } });
  };

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
            {featured.map((project) => (
              <FeaturedCard key={project.id} project={project} onNavigate={handleNavigate} />
            ))}

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
                      <ProjectCard project={project} onNavigate={handleNavigate} />
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
