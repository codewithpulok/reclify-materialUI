import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { predefinedFeatures } from 'src/assets/data';
import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';

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
    <WarehouseDetailsBox title="Facility Amenities + Features" sx={sx}>
      <Grid spacing={0.7} container>
        {predefinedFeatures.map((feature) => {
          const currentFeature = features[feature.key];
          if (!currentFeature) return null;

          return (
            <Grid
              key={feature.key}
              item
              xs={12}
              sm={6}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              {feature?.icon && getIconify(feature.icon, 16, { color: 'text.secondary' })}
              <Typography variant="subtitle2">{feature.label}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </WarehouseDetailsBox>
  );
};

WarehouseFeatures.propTypes = WarehouseFeaturesProps;

export default WarehouseFeatures;
