import { createContext, useContext } from 'react';
import profileImg from '../assets/profile.jpg';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PaletteIcon from '@mui/icons-material/Palette';
import BoltIcon from '@mui/icons-material/Bolt';
import HubIcon from '@mui/icons-material/Hub';
import GitHubIcon from '@mui/icons-material/GitHub';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ICON_MAP = {
  'orange-diamond': <DataObjectIcon />,
  'palette': <PaletteIcon />,
  'zap': <BoltIcon />,
  'atom': <HubIcon />,
  'github': <GitHubIcon />,
  'figma': <DesignServicesIcon />,
  'sparkles': <AutoAwesomeIcon />,
};

export const CATEGORY_COLORS = {
  Frontend: '#F4845F',
  Framework: '#7AB5E8',
  Design: '#A855C8',
  Tool: '#888888',
  AI: '#4BAE76',
};

export function getSkillIcon(iconName) {
  return ICON_MAP[iconName] || <DataObjectIcon />;
}

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
      content: '유아교육을 전공하고 유치원 교사로 근무하던 중 디자인에 관심을 갖게 되었고, 웹디자인 공부를 하다가 프론트엔드 개발을 접하게 되었습니다. 오르미 프론트엔드 개발 과정을 통해 HTML, CSS, JavaScript, React를 학습했고, 현재는 AI 기반 개발 흐름을 배우며 My Portfolio, WinterLog, FitBuddy 프로젝트를 개발하고 있습니다.',
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      showInHome: true,
      content: '저는 빠르게 성장하는 사람보다 꾸준히 성장하는 사람이 되고 싶습니다. 학습 속도가 빠른 편은 아니지만 포기하지 않고 끝까지 해내는 것을 중요하게 생각하며, 사용자 입장에서 생각하고 함께 일하고 싶은 개발자가 되는 것을 목표로 합니다.',
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      showInHome: false,
      content: '운동과 자기계발에 관심이 많고, 공부한 내용을 기록하며 성장하는 과정을 좋아합니다. 최근에는 AI 도구를 활용한 개발 학습에도 관심을 가지고 있습니다.',
    },
  ],
  skills: [
    { id: 1, icon: 'orange-diamond', name: 'HTML',       level: 75, category: 'Frontend',   description: '웹 페이지의 기본 구조를 작성할 수 있습니다.',                                         showInHome: true },
    { id: 2, icon: 'palette',        name: 'CSS',        level: 70, category: 'Frontend',   description: '반응형 레이아웃과 카드형 UI를 구현할 수 있습니다.',                                     showInHome: true },
    { id: 3, icon: 'zap',            name: 'JavaScript', level: 55, category: 'Frontend',   description: '기본 문법과 이벤트, 배열 메서드를 학습하며 프로젝트에 적용하고 있습니다.',               showInHome: true },
    { id: 4, icon: 'atom',           name: 'React',      level: 55, category: 'Framework',  description: '컴포넌트 기반 UI를 만들고 상태 관리 흐름을 학습하고 있습니다.',                         showInHome: true },
    { id: 5, icon: 'github',         name: 'GitHub',     level: 60, category: 'Tool',       description: '프로젝트 버전 관리와 협업 흐름을 익히고 있습니다.',                                     showInHome: true },
    { id: 6, icon: 'figma',          name: 'Figma',      level: 50, category: 'Design',     description: '웹 UI 구조와 화면 기획을 정리할 때 활용할 수 있습니다.',                                showInHome: false },
    { id: 7, icon: 'sparkles',       name: 'AI Tools',   level: 65, category: 'AI',         description: 'Claude와 ChatGPT를 활용해 학습, 기획, 코드 개선 작업을 진행하고 있습니다.',             showInHome: true },
  ],
};

function getHomeData() {
  const devStory = aboutMeData.sections.find((s) => s.id === 'dev-story');
  const summary = devStory
    ? devStory.content.length > 120
      ? devStory.content.slice(0, 120) + '...'
      : devStory.content
    : '';

  const topSkills = [...aboutMeData.skills]
    .filter((s) => s.showInHome)
    .sort((a, b) => b.level - a.level)
    .slice(0, 4);

  return {
    basicInfo: aboutMeData.basicInfo,
    devStorySummary: summary,
    topSkills,
  };
}

const PortfolioContext = createContext(null);

/**
 * PortfolioProvider 컴포넌트
 *
 * Props:
 * @param {React.ReactNode} children [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
export function PortfolioProvider({ children }) {
  const value = {
    aboutMeData,
    homeData: getHomeData(),
  };

  return (
    <PortfolioContext.Provider value={ value }>
      { children }
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
