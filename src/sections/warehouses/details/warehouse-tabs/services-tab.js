import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { predefinedServices } from 'src/assets/data';
import { getPredefinedFieldsValue } from 'src/utils/predefined-fields';
import { detailsBoxStyle } from '../../styles';

const ServicesTabProps = {
  /** @type {WarehouseServices[]} */
  services: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {ServicesTabProps} props
 * @returns {JSX.Element}
 */
const ServicesTab = (props) => {
  const { services, sx } = props;
  const values = useMemo(() => getPredefinedFieldsValue(services, predefinedServices), [services]);
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

ServicesTab.propTypes = ServicesTabProps;

export default ServicesTab;