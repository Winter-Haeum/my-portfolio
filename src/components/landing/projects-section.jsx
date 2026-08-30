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
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../../utils/supabase-client';
import TechBadge from '../ui/tech-badge';
import characterProjectsImg from '../../assets/character-projects.png';

const HOME_CARD_LIMIT = 3;

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

const IMAGE_POSITIONS = {
  WinterLog: 'top center',
  FitBuddy: 'center center',
  'Winter Dev Archive': 'top center',
};

const PROJECT_STATUS_MAP = {
  'WinterLog': '완료',
  'FitBuddy': '완료',
};

const STATUS_STYLE = {
  '완료': { bgcolor: '#4BAE76', color: '#fff' },
  '진행중': { bgcolor: '#F4845F', color: '#fff' },
  '기획중': { bgcolor: '#F5C842', color: '#1A1A1A' },
};

function getProjectStatus(title) {
  return PROJECT_STATUS_MAP[title] || '완료';
}

/**
 * ProjectCard - 홈 Projects 섹션 카드
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
  const status = getProjectStatus(project.title);
  const statusStyle = STATUS_STYLE[status];

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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        bgcolor: 'var(--color-bg-card)',
        border: '2px solid var(--color-border)',
        boxShadow: '4px 4px 0px var(--color-border)',
        borderRadius: '4px',
        transition: 'all 0.18s ease',
        '&:hover': {
          transform: 'translate(-4px, -4px)',
          boxShadow: '8px 8px 0px var(--color-border)',
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
      <Box sx={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
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
              objectPosition: imagePosition,
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              bgcolor: 'var(--color-bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'var(--color-border-light)', fontSize: '2.5rem' }}>🖥️</Typography>
          </Box>
        )}
        {/* 상태 배지 */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            px: 1,
            py: 0.3,
            bgcolor: statusStyle.bgcolor,
            border: '1.5px solid var(--color-border)',
            fontSize: '0.65rem',
            fontWeight: 700,
            color: statusStyle.color,
            lineHeight: 1.4,
          }}
        >
          { status }
        </Box>
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

      <CardContent
        sx={{
          p: { xs: 2, md: 2.5 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{ fontWeight: 800, fontSize: { xs: '1rem', md: '1.1rem' }, color: 'var(--color-text-primary)', lineHeight: 1.3 }}
          >
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            size='small'
            sx={{
              border: '1.5px solid var(--color-border)',
              bgcolor: 'transparent',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              fontSize: '0.62rem',
              flexShrink: 0,
            }}
          />
        </Box>

        <Typography sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, fontSize: '0.85rem', flex: 1 }}>
          {project.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {project.tech_stack?.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </Box>

        <Box
          sx={{ display: 'flex', gap: 1, pt: 0.3 }}
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
                fontSize: '0.72rem',
                '&:hover': {
                  bgcolor: '#F4845F',
                  color: '#fff',
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
                fontSize: '0.72rem',
                '&:hover': {
                  bgcolor: 'var(--color-bg-secondary)',
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

/** ComingSoonCard - 빈 자리 플레이스홀더 카드 */
function ComingSoonCard() {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '2px dashed var(--color-border-light)',
        boxShadow: 'none',
        bgcolor: 'var(--color-bg-primary)',
        cursor: 'default',
      }}
    >
      <Box
        sx={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--color-bg-secondary)',
          flexShrink: 0,
        }}
      >
        <Typography sx={{ color: 'var(--color-border-light)', fontSize: '2.5rem' }}>🚀</Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 2.5 },
          gap: 0.8,
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-border-light)' }}>
          Coming Soon
        </Typography>
        <Typography sx={{ fontSize: '0.82rem', color: 'var(--color-border-light)', textAlign: 'center', lineHeight: 1.5 }}>
          다음 프로젝트를 준비 중입니다
        </Typography>
      </Box>
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
      .limit(HOME_CARD_LIMIT)
      .then(({ data }) => {
        setProjects(data || []);
        setLoading(false);
      });
  }, []);

  const handleNavigate = (project) => {
    navigate(`/projects/${slugify(project.title)}`, { state: { project } });
  };

  const comingSoonCount = Math.max(0, HOME_CARD_LIMIT - projects.length);

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
        {/* 섹션 타이틀 + 캐릭터 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              bgcolor: 'var(--color-primary)',
              border: '2px solid var(--color-border)',
              boxShadow: '4px 4px 0px var(--color-border)',
              px: 3,
              py: 1,
            }}
          >
            <Typography
              variant='h2'
              sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, color: 'var(--color-text-primary)', m: 0 }}
            >
              Projects
            </Typography>
          </Box>
          <Box
            component='img'
            src={ characterProjectsImg }
            alt='Projects 캐릭터'
            sx={{
              width: { xs: 124, md: 184 },
              height: 'auto',
              objectFit: 'contain',
              flexShrink: 0,
              transform: 'translateY(32px)',
            }}
          />
        </Box>

        {/* 콘텐츠 박스 */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              border: '2px solid var(--color-border)',
              boxShadow: '4px 4px 0px var(--color-border)',
              bgcolor: 'var(--color-bg-card)',
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress color='primary' />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {projects.map((project) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                    <ProjectCard project={project} onNavigate={handleNavigate} />
                  </Grid>
                ))}
                {Array.from({ length: comingSoonCount }).map((_, i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`coming-soon-${i}`}>
                    <ComingSoonCard />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>

        {/* 더 보기 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            onClick={() => navigate('/projects')}
            sx={{
              bgcolor: 'var(--color-primary)',
              color: '#fff',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              boxShadow: '3px 3px 0px var(--color-border)',
              fontWeight: 700,
              fontSize: '0.95rem',
              textTransform: 'none',
              px: 4,
              py: 1.2,
              transition: 'background-color 0.18s, box-shadow 0.18s, transform 0.15s',
              '&:hover': {
                bgcolor: 'var(--color-primary-dark)',
                boxShadow: '1px 1px 0px var(--color-border)',
                transform: 'translate(1px, 1px)',
              },
            }}
          >
            프로젝트 전체보기 →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
