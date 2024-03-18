'use client';

import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// mui
import Box from '@mui/material/Box';

const Props = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
// ----------------------------------------------------------------------

/** @type {React.FC<Props>} */
const Iconify = forwardRef((props, ref) => {
  const { icon, width = 20, sx, ...other } = props;
  return (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  );
});

Iconify.propTypes = Props;

export default Iconify;
