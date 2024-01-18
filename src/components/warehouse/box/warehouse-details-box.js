import { Card, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// styles
/** @type {SxProps} */
export const detailsBoxStyle = {
  px: { xs: 2, sm: 3 },
  py: { xs: 1.5, sm: 2 },
  borderRadius: 1,
};

const Props = {
  title: PropTypes.string,
  headerActions: PropTypes.node,
  children: PropTypes.node,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * @param {Props & import('@mui/material').CardProps} props
 * @returns {JSX.Element}
 */
const WarehouseDetailsBox = (props) => {
  const { title = null, headerActions = null, children, sx = {}, ...other } = props;
  return (
    <Card sx={{ ...detailsBoxStyle, ...sx }} {...other}>
      {(title || headerActions) && (
        <Stack direction="row" flexWrap="wrap" alignItems="center" mb={2}>
          <Typography variant="h5">{title}</Typography>
          {headerActions}
        </Stack>
      )}
      {children}
    </Card>
  );
};

WarehouseDetailsBox.propTypes = Props;

export default WarehouseDetailsBox;
