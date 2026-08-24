import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import EmailCopyArea from './email-copy-area';
import SnsButtons from './sns-buttons';
import GuestbookSection from './guestbook-section';
import characterContactImg from '../../assets/character-contact.webp';

function ContactSection() {
  return (
    <Box
      id='contact-section'
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth='lg'>
        {/* 섹션 타이틀 + 캐릭터 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'var(--color-contact)',
              border: '2px solid var(--color-border)',
              boxShadow: '4px 4px 0px var(--color-border)',
              px: 3,
              py: 1,
            }}
          >
            <Typography
              variant='h2'
              sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, color: 'var(--color-text-primary)', m: 0 }}
            >
              Contact
            </Typography>
          </Box>
          <Box
            component='img'
            src={ characterContactImg }
            alt='Contact 캐릭터'
            sx={{
              width: { xs: 114, md: 170 },
              height: 'auto',
              objectFit: 'contain',
              flexShrink: 0,
              transform: 'translateY(32px)',
            }}
          />
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
                꾸준히 성장하는 개발자가 되기 위해 새로운 기술을 배우고,
                <br />
                기록하고, 만들고 있습니다 🌱
              </Typography>

              <Divider sx={{ mb: 3, borderColor: 'var(--color-border-light)' }} />

              {/* 이메일 + SNS 묶음 영역 */}
              <Box
                sx={{
                  bgcolor: 'var(--color-bg-secondary)',
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

              {/* 협업 메시지 */}
              <Box
                sx={{
                  mt: 3,
                  p: { xs: 2, md: 2.5 },
                  bgcolor: 'var(--color-bg-secondary)',
                  border: '1.5px solid var(--color-border-light)',
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    color: 'var(--color-text-primary)',
                    mb: 0.8,
                  }}
                >
                  함께 성장할 기회를 기다리고 있습니다 ✉️
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.75,
                  }}
                >
                  프로젝트 협업, 코드 피드백, 혹은 단순한 인사도 환영합니다.
                  <br />
                  방명록에 한마디 남겨주시면 정말 힘이 됩니다!
                </Typography>
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
