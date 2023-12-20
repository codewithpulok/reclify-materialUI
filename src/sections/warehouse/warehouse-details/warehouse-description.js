import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { detailsBoxStyle, detailsHeaderStyle } from '../styles';

const WarehouseDescriptionProps = {
  description: PropTypes.string.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {WarehouseDescriptionProps} props
 * @returns
 */
const WarehouseDescription = (props) => {
  const { description, sx } = props;

  return (
    <Box sx={{ ...sx, ...detailsBoxStyle }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" sx={detailsHeaderStyle}>
          Description
        </Typography>
      </Stack>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
};

WarehouseDescription.propTypes = WarehouseDescriptionProps;

export default WarehouseDescription;
