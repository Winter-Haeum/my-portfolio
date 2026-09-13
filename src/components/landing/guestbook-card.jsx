import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { supabase } from '../../utils/supabase-client';

/* 관리자 전용 삭제 배지형 버튼 — 기존 keyword/비공개 배지와 동일한 톤(테두리+작은 패딩),
   위험 동작이므로 hover 시에만 붉은 강조 */
const DELETE_BTN_SX = {
  fontSize: '0.7rem',
  fontWeight: 600,
  lineHeight: 1.4,
  px: 0.8,
  py: 0.3,
  m: 0,
  appearance: 'none',
  border: '1.5px solid var(--color-border-light)',
  bgcolor: 'transparent',
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#d32f2f',
    color: '#d32f2f',
  },
  '&:focus-visible': {
    outline: '2px solid var(--color-secondary)',
    outlineOffset: '2px',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'default',
  },
};

/**
 * GuestbookCard 컴포넌트
 *
 * Props:
 * @param {number} id - 방명록 id [Required]
 * @param {string} name - 작성자 닉네임 [Required]
 * @param {string} message - 방명록 메시지 [Required]
 * @param {string} emoji - 선택한 이모지 [Optional, 기본값: '🌱']
 * @param {string} keyword - 한마디 키워드 [Optional]
 * @param {string} role - 소속/직업 [Optional]
 * @param {string} created_at - ISO 날짜 문자열 [Required]
 * @param {boolean} is_private - 비공개 여부 [Optional, 기본값: false]
 * @param {boolean} isAdmin - 관리자 모드 여부 [Optional, 기본값: false]
 * @param {function} onDeleted - 삭제 성공 시 부모에게 id를 알리는 콜백 [Optional]
 *
 * Example usage:
 * <GuestbookCard id={1} name="익명" message="응원해요!" emoji="🌱" created_at="2025-05-15T00:00:00Z" />
 */
function GuestbookCard({ id, name, message, emoji = '🌱', keyword, role, created_at, is_private = false, isAdmin = false, onDeleted }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

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

  /* 관리자 전용 — 원본 테이블에서 삭제. public view는 절대 대상으로 삼지 않음.
     실제 보안 경계는 Supabase RLS의 guestbook_admin_delete 정책 */
  const handleConfirmDelete = async () => {
    setDeleting(true);
    setDeleteError('');

    const { error } = await supabase.from('portfolio_guestbook').delete().eq('id', id);

    setDeleting(false);

    if (error) {
      setDeleteError('방명록을 삭제하지 못했습니다.');
      return;
    }

    setConfirmOpen(false);
    onDeleted?.(id);
  };

  /* 비공개 + 비관리자: 내용 가림 */
  if (is_private && !isAdmin) {
    return (
      <Box sx={{ ...cardBaseSx, bgcolor: 'var(--color-bg-secondary)' }}>
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
          {isAdmin && (
            <Box
              component='button'
              type='button'
              onClick={() => setConfirmOpen(true)}
              disabled={deleting}
              aria-label={`${name} 방명록 삭제`}
              sx={DELETE_BTN_SX}
            >
              {deleting ? '삭제 중...' : '🗑 삭제'}
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

      {isAdmin && (
        <Dialog
          open={confirmOpen}
          onClose={() => !deleting && setConfirmOpen(false)}
          PaperProps={{
            sx: {
              bgcolor: 'var(--color-bg-card)',
              color: 'var(--color-text-primary)',
              border: '2px solid var(--color-border)',
              boxShadow: '6px 6px 0px var(--color-border)',
              borderRadius: '4px',
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 800, color: 'var(--color-text-primary)' }}>
            이 방명록을 삭제할까요?
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              삭제한 방명록은 복구할 수 없습니다.
            </DialogContentText>
            {deleteError && (
              <Typography sx={{ color: '#d32f2f', fontSize: '0.8rem', mt: 1.5 }}>
                {deleteError}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setConfirmOpen(false)}
              disabled={deleting}
              sx={{
                color: 'var(--color-text-primary)',
                textTransform: 'none',
                '&:hover': { bgcolor: 'var(--color-btn-hover)' },
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={deleting}
              sx={{
                color: '#fff',
                bgcolor: '#d32f2f',
                textTransform: 'none',
                '&:hover': { bgcolor: '#b71c1c' },
                '&:disabled': { bgcolor: '#d32f2f', opacity: 0.5, color: '#fff' },
              }}
            >
              {deleting ? '삭제 중...' : '삭제'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default GuestbookCard;
