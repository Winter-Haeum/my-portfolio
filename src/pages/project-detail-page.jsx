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

/* 상세페이지 대표 이미지 표시 방식 — 프로젝트별 설정 (기존 crop 유지, 신규 항목만 추가) */
const DETAIL_IMAGE_STYLES = {
  WinterLog: { fit: 'cover', position: 'top center' },
  FitBuddy: { fit: 'cover', position: 'center center' },
  'Winter Dev Archive': { fit: 'cover', position: 'top center' },
};

/* 섹션 라벨 색상 순환 — index.css의 기존 토큰(--color-primary/accent/secondary) 재사용 */
const SECTION_COLORS = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)'];

/* 본문 문단 공통 스타일 (15~16px, line-height 1.65~1.75) */
const BODY_TEXT_SX = { color: '#333', fontSize: '0.95rem', lineHeight: 1.72 };
const MICRO_LABEL_SX = { fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.5 };

const PROJECT_DETAILS = {
  WinterLog: {
    period: '2026.05 – 현재',
    role: '개인 프로젝트 · 기획 / 프론트엔드',
    statusBadge: '기본 구현 완료 · 개선 중',
    tagline: '학습자들이 공부 정보를 나누고 다시 찾아볼 수 있는 정보 공유 웹 서비스',
    intro: [
      '학습자들이 공부하면서 얻은 정보와 경험을 기록하고 서로 공유할 수 있도록 만든 정보 공유 웹 서비스입니다.',
      '서비스 콘셉트와 사용자 흐름을 정리하고 게시글 작성·상세, 인증, 댓글 등 정보 공유에 필요한 핵심 기능을 구현했습니다.',
    ],
    features: [
      '게시글 작성 및 상세',
      '사용자 인증',
      '댓글',
      '마크다운 작성 및 렌더링',
      '학습 정보 기록 및 공유',
    ],
    techStack: ['React', 'JavaScript', 'MUI', 'React Router', 'Zustand', 'Supabase', 'Vite', 'GitHub Pages'],
    techHighlights: [
      { tech: 'React Router', usage: '화면 이동 및 라우팅 구성' },
      { tech: 'Zustand', usage: '인증 상태 관리' },
      { tech: 'Supabase', usage: '인증·게시글·댓글 데이터 연결' },
      { tech: 'Markdown', usage: '학습 내용을 구조적으로 작성하고 렌더링' },
    ],
    scopeLabel: '설계·구현 포인트',
    scope: [
      '서비스의 사용자 흐름을 먼저 정리하고 게시글 작성·상세, 인증, 댓글 등 정보 공유 서비스의 기본 흐름을 구현했습니다.',
      'React Router로 화면 이동을 구성하고 Zustand로 인증 상태를 관리했으며 Supabase를 인증·게시글·댓글 데이터와 연결했습니다.',
    ],
    experienceLabel: '구현 특징',
    experienceTitle: '마크다운 기반 학습 기록',
    experience: [
      '마크다운 작성·렌더링 기능을 적용해 학습 내용을 구조적으로 기록하고 공유할 수 있도록 구성했습니다.',
      '단순한 짧은 게시글뿐 아니라 코드와 학습 내용을 정리해서 공유하는 서비스의 목적에 맞게 콘텐츠 작성 방식을 구성했습니다.',
    ],
    status: '기본 기능 구현을 완료했으며 현재 화면과 기능을 계속 보완하고 있습니다.',
  },
  FitBuddy: {
    period: '2026.05 – 현재',
    role: '개인 프로젝트 · 기획 / 프론트엔드',
    tagline: '익숙한 운동을 부담 없이 기록하고 꾸준히 이어가기 위한 운동 SNS 서비스',
    intro: [
      '기본적인 운동을 쉽게 기록하고 꾸준히 이어갈 수 있도록 사용자 흐름과 주요 기능을 직접 기획·구현한 운동 SNS 서비스입니다.',
      '운동 기록뿐 아니라 게시글과 피드, 일기, 챌린지, 프로필을 함께 구성해 기록과 지속적인 사용이 연결될 수 있도록 제작했습니다.',
    ],
    features: [
      '게시글 작성 및 관리',
      '피드',
      '운동 기록',
      '일기',
      '챌린지',
      '프로필',
    ],
    techStack: ['React', 'JavaScript', 'CSS', 'Vite', 'Supabase', 'GitHub Pages'],
    techHighlights: [],
    scopeLabel: '구현 범위',
    scope: [
      '게시글·피드·운동 기록·일기·챌린지·프로필 등 서비스 전반의 화면과 기능을 구현했습니다.',
      '기능을 단순히 추가하는 것보다 실제 사용 과정에서 흐름이 복잡해지는 부분을 확인하고 사용성과 유지보수성을 함께 개선하는 방향으로 작업했습니다.',
    ],
    experienceLabel: '문제 → 해결',
    experienceTitle: '게시글 수정 흐름 개선',
    experience: [
      '게시글 수정 기능을 별도의 복잡한 모달 구조로 구성하면서 작성 화면과 수정 화면의 관리가 복잡해지는 문제가 있었습니다.',
      '기존 게시글 작성 페이지를 수정 화면에서도 재사용하도록 구조를 변경해 중복되는 관리 부담을 줄이고 사용자가 작성·수정 과정에서 느끼는 불편도 함께 줄였습니다.',
    ],
    status: '현재도 실제 사용 과정에서 발견한 문제를 기준으로 기능과 UX를 지속적으로 개선하고 있습니다.',
  },
  'Winter Dev Archive': {
    period: '2026.06 – 현재',
    role: '개인 프로젝트 · 기획 / 프론트엔드',
    tagline: 'JavaScript·React 학습 내용을 다시 찾아보기 위한 개인 학습 아카이브',
    intro: [
      '프로젝트를 진행하면서 이전에 배운 내용을 다시 찾아보기 어려웠던 경험에서 시작한 개인 학습 아카이브입니다.',
      'JavaScript와 React 학습 내용을 단순히 저장하는 것이 아니라 필요할 때 원하는 내용을 빠르게 다시 찾고 공부할 수 있도록 정보 구조와 이동 흐름을 중심으로 구성했습니다.',
    ],
    features: [
      '학습 콘텐츠 카테고리 구성',
      '문서 목차',
      '검색',
      '내비게이션',
      '문서 라우팅',
      '학습 자료 구조화',
    ],
    techStack: ['React', 'JavaScript', 'CSS', 'Vite', 'GitHub Pages'],
    techHighlights: [],
    scopeLabel: '설계·구현 포인트',
    scope: [
      'IA(정보 구조), 카테고리, 목차, 검색, 내비게이션, 라우팅과 컴포넌트 구조를 직접 정리했습니다.',
      '학습 자료가 계속 늘어나더라도 사용자가 원하는 내용을 빠르게 찾을 수 있도록 콘텐츠 구조와 이동 경로를 중요하게 설계했습니다.',
    ],
    experienceLabel: '개선 과정',
    experienceTitle: null,
    experience: [
      '학습 자료가 늘어날수록 원하는 내용을 다시 찾기 어려워지는 문제를 기준으로 카테고리와 목차, 검색, 내비게이션 구조를 반복해서 검토했습니다.',
      '단순히 콘텐츠를 추가하는 데 그치지 않고 필요한 정보에 빠르게 접근할 수 있는지를 실제 화면에서 확인하며 정보 구조와 이동 흐름을 계속 개선하고 있습니다.',
    ],
    status: '현재도 학습 콘텐츠와 기능을 계속 보완하며 학습 아카이브의 완성도를 높이고 있습니다.',
  },
};

/**
 * SectionBlock - 레트로 라벨 + 흰색 카드 섹션
 *
 * Props:
 * @param {string} label - 섹션 제목 [Required]
 * @param {string} labelColor - 라벨 배경색 [Optional, 기본값: 'var(--color-primary)']
 * @param {boolean} isDense - 내용이 짧은 섹션용 compact padding [Optional, 기본값: false]
 * @param {boolean} isAccent - 왼쪽 accent border로 위계를 한 단계 높임 (핵심 경험 섹션용) [Optional, 기본값: false]
 * @param {React.ReactNode} children [Required]
 */
function SectionBlock({ label, labelColor = 'var(--color-primary)', isDense = false, isAccent = false, children }) {
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
          borderLeft: isAccent ? `5px solid ${labelColor}` : '2px solid #1A1A1A',
          boxShadow: '4px 4px 0px #1A1A1A',
          p: isDense ? { xs: 1.75, md: 2 } : { xs: 2, md: 2.5 },
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
 * @param {boolean} isDense - 항목 간 세로 간격을 축소 (features 목록 전용) [Optional, 기본값: false]
 */
function BulletItem({ text, isDense = false }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2, mb: isDense ? 0.75 : 1 }}>
      <Box
        sx={{
          width: 7,
          height: 7,
          bgcolor: 'var(--color-primary)',
          border: '1.5px solid #1A1A1A',
          flexShrink: 0,
          mt: 0.75,
        }}
      />
      <Typography sx={BODY_TEXT_SX}>
        {text}
      </Typography>
    </Box>
  );
}

/**
 * ProjectLinkButtons - LIVE DEMO / GITHUB 링크 버튼
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 (detail_url, github_url 사용) [Required]
 */
function ProjectLinkButtons({ project }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
        .maybeSingle()
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
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {details?.statusBadge && (
              <Chip
                label={details.statusBadge}
                sx={{
                  border: '2px solid #1A1A1A',
                  boxShadow: '2px 2px 0px #1A1A1A',
                  bgcolor: 'var(--color-secondary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              />
            )}
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
        </Box>

        {/* 기간 · 역할 */}
        {details && (
          <Typography sx={{ color: '#888', fontSize: '0.85rem', fontWeight: 700, mb: 1 }}>
            {details.period} · {details.role}
          </Typography>
        )}

        {/* 한 줄 요약 */}
        <Typography
          sx={{
            color: '#666',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.75,
            mb: 4,
          }}
        >
          {details?.tagline || details?.shortDesc || project.description}
        </Typography>

        {details ? (
          <>
            {/* 01. 프로젝트 소개 */}
            <SectionBlock label='01. 프로젝트 소개' labelColor={SECTION_COLORS[0]}>
              {details.intro.map((sentence, i) => (
                <Typography
                  key={i}
                  sx={{ ...BODY_TEXT_SX, mb: i < details.intro.length - 1 ? 1.1 : 0 }}
                >
                  {sentence}
                </Typography>
              ))}
            </SectionBlock>

            {/* 02. 주요 기능 — bullet 간격만 compact (BulletItem 기본값은 유지) */}
            <SectionBlock label='02. 주요 기능' labelColor={SECTION_COLORS[1]}>
              {details.features.map((f, i) => (
                <BulletItem key={i} text={f} isDense />
              ))}
            </SectionBlock>

            {/* 03. 기술 및 활용 */}
            <SectionBlock label='03. 기술 및 활용' labelColor={SECTION_COLORS[2]}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                  mb: details.techHighlights.length > 0 ? 2.5 : 0,
                }}
              >
                {details.techStack.map((tech) => (
                  <TechBadge key={tech} tech={tech} size='md' />
                ))}
              </Box>
              {details.techHighlights.length > 0 && (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    columnGap: 3,
                    rowGap: 1.6,
                  }}
                >
                  {details.techHighlights.map(({ tech, usage }) => (
                    <Box key={tech} sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                      <Typography sx={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 700 }}>
                        {tech}
                      </Typography>
                      <Typography sx={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.7, pl: 0.5 }}>
                        → {usage}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </SectionBlock>

            {/* 04. 구현 범위 / 설계·구현 포인트 */}
            <SectionBlock label={`04. ${details.scopeLabel}`} labelColor={SECTION_COLORS[0]}>
              {details.scope.map((sentence, i) => (
                <Typography
                  key={i}
                  sx={{ ...BODY_TEXT_SX, mb: i < details.scope.length - 1 ? 1.1 : 0 }}
                >
                  {sentence}
                </Typography>
              ))}
            </SectionBlock>

            {/* 05. 문제 → 해결 / 개선 과정 / 구현 특징 — 핵심 경험 섹션이므로 accent border로 위계 강화 */}
            <SectionBlock label={`05. ${details.experienceLabel}`} labelColor={SECTION_COLORS[1]} isAccent>
              {details.experienceTitle && (
                <Typography sx={{ color: '#1A1A1A', fontSize: '1.05rem', fontWeight: 900, mb: 1.3 }}>
                  {details.experienceTitle}
                </Typography>
              )}
              {details.experienceLabel === '문제 → 해결' && details.experience.length >= 2 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                  <Box>
                    <Typography sx={{ ...MICRO_LABEL_SX, color: 'var(--color-primary)' }}>문제</Typography>
                    <Typography sx={BODY_TEXT_SX}>{details.experience[0]}</Typography>
                  </Box>
                  <Box sx={{ borderTop: '1.5px dashed var(--color-border-light)', pt: 1.8 }}>
                    <Typography sx={{ ...MICRO_LABEL_SX, color: 'var(--color-secondary)' }}>해결</Typography>
                    <Typography sx={BODY_TEXT_SX}>{details.experience.slice(1).join(' ')}</Typography>
                  </Box>
                </Box>
              ) : (
                details.experience.map((sentence, i) => (
                  <Typography
                    key={i}
                    sx={{ ...BODY_TEXT_SX, mb: i < details.experience.length - 1 ? 1.1 : 0 }}
                  >
                    {sentence}
                  </Typography>
                ))
              )}
            </SectionBlock>

            {/* 06. 현재 상태 */}
            <SectionBlock label='06. 현재 상태' labelColor={SECTION_COLORS[2]} isDense>
              <Typography sx={BODY_TEXT_SX}>
                {details.status}
              </Typography>
            </SectionBlock>

            {/* 07. 프로젝트 링크 */}
            <SectionBlock label='07. 프로젝트 링크' labelColor={SECTION_COLORS[0]} isDense>
              <ProjectLinkButtons project={project} />
            </SectionBlock>
          </>
        ) : (
          <>
            {/* 상세 내용 미등록 시 기술 스택만 표시 */}
            <SectionBlock label='기술 스택' labelColor={SECTION_COLORS[1]}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.tech_stack?.map((tech) => (
                  <TechBadge key={tech} tech={tech} size='md' />
                ))}
              </Box>
            </SectionBlock>

            {/* 액션 버튼 */}
            <Box sx={{ mt: 1.5 }}>
              <ProjectLinkButtons project={project} />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

export default ProjectDetailPage;
