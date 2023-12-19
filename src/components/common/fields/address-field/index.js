import { Autocomplete, Box, Collapse, Grid, IconButton, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { addresses } from 'src/assets/data/address';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { useBoolean } from 'src/hooks/use-boolean';
import { RHFTextField } from '../../hook-form';
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
  const { setValue, watch } = useFormContext();
  const addressValue = watch(name);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Autocomplete
          id="address"
          value={addressValue}
          options={addresses}
          autoHighlight
          fullWidth
          getOptionLabel={(address) => getWarehouseAddress(address)}
          renderOption={(renderProps, address) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...renderProps}>
              {getWarehouseAddress(address)}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a address"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
          onChange={(e, value) => {
            setValue(name, value);
          }}
        />
        <IconButton onClick={addressCollapse.onToggle}>
          {addressCollapse.value ? ICONS.close() : ICONS.edit()}
        </IconButton>
      </Stack>
      <Collapse in={addressCollapse.value} sx={{ mt: 1 }}>
        <Grid container spacing={1.2}>
          <Grid item sm={4}>
            <RHFTextField name={`${name}.streetNumber`} label="Street Number" fullWidth />
          </Grid>
          <Grid item sm={8}>
            <RHFTextField name={`${name}.streetAddress`} label="Street Address" fullWidth />
          </Grid>
          <Grid item sm={12}>
            <RHFTextField name={`${name}.city`} label="City" fullWidth />
          </Grid>
          <Grid item sm={6}>
            <RHFTextField name={`${name}.state`} label="State" fullWidth />
          </Grid>
          <Grid item sm={6}>
            <RHFTextField name={`${name}.zipCode`} label="Zip code" fullWidth />
          </Grid>
          <Grid item sm={12}>
            <RHFTextField name={`${name}.country`} label="Country" fullWidth />
          </Grid>
        </Grid>
      </Collapse>
    </Stack>
  );
};

AddressField.propTypes = AddressFieldProps;

export default AddressField;
