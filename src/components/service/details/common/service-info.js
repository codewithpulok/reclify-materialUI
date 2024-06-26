import { Grid, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { RouterLink } from 'src/routes/components';
import { fTime } from 'src/utils/format-time';
import { getValueByFieldType } from 'src/utils/predefined-fields';
import { ServiceDetailsBox } from '../../box';

const Props = {
  /** @type {Service} */
  service: PropTypes.object,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceInfo = (props) => {
  const { service, sx } = props;

  const values = useMemo(
    () => [
      {
        label: 'Founded Year',
        value: service?.foundedYear,
      },
      {
        label: 'Website',
        value: (
          <Link component={RouterLink} target="_blank" href={service?.website}>
            {service?.website}
          </Link>
        ),
      },
      {
        label: 'Business Hours',
        value:
          service?.businessHours?.start && service?.businessHours?.end
            ? `${fTime(service?.businessHours?.start)} - ${fTime(service?.businessHours?.end)}`
            : null,
      },
      {
        label: 'Operating Days',
        value:
          getValueByFieldType({ fieldType: 'days-picker' }, service?.operatingDays || []) || null,
      },
    ],
    [service]
  );

  return (
    <ServiceDetailsBox title="Info" sx={sx}>
      <Grid container sx={{ rowGap: { xs: 1.3, sm: 1 } }}>
        {values.map((field) => {
          if (!field.value) return null;

          return (
            <Grid item container key={field.label} xs={12} spacing={0.2}>
              <Grid item xs={12} sm={5}>
                <Typography variant="subtitle2">{field.label}</Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Typography variant="body2" color="text.secondary">
                  {field.value}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </ServiceDetailsBox>
  );
};

ServiceInfo.propTypes = Props;

export default ServiceInfo;
