import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

const RHFTextFieldProps = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  /** @type {(value: string) => string } */
  onChangeMiddleware: PropTypes.func,
};

/**
 * Material UI Textfield with React Hook Form
 * @param {RHFTextFieldProps & import('@mui/material/TextField').TextFieldProps} props
 * @returns {JSX.Element}
 */
export default function RHFTextField(props) {
  const { name, helperText, onChangeMiddleware, ...other } = props;
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
            const value =
              onChangeMiddleware === undefined
                ? event.target.value
                : onChangeMiddleware(event.target.value);

            if (other?.type === 'number') {
              field.onChange(value === '' ? undefined : Number(value));
            } else {
              field.onChange(value);
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
