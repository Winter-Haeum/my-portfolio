import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

/**
 * SkillProgressCard 컴포넌트
 *
 * Props:
 * @param {object} skill - 스킬 데이터 객체 [Required]
 * @param {number} skill.id - 고유 ID
 * @param {node} skill.icon - MUI 아이콘 엘리먼트
 * @param {string} skill.name - 기술명
 * @param {number} skill.level - 숙련도 (0~100)
 * @param {string} skill.category - 카테고리 (Frontend, Framework, Design, Tool, AI)
 * @param {string} skill.description - 툴팁 설명
 * @param {number} animationDelay - 프로그레스 바 애니메이션 지연 (ms) [Optional, 기본값: 0]
 *
 * Example usage:
 * <SkillProgressCard skill={skillItem} animationDelay={100} />
 */

const CATEGORY_COLORS = {
  Frontend: '#F4845F',
  Framework: '#7AB5E8',
  Design: '#A855C8',
  Tool: '#888888',
  AI: '#4BAE76',
};

function SkillProgressCard({ skill, animationDelay = 0 }) {
  const [progress, setProgress] = useState(0);
  const categoryColor = CATEGORY_COLORS[skill.category] || '#888888';

  useEffect(() => {
    const timer = setTimeout(() => setProgress(skill.level), 300 + animationDelay);
    return () => clearTimeout(timer);
  }, [skill.level, animationDelay]);

  return (
    <Tooltip title={ skill.description } placement='top' arrow>
      <Box
        sx={{
          p: 2.5,
          border: '2px solid var(--color-border)',
          boxShadow: '3px 3px 0px var(--color-border)',
          bgcolor: 'var(--color-bg-card)',
          borderRadius: '4px',
          cursor: 'default',
          transition: 'transform 0.15s, box-shadow 0.15s',
          '&:hover': {
            transform: 'translate(-2px, -2px)',
            boxShadow: '5px 5px 0px var(--color-border)',
          },
        }}
      >
        {/* 기술명 + 카테고리 뱃지 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                bgcolor: categoryColor,
                border: '1.5px solid var(--color-border)',
                borderRadius: '4px',
                color: '#fff',
                flexShrink: 0,
                '& svg': { fontSize: 18 },
              }}
            >
              { skill.icon }
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
              { skill.name }
            </Typography>
          </Box>
          <Box
            sx={{
              px: 1,
              py: 0.3,
              bgcolor: categoryColor,
              border: '1.5px solid var(--color-border)',
              borderRadius: '4px',
              opacity: 0.85,
            }}
          >
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
              { skill.category }
            </Typography>
          </Box>
        </Box>

        {/* 프로그레스 바 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              flex: 1,
              height: 10,
              bgcolor: '#E0D8D0',
              border: '1.5px solid var(--color-border)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${ progress }%`,
                bgcolor: categoryColor,
                transition: 'width 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '1px',
              }}
            />
          </Box>
          <Typography
            sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', minWidth: 34, textAlign: 'right' }}
          >
            { skill.level }%
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
}

export default SkillProgressCard;
