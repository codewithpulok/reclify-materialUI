import { card } from 'creditcards';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

const RHFCreditCardFieldProps = {
  helperText: PropTypes.object,
  name: PropTypes.string,
};

/**
 * Material UI Textfield with React Hook Form
 * @param {RHFCreditCardFieldProps & import('@mui/material/TextField').TextFieldProps} props
 * @returns {JSX.Element}
 */
export default function RHFCreditCardField(props) {
  const { name, helperText, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={card.format(field.value)}
          onChange={(event) => {
            field.onChange(card.parse(event.target.value));
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          type="text"
        />
      )}
    />
  );
}

RHFCreditCardField.propTypes = RHFCreditCardFieldProps;
