import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { usePortfolio, getSkillIcon, CATEGORY_COLORS } from '../hooks/use-portfolio';

/**
 * AboutMePage 컴포넌트
 *
 * Props: 없음 (PortfolioContext에서 데이터 수신)
 *
 * Example usage:
 * <AboutMePage />
 */

const BASIC_INFO_ITEMS = [
  { icon: <PersonIcon />, label: '이름',  key: 'name' },
  { icon: <SchoolIcon />, label: '학력',  key: 'education' },
  { icon: <CodeIcon />,   label: '교육',  key: 'training' },
  { icon: <WorkIcon />,   label: '경력',  key: 'experience' },
];

function AboutMePage() {
  const { aboutMeData } = usePortfolio();
  const { basicInfo, sections, skills } = aboutMeData;

  const [activeTab, setActiveTab] = useState(0);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const activeSection = sections[activeTab];
  const visibleSkills = showAllSkills ? skills : skills.filter((s) => s.showInHome);

  /* 카테고리별 그룹핑 */
  const skillsByCategory = visibleSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 64px)', bgcolor: 'var(--color-bg-primary)', py: { xs: 4, md: 8 } }}>
      <Container maxWidth='md'>
        {/* 페이지 타이틀 */}
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-secondary)',
            border: '2px solid var(--color-border)',
            boxShadow: '4px 4px 0px var(--color-border)',
            px: 3, py: 1, mb: 5,
          }}
        >
          <Typography variant='h2' sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, color: 'var(--color-text-primary)', m: 0 }}>
            About Me
          </Typography>
        </Box>

        {/* 기본 정보 카드 */}
        <Card sx={{ mb: 4, bgcolor: 'var(--color-bg-card)' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
              {/* 프로필 사진 */}
              <Grid size={{ xs: 12, md: 3 }}>
                <Box
                  sx={{
                    width: { xs: 100, md: 130 }, height: { xs: 100, md: 130 },
                    mx: 'auto',
                    border: '2px solid var(--color-border)',
                    boxShadow: '4px 4px 0px var(--color-border)',
                    bgcolor: 'var(--color-profile-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '4px', overflow: 'hidden',
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
                    <PersonIcon sx={{ fontSize: 56, color: '#fff', opacity: 0.8 }} />
                  ) }
                </Box>
              </Grid>

              {/* 기본 정보 목록 */}
              <Grid size={{ xs: 12, md: 9 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  { BASIC_INFO_ITEMS.map((item) => (
                    <Box key={ item.key } sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 32, height: 32,
                          bgcolor: 'var(--color-primary)',
                          border: '2px solid var(--color-border)',
                          borderRadius: '4px', flexShrink: 0, color: '#fff',
                          '& svg': { fontSize: 18 },
                        }}
                      >
                        { item.icon }
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', minWidth: 44, flexShrink: 0, pt: '0.15em' }}>
                          { item.label }
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 600, color: 'var(--color-text-primary)', flex: 1, minWidth: 0, wordBreak: 'keep-all' }}>
                          { basicInfo[item.key] }
                        </Typography>
                      </Box>
                    </Box>
                  )) }
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 콘텐츠 섹션 — 탭 네비게이션 */}
        <Card sx={{ bgcolor: 'var(--color-bg-card)', mb: 4 }}>
          <Box sx={{ borderBottom: '2px solid var(--color-border)', bgcolor: 'var(--color-bg-primary)' }}>
            <Tabs
              value={ activeTab }
              onChange={ handleTabChange }
              variant='fullWidth'
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 700, fontSize: { xs: '0.8rem', md: '0.95rem' },
                  color: 'var(--color-text-secondary)', textTransform: 'none', py: 2,
                  borderRight: '2px solid var(--color-border)',
                  '&:last-child': { borderRight: 'none' },
                },
                '& .Mui-selected': { color: 'var(--color-text-primary) !important', bgcolor: 'var(--color-bg-card)' },
                '& .MuiTabs-indicator': { backgroundColor: 'var(--color-primary)', height: 3 },
              }}
            >
              { sections.map((section) => (
                <Tab
                  key={ section.id }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      { section.title }
                      { section.showInHome && (
                        <Chip
                          label='홈'
                          size='small'
                          sx={{
                            height: 18, fontSize: '0.65rem', fontWeight: 700,
                            bgcolor: 'var(--color-accent)', color: 'var(--color-text-primary)',
                            border: '1px solid var(--color-border)',
                            '& .MuiChip-label': { px: 0.8 },
                          }}
                        />
                      ) }
                    </Box>
                  }
                />
              )) }
            </Tabs>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'var(--color-accent)',
                border: '2px solid var(--color-border)',
                boxShadow: '3px 3px 0px var(--color-border)',
                px: 2, py: 0.5, mb: 3,
              }}
            >
              <Typography variant='h3' sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, color: 'var(--color-text-primary)', m: 0 }}>
                { activeSection.title }
              </Typography>
            </Box>

            <Typography sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, fontSize: { xs: '0.95rem', md: '1.05rem' }, whiteSpace: 'pre-line' }}>
              { activeSection.content }
            </Typography>
          </CardContent>
        </Card>

        {/* 스킬 섹션 — 카테고리별 그룹핑 */}
        <Card sx={{ bgcolor: 'var(--color-bg-card)' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* 스킬 헤더 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box
                sx={{
                  display: 'inline-block',
                  bgcolor: 'var(--color-tech-stack)',
                  border: '2px solid var(--color-border)',
                  boxShadow: '3px 3px 0px var(--color-border)',
                  px: 2, py: 0.5,
                }}
              >
                <Typography variant='h3' sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, color: 'var(--color-text-primary)', m: 0 }}>
                  Skills
                </Typography>
              </Box>

              {/* 범례 */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                { Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                  <Box key={ cat } sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: color, border: '1.5px solid var(--color-border)', borderRadius: '2px' }} />
                    <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{ cat }</Typography>
                  </Box>
                )) }
              </Box>
            </Box>

            {/* 카테고리별 스킬 그룹 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              { Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <Box key={ category }>
                  <Box
                    sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 0.8,
                      border: '1.5px solid var(--color-border)',
                      px: 1.5, py: 0.3, mb: 1.5,
                      bgcolor: CATEGORY_COLORS[category] || '#888',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>{ category }</Typography>
                  </Box>

                  <Grid container spacing={2}>
                    { categorySkills.map((skill) => {
                      const color = CATEGORY_COLORS[skill.category] || '#888';
                      return (
                        <Grid key={ skill.id } size={{ xs: 12, sm: 6, md: 4 }}>
                          <Tooltip title={ skill.description } placement='top' arrow>
                            <Box
                              sx={{
                                p: 2, border: '2px solid var(--color-border)',
                                boxShadow: '3px 3px 0px var(--color-border)',
                                bgcolor: 'var(--color-bg-card)', borderRadius: '4px', cursor: 'default',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                                '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: '5px 5px 0px var(--color-border)' },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                                <Box
                                  sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: 30, height: 30, bgcolor: color,
                                    border: '1.5px solid var(--color-border)', borderRadius: '4px',
                                    color: '#fff', flexShrink: 0, '& svg': { fontSize: 18 },
                                  }}
                                >
                                  { getSkillIcon(skill.icon) }
                                </Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                                  { skill.name }
                                </Typography>
                              </Box>

                              {/* 경험 설명 */}
                              <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                { skill.description }
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Grid>
                      );
                    }) }
                  </Grid>
                </Box>
              )) }
            </Box>

            {/* 더 보기 / 접기 */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                onClick={ () => setShowAllSkills((prev) => !prev) }
                endIcon={ showAllSkills ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                sx={{
                  bgcolor: showAllSkills ? 'var(--color-bg-primary)' : 'var(--color-primary)',
                  color: showAllSkills ? 'var(--color-text-primary)' : '#fff',
                  border: '2px solid var(--color-border)',
                  boxShadow: '3px 3px 0px var(--color-border)',
                  borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem',
                  textTransform: 'none', px: 3, py: 1,
                  '&:hover': {
                    boxShadow: '1px 1px 0px var(--color-border)',
                    transform: 'translate(2px, 2px)',
                    bgcolor: showAllSkills ? 'var(--color-bg-primary)' : 'var(--color-primary-dark)',
                  },
                }}
              >
                { showAllSkills ? '스킬 접기' : '스킬 더 보기' }
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutMePage;
