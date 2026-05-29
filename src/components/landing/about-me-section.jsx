import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import characterImg from '../../assets/character.png';
import { usePortfolio, getSkillIcon, CATEGORY_COLORS } from '../../hooks/portfolio-context';

const HIGHLIGHTS = [
  { emoji: '🏆', text: '학습부문 우수상 수상' },
  { emoji: '🎤', text: '프로젝트 발표 담당 3회' },
  { emoji: '🚀', text: 'WinterLog 개발 중' },
  { emoji: '🚀', text: 'FitBuddy 개발 중' },
];

function AboutMeSection() {
  const navigate = useNavigate();
  const { homeData } = usePortfolio();
  const { basicInfo, devStorySummary, topSkills } = homeData;

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
        {/* 섹션 타이틀 */}
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-secondary)',
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
            About Me
          </Typography>
        </Box>

        {/* 메인 그리드 */}
        <Grid container spacing={3} alignItems='stretch' sx={{ mb: 4 }}>

          {/* ── 왼쪽: 개발 스토리 + 스킬 뱃지 ── */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ bgcolor: 'var(--color-bg-card)', height: '100%' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>

                {/* 나의 개발 스토리 */}
                <Box>
                  <Box
                    sx={{
                      display: 'inline-block',
                      bgcolor: 'var(--color-accent)',
                      border: '2px solid var(--color-border)',
                      boxShadow: '2px 2px 0px var(--color-border)',
                      px: 1.8,
                      py: 0.4,
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-text-primary)' }}>
                      나의 개발 스토리
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.95,
                      fontSize: { xs: '0.93rem', md: '1rem' },
                    }}
                  >
                    { devStorySummary }
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: 'var(--color-border-light)' }} />

                {/* 주요 스킬 뱃지 */}
                <Box>
                  <Typography
                    sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', mb: 1.2, letterSpacing: '0.05em' }}
                  >
                    SKILLS
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
                    { topSkills.map((skill) => (
                      <Box
                        key={ skill.id }
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.7,
                          border: '2px solid var(--color-border)',
                          boxShadow: '2px 2px 0px var(--color-border)',
                          bgcolor: 'var(--color-bg-primary)',
                          px: 1.4,
                          py: 0.7,
                        }}
                      >
                        <Box
                          sx={{
                            color: CATEGORY_COLORS[skill.category] || '#888',
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': { fontSize: 16 },
                          }}
                        >
                          { getSkillIcon(skill.icon) }
                        </Box>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          { skill.name }
                        </Typography>
                      </Box>
                    )) }
                  </Box>
                </Box>

              </CardContent>
            </Card>
          </Grid>

          {/* ── 오른쪽: 캐릭터 + 핵심 강점 ── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ bgcolor: 'var(--color-bg-card)', height: '100%' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

                {/* 캐릭터 이미지 */}
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 160,
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'var(--color-bg-primary)',
                    border: '2px solid var(--color-border)',
                    boxShadow: '4px 4px 0px var(--color-border)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    mx: 'auto',
                  }}
                >
                  <Box
                    component='img'
                    src={ characterImg }
                    alt='겨울하음 캐릭터'
                    sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
                  />
                </Box>

                {/* 이름 + 태그라인 */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--color-text-primary)', mb: 0.5 }}>
                    { basicInfo.name }
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    꾸준함을 무기로 성장하는<br />프론트엔드 개발자
                  </Typography>
                </Box>

                <Divider sx={{ width: '100%', borderColor: 'var(--color-border-light)' }} />

                {/* 핵심 강점 목록 */}
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  { HIGHLIGHTS.map((item, idx) => (
                    <Box
                      key={ idx }
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        px: 1.5,
                        py: 0.9,
                        bgcolor: 'var(--color-bg-primary)',
                        border: '1.5px solid var(--color-border-light)',
                        borderRadius: '4px',
                      }}
                    >
                      <Typography sx={{ fontSize: '1rem', lineHeight: 1 }}>{ item.emoji }</Typography>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        { item.text }
                      </Typography>
                    </Box>
                  )) }
                </Box>

              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 더 알아보기 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            endIcon={ <ArrowForwardIcon /> }
            onClick={ () => navigate('/about') }
            sx={{
              bgcolor: 'var(--color-secondary)',
              color: '#222',
              border: '2px solid #222',
              borderRadius: '4px',
              boxShadow: '3px 3px 0px #222',
              fontWeight: 700,
              fontSize: '0.95rem',
              textTransform: 'none',
              px: 4,
              py: 1.2,
              '&:hover': {
                bgcolor: '#5CC47B',
                boxShadow: '1px 1px 0px #222',
                transform: 'translate(2px, 2px)',
              },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutMeSection;
