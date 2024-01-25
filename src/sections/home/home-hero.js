import { m } from 'framer-motion';
// mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
// routes
import { paths } from 'src/routes/paths';
// components
import Logo from 'src/components/common/logo';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur, bgGradient } from 'src/theme/css';

import { MotionContainer, varFade } from 'src/components/common/animate';
import { getIconify } from 'src/components/common/iconify/utilities';
import Image from 'src/components/common/image';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.6 : 0.94),
    imgUrl: '/assets/background/back-04-01.jpg',
  }),
  width: '100%',
  height: '100vh',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
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

// ----------------------------------------------------------------------

export default function HomeHero() {
  const mdUp = useResponsive('up', 'md');

  const renderDescription = (
    <Stack alignItems="center" justifyContent="center" height={{ xs: 1 }}>
      <m.div variants={varFade().inRight}>
        <Logo sx={{ maxWidth: 450, height: 'auto', width: '100%' }} isLong disabledLink />
      </m.div>
      <m.div variants={varFade().inRight}>
        <Typography variant="h5" color="primary.main" sx={{ textAlign: 'center' }}>
          Welcome to Racklify - Your Online Logistics Hub!
        </Typography>
      </m.div>
      <Stack sx={{ mt: 6 }}>
        <m.div variants={varFade().inRight}>
          <Button
            LinkComponent={Link}
            href={paths.auth.register}
            variant="contained"
            color="primary"
            startIcon={getIconify('ion:rocket', 24)}
            size="large"
            sx={{ px: 4 }}
          >
            Start today
          </Button>
        </m.div>
      </Stack>
    </Stack>
  );

  const renderSlides = (
    <m.div variants={varFade().inDown}>
      <Image
        src="/assets/images/home/landing01.png"
        sx={{ borderRadius: 1, maxWidth: 450, width: '100%', mx: 'auto' }}
      />
    </m.div>
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
    <StyledRoot>
      <Container component={MotionContainer}>
        <Grid container columnSpacing={10} rowSpacing={3} mt={5}>
          {!mdUp && (
            <Grid item container xs={12}>
              {renderSlides}
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            {renderDescription}
          </Grid>

          {mdUp && (
            <Grid item md={6}>
              {renderSlides}
            </Grid>
          )}
        </Grid>
      </Container>
      {mdUp && renderPolygons}
    </StyledRoot>
  );
}
