import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * GuestbookCard 컴포넌트
 *
 * Props:
 * @param {string} name - 작성자 닉네임 [Required]
 * @param {string} message - 방명록 메시지 [Required]
 * @param {string} emoji - 선택한 이모지 [Optional, 기본값: '🌱']
 * @param {string} keyword - 한마디 키워드 [Optional]
 * @param {string} role - 소속/직업 [Optional]
 * @param {string} created_at - ISO 날짜 문자열 [Required]
 *
 * Example usage:
 * <GuestbookCard name="익명" message="응원해요!" emoji="🌱" created_at="2025-05-15T00:00:00Z" />
 */
function GuestbookCard({ name, message, emoji = '🌱', keyword, role, created_at }) {
  const date = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Box
      sx={{
        border: '2px solid var(--color-border-light)',
        borderRadius: 1,
        p: { xs: 2, md: 2.5 },
        bgcolor: 'var(--color-bg-primary)',
        transition: 'box-shadow 0.2s, transform 0.15s',
        '&:hover': {
          boxShadow: '3px 3px 0px var(--color-border-light)',
          transform: 'translate(-1px, -1px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Box sx={{ fontSize: '1.2rem', lineHeight: 1 }}>{emoji}</Box>
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
          {name}
        </Typography>
        {role && (
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            · {role}
          </Typography>
        )}
        {keyword && (
          <Box
            sx={{
              ml: 'auto',
              fontSize: '0.7rem',
              px: 1,
              py: 0.3,
              border: '1.5px solid var(--color-border)',
              bgcolor: 'var(--color-btn-active)',
              color: 'var(--color-text-primary)',
              fontWeight: 700,
            }}
          >
            {keyword}
          </Box>
        )}
      </Box>
      <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, mb: 1 }}>
        {message}
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        {date}
      </Typography>
    </Box>
  );
}

export default GuestbookCard;
