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
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../utils/supabase-client';
import TechBadge from '../components/ui/tech-badge';

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

/**
 * ProjectCard - 통합 프로젝트 카드 (2열 그리드)
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 [Required]
 * @param {function} onNavigate - 카드 클릭 핸들러 [Required]
 *
 * Example usage:
 * <ProjectCard project={project} onNavigate={handleNavigate} />
 */
function ProjectCard({ project, onNavigate }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      onClick={() => onNavigate(project)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        '&:hover': {
          transform: 'translate(-4px, -4px)',
          boxShadow: '8px 8px 0px #1A1A1A',
        },
        '&:active': {
          transform: 'translate(0px, 0px)',
          boxShadow: '2px 2px 0px #1A1A1A',
        },
      }}
    >
      {/* 이미지 영역 */}
      <Box sx={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {!imgError ? (
          <CardMedia
            component='img'
            image={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              height: 240,
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          />
        ) : (
          <Box
            sx={{
              height: 240,
              bgcolor: '#FAF0E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#1A1A1A22', fontSize: '3rem' }}>🖥️</Typography>
          </Box>
        )}
        {project.is_featured && (
          <Box sx={{ position: 'absolute', top: 10, right: 12 }}>
            <StarIcon
              sx={{
                color: '#F4845F',
                fontSize: '1.4rem',
                filter: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.35))',
              }}
            />
          </Box>
        )}
      </Box>

      {/* 카드 내용 */}
      <CardContent
        sx={{
          p: { xs: 2.5, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {/* 제목 + 타입 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              color: '#1A1A1A',
              lineHeight: 1.3,
            }}
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
              fontSize: '0.65rem',
              flexShrink: 0,
            }}
          />
        </Box>

        {/* 설명 */}
        <Typography
          sx={{
            color: '#555',
            lineHeight: 1.7,
            fontSize: '0.88rem',
            flex: 1,
          }}
        >
          {project.description}
        </Typography>

        {/* 기술 스택 */}
        <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
          {project.tech_stack?.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </Box>

        {/* 버튼 — stopPropagation으로 카드 클릭과 분리 */}
        <Box
          sx={{ display: 'flex', gap: 1, pt: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          {project.detail_url && (
            <Button
              size='small'
              startIcon={<OpenInNewIcon />}
              href={project.detail_url}
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
          {project.github_url && (
            <Button
              size='small'
              startIcon={<GitHubIcon />}
              href={project.github_url}
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
            border: '2px solid #1A1A1A',
            boxShadow: '4px 4px 0px #1A1A1A',
            px: 3,
            py: 1,
            mb: 4,
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, color: '#1A1A1A', m: 0 }}
          >
            Projects
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color='primary' />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6 }}>
                <ProjectCard project={project} onNavigate={handleNavigate} />
              </Grid>
            ))}
            {projects.length === 0 && (
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
                  등록된 프로젝트가 없습니다.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default ProjectsPage;
