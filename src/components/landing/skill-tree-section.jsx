import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePortfolio, getSkillIcon, CATEGORY_COLORS } from '../../hooks/portfolio-context';

function SkillTreeSection() {
  const navigate = useNavigate();
  const { homeData } = usePortfolio();
  const { topSkills } = homeData;

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
        {/* 섹션 타이틀 */}
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-tech-stack)',
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
            Skill Tree
          </Typography>
        </Box>

        {/* 상위 4개 스킬 카드 그리드 */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          { topSkills.map((skill) => {
            const categoryColor = CATEGORY_COLORS[skill.category] || '#888';
            return (
              <Grid key={ skill.id } size={{ xs: 6, sm: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.2,
                    p: { xs: 2, md: 3 },
                    border: '2px solid var(--color-border)',
                    boxShadow: '4px 4px 0px var(--color-border)',
                    bgcolor: '#fff',
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
                    { getSkillIcon(skill.icon) }
                  </Box>

                  {/* 기술명 */}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      color: 'var(--color-text-primary)',
                      textAlign: 'center',
                    }}
                  >
                    { skill.name }
                  </Typography>

                  {/* 숙련도 바 */}
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        height: 6,
                        bgcolor: '#E0D8D0',
                        border: '1.5px solid var(--color-border)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          width: `${ skill.level }%`,
                          bgcolor: categoryColor,
                          borderRadius: '1px',
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textAlign: 'right', mt: 0.3, fontWeight: 700 }}>
                      { skill.level }%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          }) }
        </Grid>

        {/* 전체 스킬 보기 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            endIcon={ <ArrowForwardIcon /> }
            onClick={ () => navigate('/about') }
            sx={{
              bgcolor: 'var(--color-tech-stack)',
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
                bgcolor: '#8AC8E8',
                boxShadow: '1px 1px 0px #222',
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
