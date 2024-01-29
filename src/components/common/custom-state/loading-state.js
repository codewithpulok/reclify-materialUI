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
 * UI for loading states
 * @param {Props} props
 * @returns
 */
const LoadingState = (props) => {
  const {
    icon = getIconify('line-md:loading-twotone-loop'),
    text = 'Processing Request',
    sx = {},
  } = props;
  return (
    <Stack
      sx={{
        width: 1,
        height: 200,
        borderRadius: 2,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...sx,
      }}
      alignItems="center"
      justifyContent="center"
      color="primary.main"
      spacing={1}
    >
      <SvgIcon sx={{ width: 38, height: 38, color: 'primary.main' }}>{icon}</SvgIcon>
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};

LoadingState.propTypes = Props;

export default LoadingState;
