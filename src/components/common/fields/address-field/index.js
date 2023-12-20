import { Collapse, Grid, IconButton, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { useFormContext } from 'react-hook-form';
import { getCountries, getStates } from 'src/assets/data/address';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { useBoolean } from 'src/hooks/use-boolean';
import { RHFAutocomplete, RHFTextField } from '../../hook-form';
import { ICONS } from '../config-fields';

const AddressFieldProps = {
  name: PropTypes.string.isRequired,
};

/**
 * @param {AddressFieldProps} props
 * @returns {JSX.Element}
 */
const AddressField = (props) => {
  const { name } = props;
  const addressCollapse = useBoolean(false);
  const { watch } = useFormContext();
  const addressValue = watch(name);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField value={getWarehouseAddress(addressValue)} label="Address" readOnly fullWidth />
        <IconButton onClick={addressCollapse.onToggle}>
          {addressCollapse.value ? ICONS.close() : ICONS.edit()}
        </IconButton>
      </Stack>
      <Collapse in={addressCollapse.value} sx={{ mt: 1 }}>
        <Grid container spacing={1.2}>
          <Grid item sm={12}>
            <RHFAutocomplete
              name={`${name}.country`}
              options={getCountries()}
              label="Country"
              fullWidth
            />
          </Grid>
          <Grid item sm={12}>
            <RHFAutocomplete
              name={`${name}.state`}
              options={getStates(addressValue?.country)}
              label="State"
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <RHFTextField name={`${name}.city`} label="City" fullWidth />
          </Grid>
          <Grid item sm={6}>
            <RHFTextField name={`${name}.zipCode`} type="number" label="Zip code" fullWidth />
          </Grid>
          <Grid item sm={8}>
            <RHFTextField name={`${name}.streetAddress`} label="Street Address" fullWidth />
          </Grid>
          <Grid item sm={4}>
            <RHFTextField
              name={`${name}.streetNumber`}
              type="number"
              label="Street Number"
              fullWidth
            />
          </Grid>
        </Grid>
      </Collapse>
    </Stack>
  );
};

AddressField.propTypes = AddressFieldProps;

export default AddressField;
