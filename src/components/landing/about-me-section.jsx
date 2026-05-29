import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePortfolio, getSkillIcon, CATEGORY_COLORS } from '../../hooks/portfolio-context';

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

        {/* 메인 카드 — 스토리 + 프로필 */}
        <Card sx={{ bgcolor: 'var(--color-bg-card)', mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3} alignItems='flex-start'>
              {/* 개발 스토리 요약 */}
              <Grid size={{ xs: 12, md: 8 }}>
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
                    lineHeight: 1.9,
                    fontSize: { xs: '0.93rem', md: '1rem' },
                  }}
                >
                  { devStorySummary }
                </Typography>
              </Grid>

              {/* 프로필 사진 + 기본 정보 */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    border: '2px solid var(--color-border)',
                    boxShadow: '3px 3px 0px var(--color-border)',
                    bgcolor: 'var(--color-bg-primary)',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  {/* 프로필 사진 */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      border: '2px solid var(--color-border)',
                      boxShadow: '3px 3px 0px var(--color-border)',
                      bgcolor: 'var(--color-profile-bg)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    { basicInfo.photo ? (
                      <Box
                        component='img'
                        src={ basicInfo.photo }
                        alt='프로필 사진'
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    ) : (
                      <PersonIcon sx={{ fontSize: 40, color: '#fff', opacity: 0.8 }} />
                    ) }
                  </Box>

                  {/* 이름 + 기본 정보 */}
                  <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', mb: 0.5 }}>
                      { basicInfo.name }
                    </Typography>
                    { [basicInfo.education, basicInfo.major, basicInfo.experience].map((info, i) => (
                      <Typography key={ i } sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                        { info }
                      </Typography>
                    )) }
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 주요 스킬 4개 */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
          { topSkills.map((skill) => (
            <Box
              key={ skill.id }
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                border: '2px solid var(--color-border)',
                boxShadow: '2px 2px 0px var(--color-border)',
                bgcolor: '#fff',
                px: 1.5,
                py: 0.8,
              }}
            >
              <Box
                sx={{
                  color: CATEGORY_COLORS[skill.category] || '#888',
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { fontSize: 18 },
                }}
              >
                { getSkillIcon(skill.icon) }
              </Box>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                { skill.name }
              </Typography>
            </Box>
          )) }
        </Box>

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
