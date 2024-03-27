import { Box, Card, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// styles
/** @type {SxProps} */
export const detailsBoxStyle = {
  py: { xs: 1.5, sm: 2 },
  borderRadius: 1,
};

export const detailsContentStyle = {
  px: { xs: 2, sm: 3 },
};

const Props = {
  title: PropTypes.node,
  headerActions: PropTypes.node,
  children: PropTypes.node,
  /** @type {SxProps} */
  sx: PropTypes.object,
  /** @type {SxProps} */
  headerSx: PropTypes.object,
  /** @type {SxProps} */
  contentSx: PropTypes.object,
};
/**
 * @param {Props & import('@mui/material').CardProps} props
 * @returns {JSX.Element}
 */
const WarehouseDetailsBox = (props) => {
  const {
    title = null,
    headerActions = null,
    children,
    sx = {},
    headerSx = {},
    contentSx = {},
    ...other
  } = props;
  return (
    <Card sx={{ ...detailsBoxStyle, ...sx }} {...other}>
      {(title || headerActions) && (
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          spacing={1}
          mb={2}
          sx={{ ...detailsContentStyle, ...headerSx }}
        >
          <Typography variant="h5">{title}</Typography>
          {headerActions}
        </Stack>
      )}
      <Box sx={{ ...detailsContentStyle, ...contentSx }}>{children}</Box>
    </Card>
  );
};

WarehouseDetailsBox.propTypes = Props;

export default WarehouseDetailsBox;
