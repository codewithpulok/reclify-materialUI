import { Stack, SvgIcon, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import { getIconify } from '../iconify/utilities';

const EmptyStateProps = {
  text: PropTypes.string,
  icon: PropTypes.node,
};

/**
 * UI for empty states
 * @param {EmptyStateProps} props
 * @returns
 */
const EmptyState = (props) => {
  const { icon = getIconify('tabler:mood-empty'), text = 'Nothing Here' } = props;
  return (
    <Stack
      sx={{
        mt: 3,
        width: 1,
        height: 200,
        borderRadius: 2,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
      alignItems="center"
      justifyContent="center"
      color="GrayText"
      spacing={1}
    >
      <SvgIcon sx={{ width: 38, height: 38 }}>{icon}</SvgIcon>
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};

EmptyState.propTypes = EmptyStateProps;

export default EmptyState;
