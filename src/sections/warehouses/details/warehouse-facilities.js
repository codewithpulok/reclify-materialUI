import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { predefinedFacility } from 'src/assets/data';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';
import { getPredefinedFieldsValue } from 'src/utils/predefined-fields';

const Props = {
  /** @type {WarehouseFacilityDetails} */
  facilityDetails: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseFacilities = (props) => {
  const { facilityDetails, sx = {} } = props;
  const values = useMemo(
    () => getPredefinedFieldsValue(facilityDetails, predefinedFacility),
    [facilityDetails]
  );
  return (
    <WarehouseDetailsBox sx={sx} title="Facilities">
      <Grid container sx={{ rowGap: { xs: 1.3, sm: 1 } }}>
        {values.map((field) => (
          <Grid item container key={field.key} xs={12} spacing={0.2}>
            <Grid item xs={12} sm={5}>
              <Typography variant="subtitle2">{field.label}</Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="body2" color="text.secondary">
                {field.value === null && '-'}

                {field.value && (
                  <>
                    {field?.startText && `${field.startText} `}
                    {field.value}
                    {field?.endText && ` ${field.endText}`}
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </WarehouseDetailsBox>
  );
};

WarehouseFacilities.propTypes = Props;

export default WarehouseFacilities;
