import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { predefinedFeatures } from 'src/assets/data/predefined-fields/warehouse';

import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const Props = {
  /** @type {WarehouseFeatures} */
  features: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {Props} props
 * @returns
 */
const DetailsFeatures = (props) => {
  const { features, sx } = props;

  return (
    <WarehouseDetailsBox title="Features" sx={sx}>
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

DetailsFeatures.propTypes = Props;

export default DetailsFeatures;
