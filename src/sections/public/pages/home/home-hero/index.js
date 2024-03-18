'use client';

import { useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from 'src/layouts/config-layout';
import { bgGradient } from 'src/theme/css';

import { MotionContainer } from 'src/components/common/animate';
import HeroDescription from './hero-description';
import HeroPolygons from './hero-polygons';
import HeroSlides from './hero-slides';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  // common states
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  };
  const { scrollY } = useScroll();

  // app states
  const heroRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const opacity = 1 - percent / 100;
  const lightMode = theme.palette.mode === 'light';
  const hide = percent > 120;

  // handle scroll
  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  // update scroll
  useEffect(() => {
    getScroll();
  }, [getScroll]);

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={6}>
                <HeroDescription opacity={opacity} percent={percent} />
              </Grid>

              {mdUp && (
                <Grid md={6}>
                  <HeroSlides
                    lightMode={lightMode}
                    opacity={opacity}
                    percent={percent}
                    transition={transition}
                  />
                </Grid>
              )}
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>

      {mdUp && <HeroPolygons />}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
