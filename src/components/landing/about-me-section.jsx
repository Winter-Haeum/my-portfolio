import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import characterImg from '../../assets/character.png';

const JOURNEY_STEPS = [
  { emoji: '👩‍🏫', label: '교사' },
  { emoji: '🎨', label: '웹디자인' },
  { emoji: '💻', label: '프론트엔드' },
  { emoji: '🤖', label: 'AI 개발' },
];

const STORY_PARAGRAPHS = [
  '유아교육을 전공하고 유치원 교사로 근무했습니다.',
  '포토샵을 활용하는 선생님을 보며 디자인에 관심을 갖게 되었고, 그 관심은 웹디자인 공부로 이어졌습니다.',
  '웹디자인을 배우던 중 프론트엔드 개발을 추천받았고, 개발이라는 새로운 분야에 도전하게 되었습니다.',
  '오르미 프론트엔드 개발 과정을 수료하며 HTML, CSS, JavaScript, React를 학습했고, 프로젝트를 수행하며 개발 경험을 쌓았습니다.',
  '현재는 WinterLog, FitBuddy, My Portfolio 프로젝트를 직접 개발하며 성장하고 있으며, AI 기반 개발 흐름을 배우기 위해 바이브 웹 과정도 함께 학습하고 있습니다.',
];

const HIGHLIGHTS = [
  { emoji: '🏆', text: '학습부문 우수상' },
  { emoji: '🎤', text: '프로젝트 발표 담당 3회' },
  { emoji: '🤝', text: '팀 프로젝트 리딩 경험' },
  { emoji: '🚀', text: 'WinterLog 개발' },
  { emoji: '🏃', text: 'FitBuddy 개발' },
  { emoji: '🤖', text: 'AI 기반 개발 학습 중' },
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
          {/* 챕터 레이블 */}
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

          {/* 메인 타이틀 */}
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

          {/* 왼쪽: 캐릭터 + 강점 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* 캐릭터 카드 */}
              <Box
                sx={{
                  border: '2px solid var(--color-border)',
                  boxShadow: '4px 4px 0px var(--color-border)',
                  bgcolor: 'var(--color-bg-primary)',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 140,
                    aspectRatio: '1 / 1',
                    bgcolor: 'var(--color-bg-secondary)',
                    border: '2px solid var(--color-border)',
                    borderRadius: '4px',
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
                    sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 0.5 }}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--color-text-primary)', mb: 0.4 }}>
                    장미진
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                    꾸준함을 무기로 성장하는<br />프론트엔드 개발자
                  </Typography>
                </Box>
              </Box>

              {/* 강점 목록 */}
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

          {/* 오른쪽: 스토리 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

              {/* 인용 블록 */}
              <Box
                sx={{
                  bgcolor: 'var(--color-accent)',
                  border: '2px solid var(--color-border)',
                  boxShadow: '4px 4px 0px var(--color-border)',
                  px: 3, py: 2.5,
                }}
              >
                <Typography sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, color: 'var(--color-primary)', lineHeight: 1, mb: 1 }}>
                  ❝
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.75,
                    fontStyle: 'italic',
                  }}
                >
                  새로운 도전을 두려워하지 않고,<br />꾸준함으로 성장해온 이야기
                </Typography>
              </Box>

              {/* 스토리 본문 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                { STORY_PARAGRAPHS.map((para, idx) => (
                  <Box key={ idx } sx={{ display: 'flex', gap: 1.2, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 6, height: 6,
                        mt: '9px',
                        bgcolor: 'var(--color-primary)',
                        border: '1.5px solid var(--color-border)',
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: '0.92rem', md: '1rem' },
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.9,
                      }}
                    >
                      { para }
                    </Typography>
                  </Box>
                )) }
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
