import { Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { predefinedServices } from 'src/assets/data/predefined-fields/warehouse';
import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';
import { getPredefinedFieldsValue } from 'src/utils/predefined-fields';

const Props = {
  /** @type {WarehouseServices[]} */
  services: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseServices = (props) => {
  const { services, sx } = props;
  const values = useMemo(() => getPredefinedFieldsValue(services, predefinedServices), [services]);
  return (
    <WarehouseDetailsBox title="Services" sx={sx}>
      <Grid container sx={{ rowGap: { xs: 1.3, sm: 1 } }}>
        {values.map((field) => (
          <Grid item container key={field.key} xs={12} spacing={0.2}>
            <Grid item xs={12} sm={5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {field?.icon ? getIconify(field.icon, 16) : '-'}
                <Typography variant="subtitle2">{field.label}</Typography>
              </Stack>
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
    </WarehouseDetailsBox>
  );
};

WarehouseServices.propTypes = Props;

export default WarehouseServices;
