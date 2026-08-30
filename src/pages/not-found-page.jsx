import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

/**
 * NotFoundPage - 정의되지 않은 route 접근 시 표시되는 전역 404 안내 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path='*' element={<NotFoundPage />} />
 */
function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth='sm'>
        <Box
          sx={{
            bgcolor: 'var(--color-bg-card)',
            border: '2px solid var(--color-border)',
            boxShadow: '6px 6px 0px var(--color-border)',
            textAlign: 'center',
            p: { xs: 4, md: 6 },
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: '3.5rem', md: '5rem' },
              color: 'var(--color-primary)',
              lineHeight: 1,
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'var(--color-text-primary)',
              mb: 1.5,
            }}
          >
            페이지를 찾을 수 없습니다
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.75,
              mb: 4,
            }}
          >
            요청하신 페이지가 존재하지 않거나 주소가 변경되었을 수 있습니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              onClick={() => navigate('/')}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: '#fff',
                border: '2px solid var(--color-border)',
                boxShadow: '3px 3px 0px var(--color-border)',
                fontWeight: 700,
                textTransform: 'none',
                px: 3,
                py: 1.2,
                '&:hover': {
                  bgcolor: 'var(--color-primary-dark)',
                  boxShadow: '1px 1px 0px var(--color-border)',
                  transform: 'translate(2px, 2px)',
                },
              }}
            >
              홈으로
            </Button>
            <Button
              onClick={() => navigate('/projects')}
              sx={{
                bgcolor: '#fff',
                color: 'var(--color-text-primary)',
                border: '2px solid var(--color-border)',
                boxShadow: '3px 3px 0px var(--color-border)',
                fontWeight: 700,
                textTransform: 'none',
                px: 3,
                py: 1.2,
                '&:hover': {
                  bgcolor: '#F5F5F5',
                  boxShadow: '1px 1px 0px var(--color-border)',
                  transform: 'translate(2px, 2px)',
                },
              }}
            >
              프로젝트 보기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
