'use client';

import { Stack, SvgIcon, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import { getIconify } from '../iconify/utilities';

const Props = {
  text: PropTypes.string,
  icon: PropTypes.node,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * UI for error states
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ErrorState = (props) => {
  const {
    icon = getIconify('tabler:face-id-error', 'inherit'),
    text = 'Something wents to wrong',
    sx = {},
  } = props;
  return (
    <Stack
      sx={{
        width: 1,
        height: 200,
        borderRadius: 2,
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.06),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...sx,
      }}
      alignItems="center"
      justifyContent="center"
      color="GrayText"
      spacing={1}
    >
      <SvgIcon sx={{ width: 38, height: 38, color: 'error.main' }}>{icon}</SvgIcon>

      <Typography color="error.main" variant="body1">
        {text}
      </Typography>
    </Stack>
  );
};

ErrorState.propTypes = Props;

export default ErrorState;
