import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const EMAIL = 'rudnfgkdma13@gmail.com';

/**
 * EmailCopyArea 컴포넌트
 *
 * Props: 없음 (이메일 주소는 컴포넌트 내부 상수)
 *
 * Example usage:
 * <EmailCopyArea />
 */
function EmailCopyArea() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setOpen(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API 미지원 환경 fallback */
    }
  };

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          border: '2px solid var(--color-border)',
          borderRadius: 1,
          px: 2,
          py: 1.5,
          cursor: 'pointer',
          bgcolor: '#FFFFFF',
          transition: 'box-shadow 0.2s, transform 0.15s',
          '&:hover': {
            boxShadow: '3px 3px 0px var(--color-border)',
            transform: 'translate(-1px, -1px)',
          },
          width: 'fit-content',
        }}
        role='button'
        aria-label='이메일 주소 복사'
      >
        <EmailIcon sx={{ fontSize: 20, color: 'var(--color-text-secondary)' }} />
        <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: 'var(--color-text-primary)' }}>
          {EMAIL}
        </Typography>
        {copied ? (
          <CheckIcon sx={{ fontSize: 18, color: 'var(--color-secondary)' }} />
        ) : (
          <ContentCopyIcon sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
        )}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message='이메일이 복사되었어요 ✉️'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default EmailCopyArea;
