import { m } from 'framer-motion';
import PropTypes from 'prop-types';
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
// components
import { bgGradient } from 'src/theme/css';
import { MotionContainer, varFade } from 'src/components/common/animate';

// ----------------------------------------------------------------------

export default function ContactHero() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: '/assets/images/contact/hero.jpg',
        }),
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <TextAnimate
            text="Contact"
            sx={{ color: 'primary.main', mr: 2 }}
            variants={varFade().inRight}
          />
          <TextAnimate text="Us" sx={{ color: 'common.white' }} />
        </Box>
      </Container>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
