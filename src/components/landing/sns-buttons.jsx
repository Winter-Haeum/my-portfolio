import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';

const SNS_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Winter-Haeum',
    icon: <GitHubIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: 'Velog',
    href: 'https://velog.io/@winter-haeum',
    icon: <ArticleIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: 'Notion',
    href: 'https://www.notion.so',
    icon: <DescriptionIcon sx={{ fontSize: 18 }} />,
  },
];

const btnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  border: '2px solid var(--color-border)',
  px: { xs: 2, md: 2.5 },
  py: 1,
  bgcolor: 'var(--color-bg-primary)',
  color: 'var(--color-text-primary)',
  textDecoration: 'none',
  fontSize: { xs: '0.85rem', md: '0.9rem' },
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'box-shadow 0.2s, transform 0.15s',
  '&:hover': {
    boxShadow: '3px 3px 0px var(--color-border)',
    transform: 'translate(-1px, -1px)',
  },
};

/**
 * SnsButtons 컴포넌트
 *
 * Props: 없음 (SNS 링크는 컴포넌트 내부 상수)
 *
 * Example usage:
 * <SnsButtons />
 */
function SnsButtons() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
      {SNS_LINKS.map(({ label, href, icon }) => (
        <Box
          key={label}
          component='a'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          sx={btnStyle}
        >
          {icon}
          {label}
        </Box>
      ))}
    </Box>
  );
}

export default SnsButtons;
