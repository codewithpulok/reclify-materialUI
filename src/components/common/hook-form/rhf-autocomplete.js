import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

const RHFAutocompleteProps = {
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

/**
 * React hook form with Material UI autocomplete field
 * @param {RHFAutocompleteProps & import('@mui/material/Autocomplete').AutocompleteProps} props
 * @returns
 */
export default function RHFAutocomplete(props) {
  const { name, label, placeholder, helperText, ...other } = props;
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(_event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

RHFAutocomplete.propTypes = RHFAutocompleteProps;
