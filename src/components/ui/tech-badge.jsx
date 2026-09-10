import Box from '@mui/material/Box';

const TECH_ICON_URLS = {
  'React': 'https://cdn.simpleicons.org/react',
  'JavaScript': 'https://cdn.simpleicons.org/javascript',
  'MUI': 'https://cdn.simpleicons.org/mui',
  'Supabase': 'https://cdn.simpleicons.org/supabase',
  'Vite': 'https://cdn.simpleicons.org/vite',
  'CSS': 'https://cdn.simpleicons.org/css3',
  'GitHub Pages': 'https://cdn.simpleicons.org/github',
  'TypeScript': 'https://cdn.simpleicons.org/typescript',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs',
};

/**
 * TechBadge - 기술 스택 아이콘+텍스트 pill 뱃지
 *
 * Props:
 * @param {string} tech - 기술 스택 이름 [Required]
 * @param {string} size - 뱃지 크기: 'sm' | 'md' [Optional, 기본값: 'sm']
 *
 * Example usage:
 * <TechBadge tech="React" />
 * <TechBadge tech="Supabase" size="md" />
 */
function TechBadge({ tech, size = 'sm' }) {
  const iconUrl = TECH_ICON_URLS[tech];
  const isMd = size === 'md';

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.6,
        px: isMd ? 1.5 : 1.2,
        py: isMd ? 0.6 : 0.4,
        bgcolor: 'var(--color-bg-card)',
        border: '1.5px solid var(--color-border)',
        borderRadius: '20px',
        fontSize: isMd ? '0.8rem' : '0.72rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        cursor: 'default',
        userSelect: 'none',
        transition: 'all 0.15s ease',
        '&:hover': {
          bgcolor: 'var(--color-bg-primary)',
          transform: 'translate(-1px, -1px)',
          boxShadow: '2px 2px 0px var(--color-border)',
        },
      }}
    >
      {iconUrl && (
        <Box
          component='img'
          src={iconUrl}
          alt={tech}
          sx={{ width: isMd ? 16 : 13, height: isMd ? 16 : 13, display: 'block' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      {tech}
    </Box>
  );
}

export default TechBadge;
