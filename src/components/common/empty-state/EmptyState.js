import { Stack, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';

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
  const { icon, text } = props;
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
      {icon || null}
      <Typography variant="body2">{text || 'Empty'}</Typography>
    </Stack>
  );
};

EmptyState.propTypes = EmptyStateProps;

export default EmptyState;
