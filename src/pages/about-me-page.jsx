import { useState } from 'react';
import profileImg from '../assets/profile.jpg';
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
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PaletteIcon from '@mui/icons-material/Palette';
import BoltIcon from '@mui/icons-material/Bolt';
import HubIcon from '@mui/icons-material/Hub';
import GitHubIcon from '@mui/icons-material/GitHub';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SkillProgressCard from '../components/ui/skill-progress-card';

/**
 * AboutMePage 컴포넌트
 *
 * Props: 없음 (데이터 내부 관리)
 *
 * Example usage:
 * <AboutMePage />
 */

const aboutMeData = {
  basicInfo: {
    name: '장미진',
    education: '유아교육 전공',
    major: '프론트엔드 개발 학습 중',
    experience: '신입 프론트엔드 개발자',
    photo: profileImg,
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      showInHome: true,
      content: [
        '유아교육을 전공하고 유치원 교사로 근무하던 중 포토샵을 활용하는 선생님을 보며 디자인에 관심을 갖게 되었습니다.',
        '이후 웹디자인을 공부하게 되었고, 그 과정에서 프론트엔드 개발을 추천받아 새로운 도전을 시작했습니다.',
        '개발은 처음 접하는 분야였지만 오르미 프론트엔드 개발 과정을 통해 HTML, CSS, JavaScript, React를 학습하며 프로젝트를 수행했습니다.',
        '수료 이후에도 부족한 부분을 보완하기 위해 꾸준히 개인 학습을 이어가고 있으며, 최근에는 AI 기반 개발 흐름을 배우기 위해 바이브 웹 과정을 수강하며 새로운 방식의 개발도 함께 익히고 있습니다.',
        '현재는 My Portfolio, WinterLog, FitBuddy 프로젝트를 직접 기획하고 개발하며 성장하고 있습니다.',
      ],
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      showInHome: true,
      content: [
        '저는 빠르게 성장하는 사람보다 꾸준히 성장하는 사람이 되고 싶습니다.',
        '학습 속도가 빠른 편은 아니지만 포기하지 않고 끝까지 해내는 것을 중요하게 생각합니다.',
        '프로젝트를 진행할 때는 사용자 입장에서 생각하며, 혼자 잘하는 것보다 함께 성장하는 협업을 중요하게 여깁니다.',
        '또한 새로운 기술과 변화에 열린 자세를 유지하려고 노력하며, AI와 개발을 함께 활용하는 미래의 개발 환경에도 꾸준히 적응하고 있습니다.',
        '맡은 일은 책임감 있게 마무리하고, 신뢰받는 개발자가 되는 것이 목표입니다.',
      ],
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      showInHome: false,
      content: [
        '운동과 자기계발에 관심이 많으며 새로운 것을 배우는 과정을 즐깁니다.',
        '공부한 내용을 기록하고 정리하는 습관이 있으며, 성장 과정을 남기는 것을 좋아합니다.',
        '최근에는 AI 도구를 활용한 개발 학습에 많은 관심을 가지고 있으며, 변화하는 기술 흐름을 꾸준히 따라가고 있습니다.',
        '저에게 개발은 단순히 직업을 위한 공부가 아니라 계속 성장하기 위한 도전이자 즐거움입니다.',
      ],
    },
  ],
};

const skillsData = [
  {
    id: 1,
    icon: <DataObjectIcon />,
    name: 'HTML',
    level: 75,
    category: 'Frontend',
    description: '웹 페이지의 기본 구조를 작성할 수 있습니다.',
    showInHome: true,
  },
  {
    id: 2,
    icon: <PaletteIcon />,
    name: 'CSS',
    level: 70,
    category: 'Frontend',
    description: '반응형 레이아웃과 카드형 UI를 구현할 수 있습니다.',
    showInHome: true,
  },
  {
    id: 3,
    icon: <BoltIcon />,
    name: 'JavaScript',
    level: 55,
    category: 'Frontend',
    description: '기본 문법과 이벤트, 배열 메서드를 학습하며 프로젝트에 적용하고 있습니다.',
    showInHome: true,
  },
  {
    id: 4,
    icon: <HubIcon />,
    name: 'React',
    level: 55,
    category: 'Framework',
    description: '컴포넌트 기반 UI를 만들고 상태 관리 흐름을 학습하고 있습니다.',
    showInHome: true,
  },
  {
    id: 5,
    icon: <GitHubIcon />,
    name: 'GitHub',
    level: 60,
    category: 'Tool',
    description: '프로젝트 버전 관리와 협업 흐름을 익히고 있습니다.',
    showInHome: true,
  },
  {
    id: 6,
    icon: <DesignServicesIcon />,
    name: 'Figma',
    level: 50,
    category: 'Design',
    description: '웹 UI 구조와 화면 기획을 정리할 때 활용할 수 있습니다.',
    showInHome: false,
  },
  {
    id: 7,
    icon: <AutoAwesomeIcon />,
    name: 'AI Tools',
    level: 65,
    category: 'AI',
    description: 'Claude와 ChatGPT를 활용해 학습, 기획, 코드 개선 작업을 진행하고 있습니다.',
    showInHome: true,
  },
];

const basicInfoItems = [
  { icon: <PersonIcon />, label: '이름', key: 'name' },
  { icon: <SchoolIcon />, label: '학력', key: 'education' },
  { icon: <CodeIcon />, label: '전공', key: 'major' },
  { icon: <WorkIcon />, label: '경력', key: 'experience' },
];

function AboutMePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const activeSection = aboutMeData.sections[activeTab];
  const visibleSkills = showAllSkills
    ? skillsData
    : skillsData.filter((s) => s.showInHome);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'var(--color-bg-primary)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='md'>
        {/* 페이지 타이틀 */}
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-secondary)',
            border: '2px solid var(--color-border)',
            boxShadow: '4px 4px 0px var(--color-border)',
            px: 3,
            py: 1,
            mb: 5,
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, color: 'var(--color-text-primary)', m: 0 }}
          >
            About Me
          </Typography>
        </Box>

        {/* 기본 정보 섹션 */}
        <Card sx={{ mb: 4, bgcolor: 'var(--color-bg-card)' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3} alignItems='center'>
              {/* 프로필 사진 영역 */}
              <Grid size={{ xs: 12, md: 3 }}>
                <Box
                  sx={{
                    width: { xs: 100, md: 130 },
                    height: { xs: 100, md: 130 },
                    mx: 'auto',
                    border: '2px solid var(--color-border)',
                    boxShadow: '4px 4px 0px var(--color-border)',
                    bgcolor: 'var(--color-profile-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  { aboutMeData.basicInfo.photo ? (
                    <Box
                      component='img'
                      src={ aboutMeData.basicInfo.photo }
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
                  { basicInfoItems.map((item) => (
                    <Box key={ item.key } sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          bgcolor: 'var(--color-primary)',
                          border: '2px solid var(--color-border)',
                          borderRadius: '4px',
                          flexShrink: 0,
                          color: '#fff',
                          '& svg': { fontSize: 18 },
                        }}
                      >
                        { item.icon }
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        <Typography
                          sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', minWidth: 44 }}
                        >
                          { item.label }
                        </Typography>
                        <Typography
                          sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 600, color: 'var(--color-text-primary)' }}
                        >
                          { aboutMeData.basicInfo[item.key] }
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
                  fontWeight: 700,
                  fontSize: { xs: '0.8rem', md: '0.95rem' },
                  color: 'var(--color-text-secondary)',
                  textTransform: 'none',
                  py: 2,
                  borderRight: '2px solid var(--color-border)',
                  '&:last-child': { borderRight: 'none' },
                },
                '& .Mui-selected': {
                  color: 'var(--color-text-primary) !important',
                  bgcolor: 'var(--color-bg-card)',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'var(--color-primary)',
                  height: 3,
                },
              }}
            >
              { aboutMeData.sections.map((section) => (
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
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            bgcolor: 'var(--color-accent)',
                            color: 'var(--color-text-primary)',
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
                px: 2,
                py: 0.5,
                mb: 3,
              }}
            >
              <Typography
                variant='h3'
                sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, color: 'var(--color-text-primary)', m: 0 }}
              >
                { activeSection.title }
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              { activeSection.content.map((paragraph, idx) => (
                <Box key={ idx } sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      mt: '10px',
                      borderRadius: '50%',
                      bgcolor: 'var(--color-primary)',
                      border: '1.5px solid var(--color-border)',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, fontSize: { xs: '0.95rem', md: '1.05rem' } }}
                  >
                    { paragraph }
                  </Typography>
                </Box>
              )) }
            </Box>
          </CardContent>
        </Card>

        {/* 스킬 섹션 */}
        <Card sx={{ bgcolor: 'var(--color-bg-card)' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* 스킬 섹션 헤더 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box
                sx={{
                  display: 'inline-block',
                  bgcolor: 'var(--color-tech-stack)',
                  border: '2px solid var(--color-border)',
                  boxShadow: '3px 3px 0px var(--color-border)',
                  px: 2,
                  py: 0.5,
                }}
              >
                <Typography
                  variant='h3'
                  sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, color: 'var(--color-text-primary)', m: 0 }}
                >
                  Skills
                </Typography>
              </Box>

              {/* 카테고리 범례 */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                { [
                  { label: 'Frontend', color: '#F4845F' },
                  { label: 'Framework', color: '#7AB5E8' },
                  { label: 'Tool', color: '#888888' },
                  { label: 'AI', color: '#4BAE76' },
                  { label: 'Design', color: '#A855C8' },
                ].map((cat) => (
                  <Box
                    key={ cat.label }
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: cat.color,
                        border: '1.5px solid var(--color-border)',
                        borderRadius: '2px',
                      }}
                    />
                    <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      { cat.label }
                    </Typography>
                  </Box>
                )) }
              </Box>
            </Box>

            {/* 스킬 카드 그리드 */}
            <Grid container spacing={2}>
              { visibleSkills.map((skill, idx) => (
                <Grid key={ skill.id } size={{ xs: 12, sm: 6, md: 4 }}>
                  <SkillProgressCard skill={ skill } animationDelay={ idx * 80 } />
                </Grid>
              )) }
            </Grid>

            {/* 더 보기 / 접기 버튼 */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                onClick={ () => setShowAllSkills((prev) => !prev) }
                endIcon={ showAllSkills ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                sx={{
                  bgcolor: showAllSkills ? 'var(--color-bg-primary)' : 'var(--color-primary)',
                  color: showAllSkills ? 'var(--color-text-primary)' : '#fff',
                  border: '2px solid var(--color-border)',
                  boxShadow: '3px 3px 0px var(--color-border)',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  transition: 'box-shadow 0.15s, transform 0.15s',
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
