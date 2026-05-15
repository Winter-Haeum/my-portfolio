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
 * @param {boolean} is_private - 비공개 여부 [Optional, 기본값: false]
 * @param {boolean} isAdmin - 관리자 모드 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookCard name="익명" message="응원해요!" emoji="🌱" created_at="2025-05-15T00:00:00Z" />
 */
function GuestbookCard({ name, message, emoji = '🌱', keyword, role, created_at, is_private = false, isAdmin = false }) {
  const date = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const cardBaseSx = {
    border: '2px solid var(--color-border-light)',
    borderRadius: 1,
    p: { xs: 2, md: 2.5 },
    transition: 'box-shadow 0.2s, transform 0.15s',
    '&:hover': {
      boxShadow: '3px 3px 0px var(--color-border-light)',
      transform: 'translate(-1px, -1px)',
    },
  };

  /* 비공개 + 비관리자: 내용 가림 */
  if (is_private && !isAdmin) {
    return (
      <Box sx={{ ...cardBaseSx, bgcolor: '#F8F8F8' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            비공개 방명록입니다 🔒
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', mt: 0.5 }}>
          {name} · {date}
        </Typography>
      </Box>
    );
  }

  /* 공개 또는 관리자 */
  return (
    <Box sx={{ ...cardBaseSx, bgcolor: 'var(--color-bg-primary)' }}>
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
        <Box sx={{ ml: 'auto', display: 'flex', gap: 0.8, alignItems: 'center' }}>
          {is_private && (
            <Box
              sx={{
                fontSize: '0.7rem',
                px: 0.8,
                py: 0.3,
                border: '1.5px solid var(--color-border-light)',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
              }}
            >
              🔒 비공개
            </Box>
          )}
          {keyword && (
            <Box
              sx={{
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
