import { TimePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

const RHFTimePickerProps = {
  helperText: PropTypes.string,
  name: PropTypes.string,
};

// ----------------------------------------------------------------------

/**
 * Custom Time Picker with React hook form
 * @param {RHFTimePickerProps & import('@mui/x-date-pickers').TimePickerProps} props
 * @returns {JSX.Element}
 */
export default function RHFTimePicker(props) {
  const { name, helperText, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          {...field}
          value={undefined}
          defaultValue={field.value ? new Date(field.value) : undefined}
          onChange={(value) => field.onChange(new Date(value).getTime())}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

RHFTimePicker.propTypes = RHFTimePickerProps;
