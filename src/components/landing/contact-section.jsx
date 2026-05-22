import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import EmailCopyArea from './email-copy-area';
import SnsButtons from './sns-buttons';
import GuestbookSection from './guestbook-section';

function ContactSection() {
  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth='lg'>
        {/* 섹션 제목 */}
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-contact)',
            border: '2px solid var(--color-border)',
            boxShadow: '4px 4px 0px var(--color-border)',
            px: 3,
            py: 1,
            mb: 4,
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, color: 'var(--color-text-primary)', m: 0 }}
          >
            Contact
          </Typography>
        </Box>

        {/* 메인 카드 */}
        <Card
          sx={{
            bgcolor: 'var(--color-bg-card)',
            border: '2px solid var(--color-border-light)',
            boxShadow: 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>

            {/* 소개 메시지 */}
            <Typography
              sx={{
                color: 'var(--color-text-secondary)',
                fontSize: { xs: '1rem', md: '1.05rem' },
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              기록하며 성장하는 프론트엔드 개발자,
              <br />
              작은 성장들을 꾸준히 쌓아가는 중입니다 🌱
            </Typography>

            <Divider sx={{ mb: 3, borderColor: 'var(--color-border-light)' }} />

            {/* 이메일 + SNS 묶음 영역 */}
            <Box
              sx={{
                bgcolor: '#F8F8F8',
                border: '1.5px solid var(--color-border-light)',
                borderRadius: 1,
                p: { xs: 2, md: 2.5 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              {/* 이메일 */}
              <Box>
                <Typography
                  sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', mb: 1.2, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  Email
                </Typography>
                <EmailCopyArea />
              </Box>

              {/* SNS 버튼 */}
              <Box>
                <Typography
                  sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', mb: 1.2, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  Links
                </Typography>
                <SnsButtons />
              </Box>
            </Box>

            {/* 방명록 영역 */}
            <GuestbookSection />

          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ContactSection;
