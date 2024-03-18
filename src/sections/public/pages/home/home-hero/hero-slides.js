'use client';

import { Box, Stack, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { varFade } from 'src/components/common/animate';

/**
 * @param {HeroSlides.propTypes} props
 * @returns {JSX.Element}
 */
const HeroSlides = (props) => {
  const { opacity, percent, transition, lightMode } = props;
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: '150%',
        position: 'absolute',
        opacity: opacity > 0 ? opacity : 0,
        transform: `skew(${-16 - percent / 24}deg, ${4 - percent / 16}deg)`,
        ...(theme.direction === 'rtl' && {
          transform: `skew(${16 + percent / 24}deg, ${4 + percent / 16}deg)`,
        }),
      }}
    >
      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{
          width: 344,
          position: 'relative',
        }}
      >
        <Box
          component={m.img}
          animate={{ y: ['0%', '100%'] }}
          transition={transition}
          alt={lightMode ? 'light_1' : 'dark_1'}
          src={lightMode ? `/assets/images/home/light_1.webp` : `/assets/images/home/dark_1.webp`}
          sx={{ position: 'absolute', mt: -5 }}
        />
        <Box
          component={m.img}
          animate={{ y: ['-100%', '0%'] }}
          transition={transition}
          alt={lightMode ? 'light_1' : 'dark_1'}
          src={lightMode ? `/assets/images/home/light_1.webp` : `/assets/images/home/dark_1.webp`}
          sx={{ position: 'absolute' }}
        />
      </Stack>

      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 720, position: 'relative', ml: -5 }}
      >
        <Box
          component={m.img}
          animate={{ y: ['100%', '0%'] }}
          transition={transition}
          alt={lightMode ? 'light_2' : 'dark_2'}
          src={lightMode ? `/assets/images/home/light_2.webp` : `/assets/images/home/dark_2.webp`}
          sx={{ position: 'absolute', mt: -5 }}
        />
        <Box
          component={m.img}
          animate={{ y: ['0%', '-100%'] }}
          transition={transition}
          alt={lightMode ? 'light_2' : 'dark_2'}
          src={lightMode ? `/assets/images/home/light_2.webp` : `/assets/images/home/dark_2.webp`}
          sx={{ position: 'absolute' }}
        />
      </Stack>
    </Stack>
  );
};

HeroSlides.propTypes = {
  opacity: PropTypes.number,
  percent: PropTypes.number,
  transition: PropTypes.object,
  lightMode: PropTypes.bool,
};

export default HeroSlides;
