import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import useTypography from './use-typography';

const Props = {
  asLink: PropTypes.bool,
  children: PropTypes.node,
  line: PropTypes.number,
  persistent: PropTypes.bool,
  sx: PropTypes.object,
  variant: PropTypes.oneOf([
    'body1',
    'body2',
    'button',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'inherit',
    'overline',
    'subtitle1',
    'subtitle2',
  ]),
};

// ----------------------------------------------------------------------

/**
 * @type {import('react').ForwardedRef<Props>}
 */
const TextMaxLine = forwardRef((props, ref) => {
  const { asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other } = props;
  const { lineHeight } = useTypography(variant);

  /** @type {SxProps} */
  const styles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: line,
    ...(persistent && {
      height: lineHeight * line,
    }),
    ...sx,
  };

  if (asLink) {
    return (
      <Link color="inherit" ref={ref} variant={variant} sx={{ ...styles }} {...other}>
        {children}
      </Link>
    );
  }

  return (
    <Typography ref={ref} variant={variant} sx={{ ...styles }} {...other}>
      {children}
    </Typography>
  );
});

TextMaxLine.propTypes = Props;

export default TextMaxLine;
