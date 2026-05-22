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
        bgcolor: 'var(--color-bg-primary)',
        py: { xs: 6, md: 10 },
        borderBottom: '2px solid var(--color-border)',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'var(--color-tech-stack)',
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
            Skill Tree
          </Typography>
        </Box>
        <Card sx={{ bgcolor: 'var(--color-bg-card)' }}>
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
