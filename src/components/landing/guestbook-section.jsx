import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GuestbookForm from './guestbook-form';
import GuestbookCard from './guestbook-card';
import { supabase } from '../../utils/supabase-client';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

/* 관리자 영역의 텍스트 링크형 버튼 공통 스타일 (기존 디자인 그대로, 시맨틱만 button으로) */
const ADMIN_LINK_BTN_SX = {
  fontSize: '0.7rem',
  color: 'var(--color-text-muted)',
  bgcolor: 'transparent',
  border: 'none',
  p: 0,
  m: 0,
  appearance: 'none',
  cursor: 'pointer',
  '&:hover': { color: 'var(--color-text-secondary)' },
  '&:focus-visible': {
    outline: '2px solid var(--color-secondary)',
    outlineOffset: '2px',
  },
};

/**
 * GuestbookSection 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <GuestbookSection />
 */
function GuestbookSection() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminInput, setAdminInput] = useState('');
  const [adminError, setAdminError] = useState(false);

  /* 최초 로드 — effect 안에서 직접 Promise 체인을 사용해
     setState가 항상 then() 콜백(비동기 시점)에서만 호출되도록 한다 */
  useEffect(() => {
    supabase
      .from('portfolio_guestbook')
      .select('id, name, message, emoji, keyword, role, created_at, is_private')
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data, error }) => {
        if (!error && data) setEntries(data);
        setLoading(false);
      });
  }, []);

  /* 새 글 작성 후 재조회 — 이벤트 핸들러에서 호출되므로 로딩 표시를 다시 켠다 */
  const refetchEntries = () => {
    setLoading(true);
    supabase
      .from('portfolio_guestbook')
      .select('id, name, message, emoji, keyword, role, created_at, is_private')
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data, error }) => {
        if (!error && data) setEntries(data);
        setLoading(false);
      });
  };

  const handleAdminLogin = () => {
    if (adminInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminInput('');
      setAdminError(false);
    } else {
      setAdminError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminError(false);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      fontSize: '0.8rem',
      '& fieldset': { borderColor: 'var(--color-border-light)' },
      '&:hover fieldset': { borderColor: 'var(--color-border)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--color-border)' },
    },
  };

  return (
    <Box>
      <Divider sx={{ my: 3, borderColor: 'var(--color-border-light)' }} />
      <Typography
        sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-secondary)', mb: 2.5 }}
      >
        방명록
      </Typography>

      <GuestbookForm onSubmitSuccess={refetchEntries} />

      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', py: 2 }}>
            불러오는 중...
          </Typography>
        ) : entries.length === 0 ? (
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', py: 2 }}>
            아직 방명록이 없어요. 첫 번째로 남겨주세요 🌱
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {entries.map((entry) => (
              <GuestbookCard key={entry.id} {...entry} isAdmin={isAdmin} />
            ))}
          </Box>
        )}
      </Box>

      {/* 관리자 영역 */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
        {isAdmin ? (
          <>
            <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
              관리자 모드 ✓
            </Typography>
            <Typography
              component='button'
              type='button'
              onClick={handleAdminLogout}
              sx={ADMIN_LINK_BTN_SX}
            >
              나가기
            </Typography>
          </>
        ) : showAdminLogin ? (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <TextField
                size='small'
                type='password'
                placeholder='관리자 비밀번호'
                value={adminInput}
                onChange={(e) => { setAdminInput(e.target.value); setAdminError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                error={adminError}
                sx={{ ...inputSx, width: 180 }}
              />
              {adminError && (
                <Typography sx={{ fontSize: '0.7rem', color: '#d32f2f' }}>비밀번호가 틀렸어요.</Typography>
              )}
            </Box>
            <Button
              onClick={handleAdminLogin}
              size='small'
              sx={{
                fontSize: '0.75rem',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                bgcolor: '#FFFFFF',
                textTransform: 'none',
                px: 1.5,
                '&:hover': { bgcolor: 'var(--color-btn-hover)' },
              }}
            >
              확인
            </Button>
            <Typography
              component='button'
              type='button'
              onClick={() => { setShowAdminLogin(false); setAdminInput(''); setAdminError(false); }}
              sx={{ ...ADMIN_LINK_BTN_SX, alignSelf: 'center' }}
            >
              취소
            </Typography>
          </Box>
        ) : (
          <Typography
            component='button'
            type='button'
            onClick={() => setShowAdminLogin(true)}
            sx={ADMIN_LINK_BTN_SX}
          >
            관리자
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default GuestbookSection;
