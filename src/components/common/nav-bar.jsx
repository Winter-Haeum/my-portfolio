import { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAppTheme } from '../../hooks/use-app-theme';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

const APPBAR_HEIGHT = { xs: '56px', sm: '64px' };

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useAppTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      /* 스크롤 방향 감지 - 80px 이하에서는 항상 표시 */
      if (currentY > prevScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      prevScrollY.current = currentY;

      /* 읽기 진행률 계산 */
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (currentY / total) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactNav = () => {
    setDrawerOpen(false);
    if (location.pathname === '/') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  };

  const navBtnSx = {
    color: 'var(--color-text-primary)',
    fontWeight: 700,
    fontSize: '0.88rem',
    textTransform: 'none',
    border: '2px solid transparent',
    borderRadius: '4px',
    px: 1.5,
    '&:hover': {
      bgcolor: 'var(--color-primary-light)',
      border: '2px solid var(--color-border)',
      boxShadow: 'none',
      transform: 'none',
    },
    '&.active': {
      bgcolor: 'var(--color-secondary)',
      border: '2px solid var(--color-border)',
      boxShadow: '2px 2px 0px var(--color-border)',
    },
  };

  return (
    <>
      {/* 읽기 진행률 바 - AppBar 위에 고정 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          bgcolor: 'var(--color-primary)',
          zIndex: 1201,
          transition: 'width 0.08s linear',
          pointerEvents: 'none',
        }}
      />

      {/* 레이아웃 공간 유지 (fixed AppBar 보상) */}
      <Box sx={{ height: APPBAR_HEIGHT, flexShrink: 0 }} />

      <AppBar
        position='fixed'
        sx={{
          bgcolor: 'var(--color-bg-primary)',
          borderBottom: '2px solid var(--color-border)',
          boxShadow: '0 2px 0px var(--color-border)',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.32s ease, background-color 0.3s ease',
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'background-color 0.3s ease',
          },
          top: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          {/* 로고 — 내부 이동 링크이므로 시맨틱 Link 요소 사용 */}
          <Typography
            component={ Link }
            to='/'
            onClick={ (e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } }
            variant='h6'
            sx={{
              fontWeight: 900,
              color: 'var(--color-text-primary)',
              letterSpacing: 1,
              px: 1.5, py: 0.5,
              border: '2px solid var(--color-border)',
              bgcolor: 'var(--color-primary)',
              boxShadow: '3px 3px 0px var(--color-border)',
              display: 'inline-block',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              userSelect: 'none',
              '&:hover': {
                boxShadow: '5px 5px 0px var(--color-border)',
                transform: 'translate(-1px, -1px)',
              },
              '&:focus-visible': {
                outline: '3px solid var(--color-secondary)',
                outlineOffset: '2px',
              },
            }}
          >
            Winter Haeum
          </Typography>

          {/* 데스크톱 메뉴 */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            { NAV_ITEMS.map((item) => (
              <Button
                key={ item.to }
                component={ NavLink }
                to={ item.to }
                end={ item.to === '/' }
                sx={ navBtnSx }
              >
                { item.label }
              </Button>
            )) }
            <Button onClick={ handleContactNav } sx={ navBtnSx }>
              Contact
            </Button>

            {/* 다크모드 토글 */}
            <IconButton
              onClick={ toggleTheme }
              aria-label={ isDark ? '라이트 모드로 전환' : '다크 모드로 전환' }
              size='small'
              sx={{
                ml: 0.5,
                border: '2px solid var(--color-border)',
                borderRadius: '4px',
                boxShadow: '2px 2px 0px var(--color-border)',
                bgcolor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
                p: 0.7,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'var(--color-primary-light)',
                  boxShadow: '1px 1px 0px var(--color-border)',
                  transform: 'translate(1px, 1px)',
                },
              }}
            >
              { isDark
                ? <LightModeIcon sx={{ fontSize: '1.1rem' }} />
                : <DarkModeIcon sx={{ fontSize: '1.1rem' }} />
              }
            </IconButton>
          </Box>

          {/* 모바일 우측: 다크모드 + 햄버거 */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1, alignItems: 'center' }}>
            <IconButton
              onClick={ toggleTheme }
              aria-label={ isDark ? '라이트 모드로 전환' : '다크 모드로 전환' }
              size='small'
              sx={{
                border: '2px solid var(--color-border)',
                borderRadius: '4px',
                boxShadow: '2px 2px 0px var(--color-border)',
                bgcolor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
                p: 0.7,
                '&:hover': {
                  bgcolor: 'var(--color-primary-light)',
                  boxShadow: '1px 1px 0px var(--color-border)',
                  transform: 'translate(1px, 1px)',
                },
              }}
            >
              { isDark
                ? <LightModeIcon sx={{ fontSize: '1.1rem' }} />
                : <DarkModeIcon sx={{ fontSize: '1.1rem' }} />
              }
            </IconButton>

            <IconButton
              onClick={ () => setDrawerOpen(true) }
              aria-label='메뉴 열기'
              sx={{
                border: '2px solid var(--color-border)',
                borderRadius: '4px',
                boxShadow: '2px 2px 0px var(--color-border)',
                bgcolor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
                p: 0.8,
                '&:hover': {
                  bgcolor: 'var(--color-primary-light)',
                  boxShadow: '1px 1px 0px var(--color-border)',
                  transform: 'translate(1px, 1px)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      {/* 모바일 Drawer */}
      <Drawer
        anchor='right'
        open={ drawerOpen }
        onClose={ () => setDrawerOpen(false) }
        PaperProps={{
          sx: {
            width: 240,
            bgcolor: 'var(--color-bg-primary)',
            borderLeft: '2px solid var(--color-border)',
          },
        }}
      >
        {/* Drawer 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2, py: 1.5,
            borderBottom: '2px solid var(--color-border)',
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
            Menu
          </Typography>
          <IconButton
            onClick={ () => setDrawerOpen(false) }
            aria-label='메뉴 닫기'
            size='small'
            sx={{
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              boxShadow: '2px 2px 0px var(--color-border)',
              color: 'var(--color-text-primary)',
              '&:hover': { bgcolor: 'var(--color-primary-light)' },
            }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>

        {/* 메뉴 항목 */}
        <List sx={{ pt: 1 }}>
          { NAV_ITEMS.map((item) => (
            <ListItemButton
              key={ item.to }
              component={ NavLink }
              to={ item.to }
              end={ item.to === '/' }
              onClick={ () => setDrawerOpen(false) }
              sx={{
                mx: 1, mb: 0.5,
                border: '2px solid transparent',
                borderRadius: '4px',
                fontWeight: 700,
                '&:hover': { bgcolor: 'var(--color-primary-light)', border: '2px solid var(--color-border)' },
                '&.active': {
                  bgcolor: 'var(--color-secondary)',
                  border: '2px solid var(--color-border)',
                  boxShadow: '2px 2px 0px var(--color-border)',
                },
              }}
            >
              <ListItemText
                primary={ item.label }
                primaryTypographyProps={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}
              />
            </ListItemButton>
          )) }

          <Divider sx={{ my: 1, mx: 2, borderColor: 'var(--color-border-light)' }} />

          <ListItemButton
            onClick={ handleContactNav }
            sx={{
              mx: 1, mb: 0.5,
              border: '2px solid transparent',
              borderRadius: '4px',
              '&:hover': { bgcolor: 'var(--color-primary-light)', border: '2px solid var(--color-border)' },
            }}
          >
            <ListItemText
              primary='Contact'
              primaryTypographyProps={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
