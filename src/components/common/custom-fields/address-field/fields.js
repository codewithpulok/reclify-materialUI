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
          value={value?.country || ''}
          name={`${name}.country`}
          options={getCountries()}
          label="Country"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <RHFAutocomplete
          value={value?.state || ''}
          name={`${name}.state`}
          options={getStates(value?.country)}
          label="State"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <RHFTextField name={`${name}.city`} value={value?.city || ''} label="City" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <RHFTextField
          name={`${name}.zipCode`}
          value={value?.zipCode || ''}
          type="text"
          label="Zip code"
          fullWidth
        />
      </Grid>
      <Grid item xs={8}>
        <RHFTextField
          name={`${name}.street1`}
          value={value?.street1 || ''}
          label="Street Address"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <RHFTextField
          name={`${name}.street2`}
          value={value?.street2 || ''}
          type="text"
          label="Street Number"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

Fields.propTypes = Props;

export default Fields;
