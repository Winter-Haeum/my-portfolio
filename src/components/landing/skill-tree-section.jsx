import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function SkillTreeSection() {
  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'var(--color-bg-secondary)',
        py: { xs: 6, md: 10 },
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h2'
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: 'var(--color-primary)',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Skill Tree
        </Typography>
        <Card
          sx={{
            bgcolor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            boxShadow: 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
