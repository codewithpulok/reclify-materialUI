import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

const RHFTextFieldProps = {
  helperText: PropTypes.object,
  name: PropTypes.string,
};

/**
 * Material UI Textfield with React Hook Form
 * @param {RHFTextFieldProps & import('@mui/material/TextField').TextFieldProps} props
 * @returns {JSX.Element}
 */
export default function RHFTextField(props) {
  const { name, helperText, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value === undefined ? '' : field.value}
          onChange={(event) => {
            if (other?.type === 'number') {
              field.onChange(event.target.value === '' ? undefined : Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

RHFTextField.propTypes = RHFTextFieldProps;
