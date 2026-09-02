import profileImg from '../assets/profile-id-display.png';
import { PortfolioContext } from './use-portfolio';

const aboutMeData = {
  basicInfo: {
    name: '장미진',
    education: '유아교육학과 졸업',
    training: '웹디자인·UI/UX · 프론트엔드 · AI 바이브코딩',
    experience: '신입',
    photo: profileImg,
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 성장 스토리',
      showInHome: true,
      content: '유아교육을 전공하고 유치원 교사로 근무하던 중 디자인에 관심을 갖게 되어 웹디자인과 UI/UX를 공부하기 시작했습니다. 이후 화면이 실제로 동작하는 과정에도 흥미가 생겨 프론트엔드 과정을 통해 HTML, CSS, JavaScript, React의 기초를 학습했습니다.\n\n현재는 AI 도구를 활용해 아이디어와 요구사항을 구체화하고 프로젝트를 만들어가고 있습니다. 구현 과정에서는 AI의 설명을 통해 변경 내용을 이해하고, 결과를 직접 실행해 화면과 기능을 확인하며 원하는 방향과 다른 부분을 다시 수정하고 있습니다.\n\nWinterLog, FitBuddy, Winter Dev Archive를 만들며 아이디어를 정리하고, 화면을 구성하고, 실제로 사용해 문제를 발견하고 개선하는 과정을 반복해서 경험하고 있습니다.',
    },
    {
      id: 'philosophy',
      title: '일하는 방식',
      showInHome: true,
      content: '좋은 결과물을 만드는 것을 목표로 하되, 실제 사용 과정에서 새롭게 보이는 불편과 개선점도 중요하게 생각합니다. 완성 후에도 직접 사용해 보며 사용자 입장에서 더 나은 흐름이 있는지 살펴보고 필요한 부분을 다듬습니다.\n\nAI의 제안도 그대로 받아들이기보다 결과와 동작을 다시 확인하고, 제가 원하는 목적과 방향에 맞도록 요구사항을 조정하며 수정합니다.\n\n서비스가 실제 사용자에게 닿은 이후에도 더 나은 방향을 고민하고, 맡은 역할 안에서 제가 할 수 있는 개선을 찾아 실행하는 사람이 되고 싶습니다.',
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      showInHome: false,
      content: '유아교육을 전공하고 유치원 교사로 근무하며 사람마다 이해하는 방식과 필요한 도움이 다르다는 것을 가까이에서 경험했습니다. 이후 디자인과 웹에 관심을 갖게 되었고, 새로운 분야를 배우면서도 사용자가 무엇을 필요로 하는지 살펴보고 이해하기 쉽게 정리하는 경험이 자연스럽게 이어졌습니다.\n\n기록하고 정리하는 것을 좋아해 학습과 경험을 나눌 수 있는 WinterLog를 만들었습니다. 운동 서비스는 기능이 많고 복잡한 경우가 많아, 기본적인 운동을 하는 사람도 부담 없이 기록하고 꾸준히 이어갈 수 있는 서비스가 있으면 좋겠다는 생각에서 FitBuddy를 만들었습니다. 또 공부한 내용이 많아질수록 필요한 내용을 다시 찾기 어려웠던 경험에서 Winter Dev Archive를 만들어 학습 자료의 구조와 탐색 흐름을 정리했습니다.\n\n세 프로젝트 모두 제가 실제로 느낀 필요와 불편에서 시작했고, 만든 뒤에도 직접 사용하면서 화면과 기능을 계속 개선하고 있습니다. 이런 과정을 통해 사람의 필요를 발견하고, 아이디어를 실제로 사용할 수 있는 결과물로 만들어가는 과정에 흥미가 있다는 것을 알게 되었습니다.',
    },
  ],
  skills: [
    { id: 1,  icon: 'orange-diamond', name: 'HTML',                      category: 'Web',             description: '기초 학습 · 프로젝트 적용 경험',                                   showInHome: true },
    { id: 2,  icon: 'palette',        name: 'CSS',                       category: 'Web',             description: '기초 학습 · 프로젝트 적용 경험',                                   showInHome: true },
    { id: 3,  icon: 'zap',            name: 'JavaScript',                category: 'Web',             description: '기초 학습 · 프로젝트 적용 경험',                                   showInHome: true },
    { id: 4,  icon: 'atom',           name: 'React',                     category: 'Framework',       description: '기초 학습 · 프로젝트 적용 경험',                                   showInHome: true },
    { id: 5,  icon: 'storage',        name: 'Zustand',                   category: 'Framework',       description: '프로젝트 적용 경험',                                               showInHome: true },
    { id: 6,  icon: 'flow',           name: 'User Flow / Requirements',  category: 'Planning & UX',   description: '사용자 흐름 · 요구사항 정리 경험',                                 showInHome: true },
    { id: 7,  icon: 'flow',           name: 'IA / Navigation',           category: 'Planning & UX',   description: '정보구조 · 카테고리 · 목차 · 탐색 흐름 설계 경험',                 showInHome: true },
    { id: 8,  icon: 'flow',           name: 'QA / UX Review',            category: 'Planning & UX',   description: '화면과 기능을 직접 확인하고 문제와 개선 방향을 정리한 경험',       showInHome: true },
    { id: 9,  icon: 'figma',          name: 'Figma',                     category: 'Design',          description: '화면 설계 사용 경험',                                               showInHome: false },
    { id: 10, icon: 'palette',        name: 'Photoshop / Illustrator',   category: 'Design',          description: '교육 및 작업 경험',                                                 showInHome: false },
    { id: 11, icon: 'cloud',          name: 'Supabase',                  category: 'Backend & Data',  description: '프로젝트 적용 경험',                                               showInHome: false },
    { id: 12, icon: 'github',         name: 'Git / GitHub',              category: 'Tools',           description: '브랜치 · PR · 배포 과정 경험',                                     showInHome: false },
    { id: 13, icon: 'sparkles',       name: 'AI Tools',                  category: 'AI Workflow',     description: '요구사항 정리 · 구현 결과 검토 · 오류 확인 · 반복 개선',           showInHome: false },
  ],
};

const mainSkillCards = [
  { id: 'web-basics',   icon: 'orange-diamond', category: 'Web',           title: 'Web Basics',      techLine: 'HTML · CSS · JavaScript', description: '기초 학습 · 프로젝트 적용 경험' },
  { id: 'react',        icon: 'atom',           category: 'Framework',     title: 'React',                                                 description: '기초 학습 · 프로젝트 적용 경험' },
  { id: 'planning-ux',  icon: 'flow',           category: 'Planning & UX', title: 'Planning & UX',   techLine: 'User Flow · IA · QA',     description: '사용자 흐름 · 요구사항 · 정보구조 · 기능 검수 경험' },
  { id: 'ai-workflow',  icon: 'sparkles',       category: 'AI Workflow',   title: 'AI Workflow',                                           description: '요구사항 정리 · 결과 검토 · 오류 확인 · 반복 개선' },
];

function getHomeData() {
  return {
    basicInfo: aboutMeData.basicInfo,
    mainSkillCards,
  };
}

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
