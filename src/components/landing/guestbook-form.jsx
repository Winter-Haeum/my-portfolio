import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { supabase } from '../../utils/supabase-client';

const EMOJIS = ['🌱', '☁️', '✨', '💜', '🐰', '☕', '🌙'];
const KEYWORDS = ['응원', '성장', '감성', '화이팅'];

/**
 * GuestbookForm 컴포넌트
 *
 * Props:
 * @param {function} onSubmitSuccess - 등록 성공 시 부모에게 알리는 콜백 [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmitSuccess={handleRefresh} />
 */
function GuestbookForm({ onSubmitSuccess }) {
  const [form, setForm] = useState({
    name: '',
    message: '',
    email: '',
    role: '',
    emoji: '🌱',
    keyword: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, msg: '' });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEmoji = (emoji) => {
    setForm((prev) => ({ ...prev, emoji }));
  };

  const handleKeyword = (keyword) => {
    setForm((prev) => ({ ...prev, keyword: prev.keyword === keyword ? '' : keyword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setLoading(true);
    const { error } = await supabase.from('portfolio_guestbook').insert([
      {
        name: form.name.trim(),
        message: form.message.trim(),
        email: form.email.trim() || null,
        role: form.role.trim() || null,
        emoji: form.emoji,
        keyword: form.keyword || null,
      },
    ]);
    setLoading(false);

    if (error) {
      setSnackbar({ open: true, msg: '등록 중 오류가 발생했어요 😢' });
      return;
    }

    setSnackbar({ open: true, msg: '방명록이 등록되었어요 🌱' });
    setForm({ name: '', message: '', email: '', role: '', emoji: '🌱', keyword: '' });
    onSubmitSuccess();
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1,
      '& fieldset': { borderColor: 'var(--color-border-light)' },
      '&:hover fieldset': { borderColor: 'var(--color-border)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--color-border)' },
    },
  };

  return (
    <>
      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
          방명록 남기기
        </Typography>

        {/* 이모지 선택 */}
        <Box>
          <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', mb: 0.8 }}>
            오늘의 감정
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {EMOJIS.map((emoji) => (
              <Box
                key={emoji}
                onClick={() => handleEmoji(emoji)}
                sx={{
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  p: 0.6,
                  border: '2px solid',
                  borderColor: form.emoji === emoji ? 'var(--color-border)' : 'var(--color-border-light)',
                  borderRadius: 1,
                  bgcolor: form.emoji === emoji ? 'var(--color-btn-active)' : 'var(--color-btn-base)',
                  boxShadow: form.emoji === emoji ? '2px 2px 0px var(--color-border)' : 'none',
                  transition: 'border-color 0.15s, background-color 0.15s, box-shadow 0.15s',
                  lineHeight: 1,
                  '&:hover': {
                    borderColor: 'var(--color-border)',
                    bgcolor: form.emoji === emoji ? 'var(--color-btn-active)' : 'var(--color-btn-hover)',
                  },
                }}
              >
                {emoji}
              </Box>
            ))}
          </Box>
        </Box>

        {/* 이름, 소속 */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label='닉네임'
            value={form.name}
            onChange={handleChange('name')}
            required
            size='small'
            sx={{ ...inputSx, flex: 1 }}
          />
          <TextField
            label='소속/직업 (선택)'
            value={form.role}
            onChange={handleChange('role')}
            size='small'
            placeholder='학생, 취준생, 개발자...'
            sx={{ ...inputSx, flex: 1 }}
          />
        </Box>

        {/* 메시지 */}
        <TextField
          label='메시지'
          value={form.message}
          onChange={handleChange('message')}
          required
          multiline
          rows={3}
          size='small'
          placeholder='응원 한마디를 남겨주세요 🌱'
          sx={inputSx}
        />

        {/* 이메일 (선택, 비공개) */}
        <TextField
          label='이메일 (선택 · 비공개 저장)'
          value={form.email}
          onChange={handleChange('email')}
          size='small'
          type='email'
          sx={inputSx}
        />

        {/* 키워드 선택 */}
        <Box>
          <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', mb: 0.8 }}>
            한마디 키워드 (선택)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {KEYWORDS.map((kw) => (
              <Box
                key={kw}
                onClick={() => handleKeyword(kw)}
                sx={{
                  fontSize: '0.8rem',
                  px: 1.5,
                  py: 0.5,
                  border: '2px solid',
                  borderColor: form.keyword === kw ? 'var(--color-border)' : 'var(--color-border-light)',
                  cursor: 'pointer',
                  bgcolor: form.keyword === kw ? 'var(--color-btn-active)' : 'var(--color-btn-base)',
                  boxShadow: form.keyword === kw ? '2px 2px 0px var(--color-border)' : 'none',
                  transition: 'background-color 0.15s, border-color 0.15s, box-shadow 0.15s',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'var(--color-border)',
                    bgcolor: form.keyword === kw ? 'var(--color-btn-active)' : 'var(--color-btn-hover)',
                  },
                }}
              >
                {kw}
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          type='submit'
          disabled={loading || !form.name.trim() || !form.message.trim()}
          sx={{
            alignSelf: 'flex-end',
            border: '2px solid var(--color-border)',
            borderRadius: 1,
            bgcolor: 'var(--color-btn-active)',
            color: 'var(--color-text-primary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            textTransform: 'none',
            px: 3,
            py: 1,
            boxShadow: '3px 3px 0px var(--color-border)',
            '&:hover': {
              bgcolor: 'var(--color-btn-active-hover)',
              color: 'var(--color-text-primary)',
              boxShadow: '1px 1px 0px var(--color-border)',
              transform: 'translate(1px, 1px)',
            },
            '&:disabled': {
              bgcolor: 'var(--color-border-light)',
              color: 'var(--color-text-muted)',
              boxShadow: 'none',
            },
            transition: 'all 0.15s',
          }}
        >
          {loading ? '등록 중...' : '방명록 남기기'}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, msg: '' })}
        message={snackbar.msg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default GuestbookForm;
