import { Box, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { predefinedFeatures } from 'src/assets/data';
import { detailsBoxStyle, detailsHeaderStyle } from '../styles';

const WarehouseFeaturesProps = {
  /** @type {WarehouseFeatures} */
  features: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {WarehouseFeaturesProps} props
 * @returns
 */
const WarehouseFeatures = (props) => {
  const { features, sx } = props;

  return (
    <Box sx={{ ...sx, ...detailsBoxStyle }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" sx={detailsHeaderStyle}>
          Facility Amenities + Features
        </Typography>
      </Stack>
      <Grid spacing={0.7} container>
        {predefinedFeatures.map((feature) => {
          const currentFeature = features[feature.key];
          if (currentFeature === undefined) return null;

          return (
            <Grid
              key={feature.key}
              item
              xs={12}
              sm={6}
              sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}
            >
              <Typography variant="subtitle2">{feature.label} :</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentFeature ? 'Yes' : 'No'}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

WarehouseFeatures.propTypes = WarehouseFeaturesProps;

export default WarehouseFeatures;
