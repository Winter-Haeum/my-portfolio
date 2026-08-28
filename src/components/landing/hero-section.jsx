import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import characterImg from '../../assets/character-hero.png';

const TECH_BADGES = [
  'React',
  'JavaScript',
  'HTML / CSS',
  'MUI',
  'Git',
  'AI 활용',
];

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        py: { xs: 8, md: 14 },
        borderBottom: '2px solid var(--color-border)',
        position: 'relative',
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={{ xs: 5, md: 4 }} sx={{ alignItems: 'center' }}>

          {/* ── 왼쪽: 텍스트 + 버튼 ── */}
          <Grid size={{ xs: 12, md: 6 }}>

            {/* 포지션 배지 */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'var(--color-secondary)',
                border: '2px solid var(--color-border)',
                boxShadow: '3px 3px 0px var(--color-border)',
                px: 2, py: 0.6, mb: 3,
              }}
            >
              {/* 초록 점 (재직 가능 상태 표시) */}
              <Box
                sx={{
                  width: 8, height: 8,
                  bgcolor: '#1A1A1A',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Frontend Developer
              </Typography>
            </Box>

            {/* 이름 */}
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '3rem', md: '4.2rem' },
                fontWeight: 900,
                color: 'var(--color-text-primary)',
                lineHeight: 1.05,
                mb: 2.5,
                letterSpacing: '-0.01em',
              }}
            >
              장미진
            </Typography>

            {/* 서브 메시지 */}
            <Box
              sx={{
                borderLeft: '4px solid var(--color-primary)',
                pl: 2, mb: { xs: 3.5, md: 4.5 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.08rem' },
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.85,
                }}
              >
                교사의 섬세함으로 사용자를 이해하고,<br />
                개발자의 시선으로 문제를 해결합니다.
              </Typography>
            </Box>

            {/* CTA 버튼 */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: { xs: 4, md: 5 } }}>
              <Button
                endIcon={ <ArrowForwardIcon /> }
                onClick={ () => navigate('/projects') }
                sx={{
                  bgcolor: 'var(--color-primary)',
                  color: '#fff',
                  border: '2px solid var(--color-border)',
                  borderRadius: '4px',
                  boxShadow: '4px 4px 0px var(--color-border)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  px: 3, py: 1.2,
                  '&:hover': {
                    bgcolor: 'var(--color-primary-dark)',
                    boxShadow: '1px 1px 0px var(--color-border)',
                    transform: 'translate(3px, 3px)',
                  },
                }}
              >
                프로젝트 보기
              </Button>
              <Button
                endIcon={ <EmailIcon sx={{ fontSize: '1.1rem !important' }} /> }
                onClick={ () => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  bgcolor: 'var(--color-bg-card)',
                  color: 'var(--color-text-primary)',
                  border: '2px solid var(--color-border)',
                  borderRadius: '4px',
                  boxShadow: '4px 4px 0px var(--color-border)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  px: 3, py: 1.2,
                  '&:hover': {
                    bgcolor: 'var(--color-bg-secondary)',
                    boxShadow: '1px 1px 0px var(--color-border)',
                    transform: 'translate(3px, 3px)',
                  },
                }}
              >
                연락하기
              </Button>
              <Button
                startIcon={ <GitHubIcon /> }
                className='hero-github-btn'
                onClick={ () => window.open('https://github.com/Winter-Haeum', '_blank') }
                sx={{
                  bgcolor: 'var(--color-text-primary)',
                  color: '#fff',
                  border: '2px solid var(--color-border)',
                  borderRadius: '4px',
                  boxShadow: '4px 4px 0px var(--color-border)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  px: 3, py: 1.2,
                  '&:hover': {
                    bgcolor: '#333',
                    boxShadow: '1px 1px 0px var(--color-border)',
                    transform: 'translate(3px, 3px)',
                  },
                }}
              >
                GitHub
              </Button>
            </Box>

            {/* 기술 스택 배지 */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              { TECH_BADGES.map((badge) => (
                <Box
                  key={ badge }
                  sx={{
                    px: 1.5, py: 0.5,
                    bgcolor: 'var(--color-bg-secondary)',
                    border: '2px solid var(--color-border)',
                    boxShadow: '2px 2px 0px var(--color-border)',
                  }}
                >
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                    { badge }
                  </Typography>
                </Box>
              )) }
            </Box>

          </Grid>

          {/* ── 오른쪽: 캐릭터 이미지 ── */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: -1, md: 0 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: { xs: 220, md: 320 },
                  height: { xs: 220, md: 320 },
                  border: '3px solid var(--color-border)',
                  boxShadow: '10px 10px 0px var(--color-border)',
                  bgcolor: 'var(--color-bg-secondary)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component='img'
                  src={ characterImg }
                  alt='겨울하음 캐릭터'
                  sx={{ width: '88%', height: '88%', objectFit: 'contain' }}
                />
              </Box>
            </Box>
          </Grid>

        </Grid>

        {/* 스크롤 인디케이터 */}
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: 5, md: 8 },
          }}
        >
          <Box
            onClick={ () => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' }) }
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.4,
              cursor: 'pointer',
              opacity: 0.55,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 },
            }}
          >
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              scroll
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                color: 'var(--color-primary)',
                fontSize: '1.6rem',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(6px)' },
                },
                animation: 'bounce 1.6s ease-in-out infinite',
              }}
            />
          </Box>
        </Box>

      </Container>
    </Box>
  );
}

export default HeroSection;
