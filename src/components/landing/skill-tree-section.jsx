import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePortfolio, getSkillIcon, CATEGORY_COLORS } from '../../hooks/portfolio-context';
import characterSkillImg from '../../assets/character-skill.png';

const EXPERIENCE_ITEMS = [
  { label: 'Git / GitHub', color: '#1A1A1A', textColor: '#fff' },
  { label: 'Supabase', color: '#3ECF8E', textColor: '#fff' },
  { label: 'Figma', color: '#A259FF', textColor: '#fff' },
  { label: 'Photoshop', color: '#31A8FF', textColor: '#fff' },
  { label: 'Illustrator', color: '#FF9A00', textColor: '#1A1A1A' },
  { label: 'Zustand', color: '#F4845F', textColor: '#fff' },
];

function SkillTreeSection() {
  const navigate = useNavigate();
  const { homeData } = usePortfolio();
  const { mainSkillCards } = homeData;

  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-primary)',
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
              bgcolor: 'var(--color-tech-stack)',
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
              Skill Tree
            </Typography>
          </Box>
          <Box
            component='img'
            src={ characterSkillImg }
            alt='Skill 캐릭터'
            sx={{
              width: { xs: 155, md: 235 },
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
              bgcolor: 'var(--color-bg-secondary)',
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            {/* 대표 스킬 카드 그리드 */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              { mainSkillCards.map((card) => {
                const categoryColor = CATEGORY_COLORS[card.category] || '#888';
                return (
                  <Grid key={ card.id } size={{ xs: 6, sm: 3 }}>
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.2,
                        p: { xs: 2, md: 3 },
                        border: '2px solid var(--color-border)',
                        boxShadow: '4px 4px 0px var(--color-border)',
                        bgcolor: 'var(--color-bg-card)',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        '&:hover': {
                          transform: 'translate(-2px, -2px)',
                          boxShadow: '6px 6px 0px var(--color-border)',
                        },
                      }}
                    >
                      {/* 아이콘 박스 */}
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: categoryColor,
                          border: '2px solid var(--color-border)',
                          borderRadius: '4px',
                          color: '#fff',
                          '& svg': { fontSize: 28 },
                        }}
                      >
                        { getSkillIcon(card.icon) }
                      </Box>

                      {/* 제목 */}
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: '0.85rem', md: '0.95rem' },
                          color: 'var(--color-text-primary)',
                          textAlign: 'center',
                        }}
                      >
                        { card.title }
                      </Typography>

                      {/* 표시 기술 (선택) */}
                      { card.techLine && (
                        <Typography
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: 'var(--color-text-secondary)',
                            textAlign: 'center',
                            lineHeight: 1.4,
                          }}
                        >
                          { card.techLine }
                        </Typography>
                      ) }

                      {/* 경험 설명 */}
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: 'var(--color-text-muted)',
                          textAlign: 'center',
                          lineHeight: 1.4,
                        }}
                      >
                        { card.description }
                      </Typography>
                    </Box>
                  </Grid>
                );
              }) }
            </Grid>

            {/* 프로젝트 · 도구 경험 */}
            <Box sx={{ borderTop: '1.5px solid var(--color-border-light)', pt: 2.5 }}>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
              >
                프로젝트 · 도구 경험
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                { EXPERIENCE_ITEMS.map((item) => (
                  <Box
                    key={ item.label }
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      bgcolor: item.color,
                      border: '1.5px solid var(--color-border)',
                      boxShadow: '2px 2px 0px var(--color-border)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: item.textColor,
                      }}
                    >
                      { item.label }
                    </Typography>
                  </Box>
                )) }
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 전체 스킬 보기 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            endIcon={ <ArrowForwardIcon /> }
            onClick={ () => navigate('/about') }
            sx={{
              bgcolor: 'var(--color-tech-stack)',
              color: 'var(--color-text-primary)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              boxShadow: '3px 3px 0px var(--color-border)',
              fontWeight: 700,
              fontSize: '0.95rem',
              textTransform: 'none',
              px: 4,
              py: 1.2,
              '&:hover': {
                bgcolor: '#8AC8E8',
                boxShadow: '1px 1px 0px var(--color-border)',
                transform: 'translate(2px, 2px)',
              },
            }}
          >
            전체 스킬 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
