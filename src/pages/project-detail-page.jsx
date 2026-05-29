import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../utils/supabase-client';
import TechBadge from '../components/ui/tech-badge';

/* 상세페이지 대표 이미지 표시 방식 — 프로젝트별 설정 */
const DETAIL_IMAGE_STYLES = {
  WinterLog: { fit: 'cover', position: 'top center' },
  FitBuddy: { fit: 'cover', position: 'center center' },
};

const PROJECT_DETAILS = {
  WinterLog: {
    overview: [
      '공부 기록을 자유롭게 남기고 공유할 수 있는 커뮤니티 스타일 웹 프로젝트입니다.',
      '사용자가 게시글 형태로 학습 기록을 남기고,',
      '카테고리와 상태 태그를 통해 기록을 구분할 수 있도록 구성했습니다.',
    ],
    features: [
      '공부 기록 게시글 UI',
      '카테고리 사이드 메뉴',
      '상태 태그 표시',
      '공지사항 영역',
      '반응형 커뮤니티 레이아웃',
    ],
    techReasons: [
      { tech: 'React', reason: '화면을 컴포넌트 단위로 나누어 관리하기 위해 사용했습니다.' },
      { tech: 'JavaScript', reason: '사용자 인터랙션과 데이터 흐름을 구현하기 위해 사용했습니다.' },
      { tech: 'MUI', reason: 'UI 요소를 빠르게 구성하기 위해 사용했습니다.' },
      { tech: 'Supabase', reason: '데이터 저장과 백엔드 기능 연결을 위해 사용했습니다.' },
    ],
    implementationPoints: [
      '게시글 카드 구조 설계',
      '사이드바와 본문 영역 분리',
      '커뮤니티 서비스처럼 보이는 화면 흐름 구성',
      '학습 기록을 보기 쉽게 정리하는 UI 구성',
    ],
    learnings: [
      'React 컴포넌트 구조를 나누는 방법을 익혔습니다.',
      '게시글 중심 UI를 만들며 데이터가 화면에 배치되는 흐름을 이해했습니다.',
      '추후에는 검색, 댓글, 좋아요 기능을 더 안정적으로 개선할 예정입니다.',
    ],
  },
  FitBuddy: {
    shortDesc: '운동 타이머, 운동 기록, 캐릭터 성장, 챌린지와 피드 기능을 포함한 모바일 운동 웹 프로젝트.',
    overview: [
      'FitBuddy는 운동 기록과 캐릭터 성장을 하나로 묶은 모바일 퍼스트 운동 웹 서비스입니다.',
      '운동 종류별 타이머부터 기록 저장, 캐릭터 이미지, 챌린지, 피드까지 — 운동 습관을 꾸준히 이어가는 데 필요한 기능들을 한 곳에 담았습니다.',
      '단순한 운동 기록 앱이 아니라, 기록하고 공유하고 성장하는 흐름이 자연스럽게 이어지는 서비스를 만들어보고 싶어서 시작한 프로젝트입니다.',
    ],
    features: [
      '로그인 / 회원가입',
      '운동 타이머',
      '운동 종류 선택',
      '운동 종류별 캐릭터 표시',
      '운동 기록 저장',
      '기록관 운동 기록 조회',
      '운동 일기 작성',
      '운동 피드 게시글 조회',
      '챌린지 기능',
      '오늘 모임 기능',
      '프로필 관리',
      '캐릭터 성장 시스템',
      '식단 공유 기능',
      '운동 진행 미니 플레이어',
      '운동 데이터 저장 및 관리',
    ],
    techReasons: [
      { tech: 'React', reason: '모바일 화면을 컴포넌트 단위로 구성하기 위해 사용했습니다.' },
      { tech: 'Vite', reason: '빠른 개발 환경 구성을 위해 사용했습니다.' },
      { tech: 'MUI', reason: '폼, 버튼, 카드 UI를 빠르게 구성하기 위해 사용했습니다.' },
      { tech: 'Supabase', reason: '로그인, 사용자 정보, 운동 기록, 게시글 데이터를 저장하고 관리하기 위해 사용했습니다.' },
    ],
    implementationPoints: [
      '모바일 퍼스트 UI 설계',
      '로그인 및 회원가입 흐름 구현',
      '운동 타이머 기능 구현',
      '운동 데이터 저장 및 기록 관리',
      '운동 종류별 캐릭터 이미지 연결',
      '캐릭터 성장 시스템 설계',
      '운동 진행 상태 유지 기능',
      '피드 및 SNS 기능 구현',
      '챌린지 / 오늘 모임 기능 구현',
      '사용자 프로필 관리 기능 구현',
      '운동 기록과 캐릭터를 연결한 UX 설계',
    ],
    learnings: [
      '모바일 환경을 기준으로 UI를 설계하는 방법을 연습했습니다.',
      '운동 타이머, 운동 기록, 사용자 정보처럼 여러 화면에서 공유되는 데이터를 관리하는 흐름을 고민했습니다.',
      '초기에는 단순 운동 기록 앱으로 시작했지만, 이후 캐릭터 성장, 운동별 캐릭터, 챌린지, 피드 기능을 추가하면서 서비스 구조로 확장했습니다.',
      '사용자가 운동을 꾸준히 이어갈 수 있도록 기록, 성장, 커뮤니티 요소를 연결하는 방향으로 개선하고 있습니다.',
      '앞으로는 만보기, 알림, 추천 루틴, 1대1 채팅 기능까지 확장할 예정입니다.',
    ],
  },
};

/**
 * SectionBlock - 레트로 라벨 + 흰색 카드 섹션
 *
 * Props:
 * @param {string} label - 섹션 제목 [Required]
 * @param {string} labelColor - 라벨 배경색 [Optional, 기본값: '#F4845F']
 * @param {React.ReactNode} children [Required]
 */
function SectionBlock({ label, labelColor = '#F4845F', children }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Box
        sx={{
          display: 'inline-block',
          bgcolor: labelColor,
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0px #1A1A1A',
          px: 2,
          py: 0.4,
          mb: 1.5,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: '#1A1A1A' }}>
          {label}
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: '#fff',
          border: '2px solid #1A1A1A',
          boxShadow: '4px 4px 0px #1A1A1A',
          p: { xs: 2.5, md: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/**
 * BulletItem - 불릿 리스트 아이템
 *
 * Props:
 * @param {string} text [Required]
 */
function BulletItem({ text }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2, mb: 0.9 }}>
      <Box
        sx={{
          width: 7,
          height: 7,
          bgcolor: '#F4845F',
          border: '1.5px solid #1A1A1A',
          flexShrink: 0,
          mt: 0.65,
        }}
      />
      <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.7, color: '#333' }}>
        {text}
      </Typography>
    </Box>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState(state?.project || null);
  const [loading, setLoading] = useState(!state?.project);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      supabase
        .from('portfolio_projects')
        .select('*')
        .ilike('title', slug.replace(/-/g, ' '))
        .single()
        .then(({ data }) => {
          setProject(data);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box
        sx={{ bgcolor: 'var(--color-bg-primary)', minHeight: 'calc(100vh - 64px)', py: 8 }}
      >
        <Container maxWidth='md'>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            프로젝트를 찾을 수 없습니다.
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/projects')}
            sx={{
              bgcolor: '#fff',
              color: '#1A1A1A',
              border: '2px solid #1A1A1A',
              boxShadow: '3px 3px 0px #1A1A1A',
              '&:hover': {
                bgcolor: '#F5F5F5',
                boxShadow: '1px 1px 0px #1A1A1A',
                transform: 'translate(2px, 2px)',
              },
            }}
          >
            목록으로
          </Button>
        </Container>
      </Box>
    );
  }

  const details = PROJECT_DETAILS[project.title] || null;
  const detailStyle = DETAIL_IMAGE_STYLES[project.title] || { fit: 'cover', position: 'center center' };

  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='md'>
        {/* 뒤로가기 + 프로젝트 목록 */}
        <Box sx={{ display: 'flex', gap: '14px', mb: 3.5 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: '#fff',
              color: '#1A1A1A',
              border: '2px solid #1A1A1A',
              boxShadow: '3px 3px 0px #1A1A1A',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#F5F5F5',
                boxShadow: '1px 1px 0px #1A1A1A',
                transform: 'translate(2px, 2px)',
              },
            }}
          >
            Back
          </Button>
          <Button
            startIcon={<FormatListBulletedIcon />}
            onClick={() => navigate('/projects')}
            sx={{
              bgcolor: '#fff',
              color: '#1A1A1A',
              border: '2px solid #1A1A1A',
              boxShadow: '3px 3px 0px #1A1A1A',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#F5F5F5',
                boxShadow: '1px 1px 0px #1A1A1A',
                transform: 'translate(2px, 2px)',
              },
            }}
          >
            프로젝트 목록
          </Button>
        </Box>

        {/* 대표 이미지 */}
        {!imgError ? (
          <Box
            component='img'
            src={project.thumbnail_url}
            alt={project.title}
            loading='lazy'
            onError={() => setImgError(true)}
            sx={{
              width: '100%',
              height: { xs: 240, md: 480 },
              objectFit: detailStyle.fit,
              objectPosition: detailStyle.position,
              display: 'block',
              border: '2px solid #1A1A1A',
              boxShadow: '6px 6px 0px #1A1A1A',
              mb: 4,
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: { xs: 240, md: 480 },
              bgcolor: '#FAF0E8',
              border: '2px solid #1A1A1A',
              boxShadow: '6px 6px 0px #1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Typography sx={{ color: '#1A1A1A22', fontSize: '4rem' }}>🖥️</Typography>
          </Box>
        )}

        {/* 제목 + 타입 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 1,
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '2.6rem' } }}
          >
            {project.title}
          </Typography>
          <Chip
            label={project.project_type}
            sx={{
              border: '2px solid #1A1A1A',
              boxShadow: '2px 2px 0px #1A1A1A',
              bgcolor: 'transparent',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          />
        </Box>

        {/* 한 줄 요약 */}
        <Typography
          sx={{
            color: '#666',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.75,
            mb: 4,
          }}
        >
          {details?.shortDesc || project.description}
        </Typography>

        {details ? (
          <>
            {/* 프로젝트 개요 */}
            <SectionBlock label='프로젝트 개요' labelColor='#F4845F'>
              {details.overview.map((sentence, i) => (
                <Typography
                  key={i}
                  sx={{ color: '#333', fontSize: '0.95rem', lineHeight: 1.9, mb: i < details.overview.length - 1 ? 0.8 : 0 }}
                >
                  {sentence}
                </Typography>
              ))}
            </SectionBlock>

            {/* 주요 기능 */}
            <SectionBlock label='주요 기능' labelColor='#F5C842'>
              {details.features.map((f, i) => (
                <BulletItem key={i} text={f} />
              ))}
            </SectionBlock>

            {/* 사용 기술과 이유 */}
            <SectionBlock label='사용 기술과 이유' labelColor='#4BAE76'>
              {details.techReasons.map(({ tech, reason }) => (
                <Box
                  key={tech}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.7,
                    mb: 2.2,
                    '&:last-child': { mb: 0 },
                  }}
                >
                  <TechBadge tech={tech} size='md' />
                  <Typography sx={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.75, pl: 0.5 }}>
                    {reason}
                  </Typography>
                </Box>
              ))}
            </SectionBlock>

            {/* 구현 포인트 */}
            <SectionBlock label='구현 포인트' labelColor='#F4845F'>
              {details.implementationPoints.map((p, i) => (
                <BulletItem key={i} text={p} />
              ))}
            </SectionBlock>

            {/* 배운 점 / 개선한 점 */}
            <SectionBlock label='배운 점 / 개선한 점' labelColor='#F5C842'>
              {details.learnings.map((sentence, i) => (
                <Typography
                  key={i}
                  sx={{ color: '#333', fontSize: '0.95rem', lineHeight: 1.9, mb: i < details.learnings.length - 1 ? 0.8 : 0 }}
                >
                  {sentence}
                </Typography>
              ))}
            </SectionBlock>
          </>
        ) : (
          /* 상세 내용 미등록 시 기술 스택만 표시 */
          <SectionBlock label='기술 스택' labelColor='#F5C842'>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {project.tech_stack?.map((tech) => (
                <TechBadge key={tech} tech={tech} size='md' />
              ))}
            </Box>
          </SectionBlock>
        )}

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1.5 }}>
          {project.detail_url && (
            <Button
              startIcon={<OpenInNewIcon />}
              href={project.detail_url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                bgcolor: '#fff',
                color: '#1A1A1A',
                border: '2px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                px: 3,
                py: 1.2,
                fontSize: '0.95rem',
                '&:hover': {
                  bgcolor: '#F4845F',
                  boxShadow: '2px 2px 0px #1A1A1A',
                  transform: 'translate(2px, 2px)',
                },
              }}
            >
              Live Demo
            </Button>
          )}
          {project.github_url && (
            <Button
              startIcon={<GitHubIcon />}
              href={project.github_url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                bgcolor: '#fff',
                color: '#1A1A1A',
                border: '2px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                px: 3,
                py: 1.2,
                fontSize: '0.95rem',
                '&:hover': {
                  bgcolor: '#E5E5E5',
                  boxShadow: '2px 2px 0px #1A1A1A',
                  transform: 'translate(2px, 2px)',
                },
              }}
            >
              GitHub
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectDetailPage;
