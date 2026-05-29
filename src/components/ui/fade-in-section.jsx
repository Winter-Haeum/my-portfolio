import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

const DIRECTION_TRANSFORM = {
  up:    'translateY(36px)',
  down:  'translateY(-36px)',
  left:  'translateX(36px)',
  right: 'translateX(-36px)',
};

/**
 * FadeInSection - Intersection Observer 기반 스크롤 페이드인 래퍼
 *
 * Props:
 * @param {React.ReactNode} children [Required]
 * @param {'up'|'down'|'left'|'right'} direction - 등장 방향 [Optional, 기본값: 'up']
 * @param {number} delay - 애니메이션 딜레이 ms [Optional, 기본값: 0]
 * @param {number} threshold - 뷰포트 진입 감지 비율 0~1 [Optional, 기본값: 0.12]
 *
 * Example usage:
 * <FadeInSection direction="up" delay={100}>
 *   <SomeSection />
 * </FadeInSection>
 */
function FadeInSection({ children, direction = 'up', delay = 0, threshold = 0.12 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Box
      ref={ ref }
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : (DIRECTION_TRANSFORM[direction] ?? DIRECTION_TRANSFORM.up),
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        width: '100%',
      }}
    >
      { children }
    </Box>
  );
}

export default FadeInSection;
