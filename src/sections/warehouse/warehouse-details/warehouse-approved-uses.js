import { Box, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { predefinedApprovedUses } from 'src/assets/data';
import { detailsBoxStyle, detailsHeaderStyle } from '../styles';

const WarehouseApprovedUsesProps = {
  /** @type {WarehouseApprovedUses} */
  approvedUses: PropTypes.string.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {WarehouseApprovedUsesProps} props
 * @returns
 */
const WarehouseApprovedUses = (props) => {
  const { approvedUses, sx } = props;

  return (
    <Box sx={{ ...sx, ...detailsBoxStyle }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" sx={detailsHeaderStyle}>
          Approved Uses
        </Typography>
      </Stack>
      <Grid spacing={0.7} container>
        {predefinedApprovedUses.map((uses) => {
          const currentUse = approvedUses[uses.key];
          if (!currentUse) return null;
          return (
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Typography variant="subtitle2">{uses.label}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

WarehouseApprovedUses.propTypes = WarehouseApprovedUsesProps;

export default WarehouseApprovedUses;
