import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../utils/supabase-client';
import TechBadge from '../components/ui/tech-badge';

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

/* 프로젝트별 썸네일 object-position 설정 */
const IMAGE_POSITIONS = {
  WinterLog: 'top center',
  FitBuddy: 'center center',
};

/**
 * ProjectCard - 가로형 프로젝트 카드 (세로 리스트 배치)
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
  const imagePosition = IMAGE_POSITIONS[project.title] || 'center center';

  return (
    <Card
      onClick={() => onNavigate(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onNavigate(project);
        }
      }}
      role='link'
      tabIndex={0}
      aria-label={`${project.title} 프로젝트 상세 보기`}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.18s ease',
        '&:hover': {
          transform: 'translate(-3px, -3px)',
          boxShadow: '7px 7px 0px var(--color-border)',
        },
        '&:active': {
          transform: 'translate(0px, 0px)',
          boxShadow: '2px 2px 0px var(--color-border)',
        },
        '&:focus-visible': {
          outline: '3px solid var(--color-primary)',
          outlineOffset: '2px',
        },
      }}
    >
      {/* 이미지 영역 */}
      <Box
        sx={{
          width: { xs: '100%', md: 280 },
          height: { xs: 200, md: 'auto' },
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          minHeight: { md: 210 },
        }}
      >
        {!imgError ? (
          <Box
            component='img'
            src={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: imagePosition,
              display: 'block',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'var(--color-bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'var(--color-border-light)', fontSize: '2.5rem' }}>🖥️</Typography>
          </Box>
        )}
        {project.is_featured && (
          <Box sx={{ position: 'absolute', top: 10, right: 12 }}>
            <StarIcon
              sx={{
                color: '#F4845F',
                fontSize: '1.3rem',
                filter: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.35))',
              }}
            />
          </Box>
        )}
      </Box>

      {/* 콘텐츠 영역 */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: { xs: 2.5, md: 3 },
        }}
      >
        {/* 제목 + 타입 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            size='small'
            sx={{
              border: '1.5px solid var(--color-border)',
              bgcolor: 'transparent',
              fontWeight: 600,
              fontSize: '0.65rem',
              flexShrink: 0,
            }}
          />
        </Box>

        {/* 설명 */}
        <Typography
          sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.9rem', flex: 1 }}
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
          sx={{ display: 'flex', gap: 1 }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {project.detail_url && (
            <Button
              size='small'
              startIcon={<OpenInNewIcon />}
              href={project.detail_url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                bgcolor: 'var(--color-bg-card)',
                color: 'var(--color-text-primary)',
                border: '2px solid var(--color-border)',
                boxShadow: '3px 3px 0px var(--color-border)',
                fontSize: '0.75rem',
                '&:hover': {
                  bgcolor: '#F4845F',
                  boxShadow: '1px 1px 0px var(--color-border)',
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
                bgcolor: 'var(--color-bg-card)',
                color: 'var(--color-text-primary)',
                border: '2px solid var(--color-border)',
                boxShadow: '3px 3px 0px var(--color-border)',
                fontSize: '0.75rem',
                '&:hover': {
                  bgcolor: 'var(--color-btn-hover)',
                  boxShadow: '1px 1px 0px var(--color-border)',
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
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setFetchError(true);
        } else {
          setProjects(data || []);
        }
        setLoading(false);
      })
      .catch(() => {
        if (ignore) return;
        setFetchError(true);
        setLoading(false);
      });

    return () => { ignore = true; };
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
      <Container maxWidth='md'>
        {/* 타이틀 */}
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
            component='h1'
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
        ) : fetchError ? (
          <Typography sx={{ color: 'var(--color-text-secondary)', textAlign: 'center', py: 6 }}>
            프로젝트 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </Typography>
        ) : (
          /* 세로 리스트 */
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onNavigate={handleNavigate} />
            ))}
            {projects.length === 0 && (
              <Typography sx={{ color: 'var(--color-text-secondary)', textAlign: 'center', py: 6 }}>
                등록된 프로젝트가 없습니다.
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ProjectsPage;
