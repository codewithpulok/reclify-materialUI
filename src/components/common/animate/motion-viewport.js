'use client';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import MotionDiv from './motion-div';
import { varContainer } from './variants';

// ----------------------------------------------------------------------

export default function MotionViewport({ children, disableAnimatedMobile = true, ...other }) {
  const smDown = useResponsive('down', 'sm');

  if (smDown && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={MotionDiv}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}

MotionViewport.propTypes = {
  children: PropTypes.node,
  disableAnimatedMobile: PropTypes.bool,
};
