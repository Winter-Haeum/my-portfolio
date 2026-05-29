import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const JOURNEY_STEPS = [
  { emoji: '👩‍🏫', label: '교사' },
  { emoji: '🎨', label: '웹디자인' },
  { emoji: '💻', label: '프론트엔드' },
  { emoji: '🤖', label: 'AI 개발' },
];

const TIMELINE_ITEMS = [
  { emoji: '🎓', label: '유아교육 전공' },
  { emoji: '👩‍🏫', label: '유치원 교사' },
  { emoji: '🎨', label: '웹디자인 학습' },
  { emoji: '💻', label: '프론트엔드 개발 입문' },
  { emoji: '📚', label: '오르미 프론트엔드 과정 수료', isHighlight: true },
  { emoji: '🏆', label: '학습부문 우수상 수상', isHighlight: true },
  { emoji: '🚀', label: 'WinterLog 개발' },
  { emoji: '🏃', label: 'FitBuddy 개발' },
  { emoji: '🤖', label: 'AI 기반 개발 학습', isCurrent: true },
];

const HIGHLIGHTS = [
  { emoji: '🏆', text: '학습부문 우수상' },
  { emoji: '🎤', text: '프로젝트 발표 담당 3회' },
  { emoji: '🤝', text: '팀 프로젝트 리딩 경험' },
];

function AboutMeSection() {
  const navigate = useNavigate();

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

        {/* 섹션 뱃지 */}
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-secondary)',
            border: '2px solid var(--color-border)',
            boxShadow: '4px 4px 0px var(--color-border)',
            px: 3, py: 1, mb: 4,
          }}
        >
          <Typography variant='h2' sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, color: 'var(--color-text-primary)', m: 0 }}>
            About Me
          </Typography>
        </Box>

        {/* ── Chapter 헤더 (풀 너비) ── */}
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            CHAPTER 01 — 시작
          </Typography>

          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 900,
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
              mb: { xs: 3, md: 4 },
            }}
          >
            교사에서 개발자로
          </Typography>

          {/* 여정 아이콘 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, md: 1.5 }, flexWrap: 'wrap' }}>
            { JOURNEY_STEPS.map((step, i) => (
              <Fragment key={ step.label }>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    border: '2px solid var(--color-border)',
                    boxShadow: '3px 3px 0px var(--color-border)',
                    px: { xs: 1.2, md: 2 },
                    py: { xs: 1, md: 1.3 },
                    bgcolor: '#fff',
                    minWidth: { xs: 54, md: 72 },
                  }}
                >
                  <Typography sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, lineHeight: 1 }}>
                    { step.emoji }
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.62rem', md: '0.72rem' },
                      fontWeight: 700,
                      color: 'var(--color-text-secondary)',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    { step.label }
                  </Typography>
                </Box>
                { i < JOURNEY_STEPS.length - 1 && (
                  <Typography
                    sx={{
                      color: 'var(--color-primary)',
                      fontWeight: 900,
                      fontSize: { xs: '1.1rem', md: '1.4rem' },
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    →
                  </Typography>
                ) }
              </Fragment>
            )) }
          </Box>
        </Box>

        {/* ── 2단 그리드 ── */}
        <Grid container spacing={3} alignItems='flex-start' sx={{ mb: 4 }}>

          {/* 왼쪽: 강점 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* 강점 목록 (3개) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                { HIGHLIGHTS.map((item, idx) => (
                  <Box
                    key={ idx }
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                      px: 1.5, py: 0.9,
                      bgcolor: '#fff',
                      border: '2px solid var(--color-border)',
                      boxShadow: '2px 2px 0px var(--color-border)',
                    }}
                  >
                    <Typography sx={{ fontSize: '1rem', lineHeight: 1 }}>{ item.emoji }</Typography>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      { item.text }
                    </Typography>
                  </Box>
                )) }
              </Box>
            </Box>
          </Grid>

          {/* 오른쪽: My Journey Timeline */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* My Journey 헤더 배지 */}
              <Box
                sx={{
                  display: 'inline-block',
                  bgcolor: 'var(--color-primary)',
                  border: '2px solid var(--color-border)',
                  boxShadow: '3px 3px 0px var(--color-border)',
                  px: 2, py: 0.6,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    m: 0,
                  }}
                >
                  My Journey
                </Typography>
              </Box>

              {/* 타임라인 */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                { TIMELINE_ITEMS.map((item, idx) => {
                  const isLast = idx === TIMELINE_ITEMS.length - 1;
                  const dotBg = item.isCurrent
                    ? 'var(--color-primary)'
                    : item.isHighlight
                    ? 'var(--color-secondary)'
                    : '#fff';
                  const cardBg = item.isCurrent
                    ? 'var(--color-accent)'
                    : item.isHighlight
                    ? 'var(--color-secondary)'
                    : '#fff';

                  return (
                    <Box key={ idx } sx={{ display: 'flex', gap: 1.5, alignItems: 'stretch' }}>

                      {/* 왼쪽: 점 + 연결선 */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: 20,
                          flexShrink: 0,
                        }}
                      >
                        <Box sx={{ pt: 1.1 }}>
                          <Box
                            sx={{
                              width: 13,
                              height: 13,
                              bgcolor: dotBg,
                              border: '2px solid var(--color-border)',
                              borderRadius: '50%',
                              flexShrink: 0,
                            }}
                          />
                        </Box>
                        { !isLast && (
                          <Box
                            sx={{
                              flex: 1,
                              width: 2,
                              bgcolor: 'var(--color-border)',
                              mt: 0.5,
                              minHeight: 14,
                            }}
                          />
                        ) }
                      </Box>

                      {/* 오른쪽: 카드 */}
                      <Box sx={{ flex: 1, pb: isLast ? 0 : 1.4 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.2,
                            px: 1.5,
                            py: 1,
                            bgcolor: cardBg,
                            border: '2px solid var(--color-border)',
                            boxShadow: '2px 2px 0px var(--color-border)',
                          }}
                        >
                          <Typography sx={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>
                            { item.emoji }
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { xs: '0.85rem', md: '0.9rem' },
                              fontWeight: item.isCurrent || item.isHighlight ? 700 : 600,
                              color: 'var(--color-text-primary)',
                              lineHeight: 1.4,
                            }}
                          >
                            { item.label }
                          </Typography>
                          { item.isCurrent && (
                            <Chip
                              label='NOW'
                              size='small'
                              sx={{
                                ml: 'auto',
                                height: 20,
                                fontSize: '0.6rem',
                                fontWeight: 700,
                                bgcolor: 'var(--color-primary)',
                                color: '#fff',
                                border: '1.5px solid var(--color-border)',
                                '& .MuiChip-label': { px: 0.8 },
                              }}
                            />
                          ) }
                        </Box>
                      </Box>

                    </Box>
                  );
                }) }
              </Box>

            </Box>
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
              px: 4, py: 1.2,
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
