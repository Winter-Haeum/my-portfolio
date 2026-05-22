import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../utils/supabase-client';
import TechBadge from '../components/ui/tech-badge';

function ProjectDetailPage() {
  const { slug } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState(state?.project || null);
  const [loading, setLoading] = useState(!state?.project);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      supabase
        .from('portfolio_projects')
        .select('*')
        .ilike('title', slug.replace(/-/g, ' '))
        .single()
        .then(({ data }) => {
          setProject(data);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ bgcolor: 'var(--color-bg-primary)', minHeight: 'calc(100vh - 64px)', py: 8 }}>
        <Container maxWidth='md'>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            프로젝트를 찾을 수 없습니다.
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/projects')}
            sx={{
              bgcolor: '#fff',
              color: '#1A1A1A',
              border: '2px solid #1A1A1A',
              boxShadow: '3px 3px 0px #1A1A1A',
              '&:hover': {
                bgcolor: '#F5F5F5',
                boxShadow: '1px 1px 0px #1A1A1A',
                transform: 'translate(2px, 2px)',
              },
            }}
          >
            목록으로
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='md'>
        {/* 뒤로가기 버튼 */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            bgcolor: '#fff',
            color: '#1A1A1A',
            border: '2px solid #1A1A1A',
            boxShadow: '3px 3px 0px #1A1A1A',
            '&:hover': {
              bgcolor: '#F5F5F5',
              boxShadow: '1px 1px 0px #1A1A1A',
              transform: 'translate(2px, 2px)',
            },
          }}
        >
          Back
        </Button>

        {/* 대표 이미지 */}
        {!imgError ? (
          <Box
            component='img'
            src={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              width: '100%',
              height: { xs: 220, md: 420 },
              objectFit: 'cover',
              display: 'block',
              border: '2px solid #1A1A1A',
              boxShadow: '6px 6px 0px #1A1A1A',
              mb: 4,
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: { xs: 220, md: 420 },
              bgcolor: '#FAF0E8',
              border: '2px solid #1A1A1A',
              boxShadow: '6px 6px 0px #1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Typography sx={{ color: '#1A1A1A33', fontSize: '4rem' }}>🖥️</Typography>
          </Box>
        )}

        {/* 제목 + 타입 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 1.5,
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
          >
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            sx={{
              border: '2px solid #1A1A1A',
              boxShadow: '2px 2px 0px #1A1A1A',
              bgcolor: 'transparent',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          />
        </Box>

        {/* 설명 */}
        <Typography
          sx={{
            color: 'var(--color-text-secondary)',
            lineHeight: 1.85,
            mb: 4,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
          }}
        >
          {project.description}
        </Typography>

        {/* 기술 스택 섹션 */}
        <Box
          sx={{
            bgcolor: '#fff',
            border: '2px solid #1A1A1A',
            boxShadow: '4px 4px 0px #1A1A1A',
            p: { xs: 2.5, md: 3 },
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: '#F5C842',
              border: '2px solid #1A1A1A',
              boxShadow: '2px 2px 0px #1A1A1A',
              px: 2,
              py: 0.3,
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#1A1A1A' }}>
              기술 스택
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {project.tech_stack?.map((tech) => (
              <TechBadge key={tech} tech={tech} size='md' />
            ))}
          </Box>
        </Box>

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {project.detail_url && (
            <Button
              startIcon={<OpenInNewIcon />}
              href={project.detail_url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                bgcolor: '#fff',
                color: '#1A1A1A',
                border: '2px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                px: 3,
                py: 1.2,
                fontSize: '0.95rem',
                '&:hover': {
                  bgcolor: '#F4845F',
                  boxShadow: '2px 2px 0px #1A1A1A',
                  transform: 'translate(2px, 2px)',
                },
              }}
            >
              Live Demo
            </Button>
          )}
          {project.github_url && (
            <Button
              startIcon={<GitHubIcon />}
              href={project.github_url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                bgcolor: '#fff',
                color: '#1A1A1A',
                border: '2px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                px: 3,
                py: 1.2,
                fontSize: '0.95rem',
                '&:hover': {
                  bgcolor: '#E5E5E5',
                  boxShadow: '2px 2px 0px #1A1A1A',
                  transform: 'translate(2px, 2px)',
                },
              }}
            >
              GitHub
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectDetailPage;
