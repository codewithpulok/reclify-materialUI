import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

/**
 * @param {Logo.propTypes} props
 * @returns {JSX.Element}
 */
const Logo = (props) => {
  const { disabledLink = false, sx, isLong = false, containerProps } = props;

  const logo = (
    <Box
      component="img"
      src={isLong ? '/logo/logo_full.png' : '/logo/logo_single.png'}
      sx={{ height: 40, width: isLong ? 150 : 40, cursor: 'pointer', ...sx }}
    />
  );

  if (disabledLink) {
    return (
      <Box {...containerProps} sx={{ display: 'inline-flex', ...(containerProps?.sx || {}) }}>
        {logo}
      </Box>
    );
  }

  return (
    <Link
      component={RouterLink}
      href="/"
      {...containerProps}
      sx={{ display: 'inline-flex', ...(containerProps?.sx || {}) }}
    >
      {logo}
    </Link>
  );
};

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  isLong: PropTypes.bool,
  sx: PropTypes.object,
  /** @type {import('@mui/material').LinkProps | import('@mui/material').BoxProps} */
  containerProps: PropTypes.object,
};

export default Logo;
