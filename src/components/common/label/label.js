import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { StyledLabel } from './styles';

const Props = {
  children: PropTypes.node,
  endIcon: PropTypes.object,
  startIcon: PropTypes.object,
  /** @type {SxProps} */
  sx: PropTypes.object,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'soft']),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
  clickable: PropTypes.bool,
};
// ----------------------------------------------------------------------

/** @type {React.FC<Props & import('react').ButtonHTMLAttributes>} */
const Label = forwardRef((props, ref) => {
  const {
    children,
    color = 'default',
    variant = 'soft',
    startIcon,
    endIcon,
    sx,
    clickable,
    ...other
  } = props;
  const theme = useTheme();

  const iconStyles = {
    width: 16,
    height: 16,
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  };

  return (
    <StyledLabel
      ref={ref}
      component={clickable ? 'button' : 'span'}
      ownerState={{ color, variant }}
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
      theme={theme}
      {...other}
    >
      {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
    </StyledLabel>
  );
});

Label.propTypes = Props;

export default Label;
