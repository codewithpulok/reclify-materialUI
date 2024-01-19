import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { getCountries, getStates } from 'src/assets/data/address';
import { RHFAutocomplete, RHFTextField } from '../../hook-form';

const Props = {
  value: PropTypes.object,
  name: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Fields = (props) => {
  const { value, name } = props;
  return (
    <Grid container spacing={1.2}>
      <Grid item xs={12}>
        <RHFAutocomplete
          name={`${name}.country`}
          options={getCountries()}
          label="Country"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <RHFAutocomplete
          name={`${name}.state`}
          options={getStates(value?.country)}
          label="State"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <RHFTextField name={`${name}.city`} label="City" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <RHFTextField name={`${name}.zipCode`} type="number" label="Zip code" fullWidth />
      </Grid>
      <Grid item xs={8}>
        <RHFTextField name={`${name}.streetAddress`} label="Street Address" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <RHFTextField name={`${name}.streetNumber`} type="number" label="Street Number" fullWidth />
      </Grid>
    </Grid>
  );
};

Fields.propTypes = Props;

export default Fields;
