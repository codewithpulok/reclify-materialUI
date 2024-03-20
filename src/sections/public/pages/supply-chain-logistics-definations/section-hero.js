import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MotionContainer, MotionDiv, MotionSpan, varFade } from 'src/components/common/animate';

// ----------------------------------------------------------------------

export default function SectionHero() {
  return (
    <Box
      sx={{
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
          'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: {
              xs: 'center',
              md: 'unset',
            },
          }}
        >
          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'primary.main' }}>
            <TextAnimate text="Racklify" variants={varFade().inRight} />
            <TextAnimate text="Supply" variants={varFade().inRight} />
            <TextAnimate text="Chain" variants={varFade().inRight} />
          </Stack>

          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="&" />
            <TextAnimate text="Logistics" />
            <TextAnimate text="Definitions" />
          </Stack>

          <MotionDiv variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 3,
                color: 'common.white',
                fontWeight: 'fontWeightSemiBold',
              }}
            >
              Certainly! Here are definitions for each of the terms you provided:
            </Typography>
          </MotionDiv>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={MotionDiv}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <MotionSpan key={index} variants={variants || varFade().inUp}>
          {letter}
        </MotionSpan>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
