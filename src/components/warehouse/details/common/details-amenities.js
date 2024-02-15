import { Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { getPredefinedFieldsValue } from 'src/utils/predefined-fields';

import { predefinedAmenities } from 'src/assets/data/predefined-fields/warehouse';
import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const Props = {
  /** @type {WarehouseFeatures} */
  amenities: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns
 */
const DetailsAmenities = (props) => {
  const { amenities, sx } = props;

  const values = useMemo(
    () => getPredefinedFieldsValue(amenities, predefinedAmenities),
    [amenities]
  );

  return (
    <WarehouseDetailsBox title="Amenities" sx={sx}>
      <Grid container sx={{ rowGap: { xs: 1.3, sm: 1 } }}>
        {values.map((field) => (
          <Grid item container key={field.key} xs={12} spacing={0.2}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {field?.icon ? getIconify(field.icon, 16) : '-'}

                <Typography variant="subtitle2">{field.label}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                {field.value === null && '-'}

                {field?.startText && `${field.startText} `}
                {typeof field.value === 'boolean' && <>{field.value ? 'YES' : 'NO'}</>}
                {typeof field.value !== 'boolean' && field.value}
                {field?.endText && ` ${field.endText}`}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </WarehouseDetailsBox>
  );
};

DetailsAmenities.propTypes = Props;

export default DetailsAmenities;
