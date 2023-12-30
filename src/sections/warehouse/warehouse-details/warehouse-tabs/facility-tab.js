import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { predefinedFacility } from 'src/assets/data';
import { predefinedFieldsValue } from 'src/utils/predefined-fields';
import { detailsBoxStyle } from '../../styles';

const FacilityTabProps = {
  /** @type {WarehouseFacilityDetails} */
  facilityDetails: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {FacilityTabProps} props
 * @returns {JSX.Element}
 */
const FacilityTab = (props) => {
  const { facilityDetails, sx = {} } = props;
  const values = useMemo(
    () => predefinedFieldsValue(facilityDetails, predefinedFacility),
    [facilityDetails]
  );
  return (
    <Box sx={{ ...detailsBoxStyle, ...sx }}>
      <Grid container sx={{ rowGap: { xs: 1.3, sm: 1 } }}>
        {values.map((field) => (
          <Grid item container key={field.key} xs={12} spacing={0.2}>
            <Grid item xs={12} sm={5}>
              <Typography variant="subtitle2">{field.label}</Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="body2" color="text.secondary">
                {field.value === null ? (
                  '-'
                ) : (
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
    </Box>
  );
};

FacilityTab.propTypes = FacilityTabProps;

export default FacilityTab;
