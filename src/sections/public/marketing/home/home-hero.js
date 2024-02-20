import { m, useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, styled } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from 'src/layouts/config-layout';
import { bgBlur, bgGradient } from 'src/theme/css';

import { MotionContainer, varFade } from 'src/components/common/animate';
import { getIconify } from 'src/components/common/iconify/utilities';
import Image from 'src/components/common/image';
import Logo from 'src/components/common/logo';

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

const StyledPolygon = styled('div')(({ opacity = 1, anchor = 'left', theme }) => ({
  ...bgBlur({
    opacity,
    color: theme.palette.background.default,
  }),
  zIndex: 9,
  bottom: 0,
  height: 80,
  width: '50%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  ...(anchor === 'left' && {
    left: 0,
    ...(theme.direction === 'rtl' && {
      transform: 'scale(-1, 1)',
    }),
  }),
  ...(anchor === 'right' && {
    right: 0,
    transform: 'scaleX(-1)',
    ...(theme.direction === 'rtl' && {
      transform: 'scaleX(1)',
    }),
  }),
}));

const MotionButton = m(Button);

// ----------------------------------------------------------------------

export default function HomeHero() {
  const mdUp = useResponsive('up', 'md');

  const heroRef = useRef(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

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

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 480,
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().inRight} transition={{ duration: 2 }}>
        <Logo sx={{ maxWidth: 450, height: 'auto', width: '100%' }} isLong disabledLink />
      </m.div>
      <m.div variants={varFade().inRight}>
        <Typography variant="h5" color="primary.main" sx={{ textAlign: 'center' }}>
          Welcome to Racklify - Your Online Logistics Hub!
        </Typography>
      </m.div>
      <Stack sx={{ mt: 6, mb: 4 }}>
        <MotionButton
          LinkComponent={Link}
          href={paths.warehouses.root}
          variant="contained"
          color="primary"
          startIcon={getIconify('ion:rocket', 24)}
          size="large"
          sx={{ px: 4 }}
          variants={varFade().inRight}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          Start today
        </MotionButton>
      </Stack>
    </Stack>
  );

  const renderSlides = (
    <Stack sx={{ position: 'relative' }}>
      <m.div
        variants={{
          hidden: { opacity: 0, x: 0, y: 300 },
          enter: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate="enter"
        transition={{ type: 'spring', damping: 10, stiffness: 100, duration: 2 }}
      >
        <Image
          src="/assets/images/home/landing01.png"
          sx={{ borderRadius: 1, maxWidth: 450, width: '100%', mx: 'auto' }}
        />
      </m.div>
    </Stack>
  );

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

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
                {renderDescription}
              </Grid>

              {mdUp && <Grid md={6}>{renderSlides}</Grid>}
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>

      {mdUp && renderPolygons}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
