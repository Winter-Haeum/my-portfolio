import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GuestbookForm from './guestbook-form';
import GuestbookCard from './guestbook-card';
import { supabase } from '../../utils/supabase-client';

/* 관리자 Auth UID — 비밀값 아님(RLS의 guestbook_admin_select가 실제 보안 경계).
   여기서는 UI 표시/흐름 제어(로그인 성공 시 관리자 화면으로 전환)에만 사용 */
const ADMIN_USER_ID = '23efe695-6062-48bc-bc1c-d1f45f1bdbfa';

const GUESTBOOK_COLUMNS = 'id, name, message, emoji, keyword, role, created_at, is_private';

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
  const [fetchedFor, setFetchedFor] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  /* Supabase Auth 세션 확인 + 구독 — 실제 보안 경계는 RLS(guestbook_admin_select),
     이 UID 비교는 화면 전환(공개 view ↔ 원본 테이블)용 */
  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (ignore) return;
      setIsAdmin(session?.user?.id === ADMIN_USER_ID);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(session?.user?.id === ADMIN_USER_ID);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  /* isAdmin이 바뀌는 순간(로그인/로그아웃/새로고침 시 세션 복원) 렌더링 중에 즉시
     로딩 상태로 전환한다 (effect 안에서 setState를 동기 호출하지 않기 위한 패턴 —
     project-detail-page.jsx의 slug 전환과 동일한 방식) */
  if (isAdmin !== fetchedFor) {
    setFetchedFor(isAdmin);
    setLoading(true);
  }

  /* 목록 조회 — 비관리자는 공개 view, 관리자는 원본 테이블.
     setState는 항상 then() 콜백(비동기 시점)에서만 호출 */
  useEffect(() => {
    const table = isAdmin ? 'portfolio_guestbook' : 'portfolio_guestbook_public';
    let ignore = false;

    supabase
      .from(table)
      .select(GUESTBOOK_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data, error }) => {
        if (ignore) return;
        if (!error && data) setEntries(data);
        setLoading(false);
      });

    return () => { ignore = true; };
  }, [isAdmin]);

  /* 관리자 삭제 성공 시 — 재조회 없이 현재 목록에서 바로 제거 */
  const handleEntryDeleted = (deletedId) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== deletedId));
  };

  /* 새 글 작성 후 재조회 — 이벤트 핸들러에서 호출되므로 로딩 표시를 다시 켠다 */
  const refetchEntries = () => {
    const table = isAdmin ? 'portfolio_guestbook' : 'portfolio_guestbook_public';
    setLoading(true);
    supabase
      .from(table)
      .select(GUESTBOOK_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data, error }) => {
        if (!error && data) setEntries(data);
        setLoading(false);
      });
  };

  const handleAdminLogin = async () => {
    setAuthError('');
    setAuthLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });

    setAuthLoading(false);

    if (error) {
      setAuthError('로그인 정보를 확인해주세요.');
      return;
    }

    if (data.user?.id !== ADMIN_USER_ID) {
      setAuthError('관리자 계정이 아닙니다.');
      await supabase.auth.signOut();
      return;
    }

    setShowAdminLogin(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setAuthError('');
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
              <GuestbookCard key={entry.id} {...entry} isAdmin={isAdmin} onDeleted={handleEntryDeleted} />
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
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <TextField
                  size='small'
                  type='email'
                  label='관리자 이메일'
                  value={loginEmail}
                  onChange={(e) => { setLoginEmail(e.target.value); setAuthError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  sx={{ ...inputSx, width: 190 }}
                />
                <TextField
                  size='small'
                  type='password'
                  label='비밀번호'
                  value={loginPassword}
                  onChange={(e) => { setLoginPassword(e.target.value); setAuthError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  error={Boolean(authError)}
                  sx={{ ...inputSx, width: 150 }}
                />
              </Box>
              {authError && (
                <Typography sx={{ fontSize: '0.7rem', color: '#d32f2f' }}>{authError}</Typography>
              )}
            </Box>
            <Button
              onClick={handleAdminLogin}
              disabled={authLoading}
              size='small'
              sx={{
                fontSize: '0.75rem',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                bgcolor: 'var(--color-bg-card)',
                textTransform: 'none',
                px: 1.5,
                '&:hover': { bgcolor: 'var(--color-btn-hover)' },
              }}
            >
              {authLoading ? '확인 중...' : '확인'}
            </Button>
            <Typography
              component='button'
              type='button'
              onClick={() => { setShowAdminLogin(false); setLoginEmail(''); setLoginPassword(''); setAuthError(''); }}
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
