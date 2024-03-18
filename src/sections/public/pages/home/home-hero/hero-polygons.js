'use client';

import styled from '@emotion/styled';
import { bgBlur } from 'src/theme/css';

// ----------------------------------------------------------------------
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

/**
 * @param {HeroPolygons.propTypes} props
 * @returns {JSX.Element}
 */
const HeroPolygons = (props) => (
  <>
    <StyledPolygon />
    <StyledPolygon anchor="right" opacity={0.48} />
    <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
    <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
  </>
);

HeroPolygons.propTypes = {};

export default HeroPolygons;
