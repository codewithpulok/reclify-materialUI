'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { varFade } from 'src/components/common/animate';
import { getIconify } from 'src/components/common/iconify/utilities';

import Logo from 'src/components/common/logo';
import { HEADER } from 'src/layouts/config-layout';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import box from '../../../../../../public/assets/images/home/hero-boxes.png';

// ----------------------------------------------------------------------
const MotionButton = m(Button);
// ----------------------------------------------------------------------

/**
 * @param {HeroDescription.propTypes} props
 * @returns {JSX.Element}
 */
const HeroDescription = (props) => {
  const { opacity, percent } = props;

  const renderBoxes = (
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
        <Box
          component={Image}
          src={box}
          sx={{ borderRadius: 1, maxWidth: 250, width: '100%', mx: 'auto', height: 'auto' }}
          priority
          placeholder="blur"
        />
      </m.div>
    </Stack>
  );

  return (
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
          Your Online Logistics Hub
        </Typography>
      </m.div>
      <Stack sx={{ mt: 6, mb: 4 }}>
        <MotionButton
          LinkComponent={RouterLink}
          href={paths.auth.register}
          variant="contained"
          color="primary"
          startIcon={getIconify('ion:rocket', 24)}
          size="large"
          sx={{ px: 4, mb: 1 }}
          variants={varFade().inRight}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          Start today
        </MotionButton>
        <m.div variants={varFade().inRight} transition={{ duration: 2 }}>
          <Typography variant="h6" textAlign="center">
            Public Launch Coming Summer 2024
          </Typography>
        </m.div>
      </Stack>

      {renderBoxes}
    </Stack>
  );
};

HeroDescription.propTypes = {
  opacity: PropTypes.number,
  percent: PropTypes.number,
};

export default HeroDescription;
