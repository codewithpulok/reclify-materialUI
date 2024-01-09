import { DesktopTimePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFTimePickerProps = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  /** @type {'mobile' | 'desktop' | 'default'} */
  variant: PropTypes.string,
};

// ----------------------------------------------------------------------

/**
 * Custom Time Picker with React hook form
 * @param {RHFTimePickerProps & import('@mui/x-date-pickers').TimePickerProps} props
 * @returns {JSX.Element}
 */
export default function RHFTimePicker(props) {
  const { name, helperText, variant = 'default', ...other } = props;
  const { control } = useFormContext();

  const VariantTimePicker = useMemo(() => {
    if (variant === 'desktop') return DesktopTimePicker;
    if (variant === 'mobile') return MobileTimePicker;

    return TimePicker;
  }, [variant]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log({ error });
        return (
          <VariantTimePicker
            {...field}
            value={undefined}
            defaultValue={field.value ? new Date(field.value) : undefined}
            onChange={(value) => field.onChange(new Date(value).getTime())}
            slotProps={{
              textField: { error: !!error, helperText: error ? error?.message : helperText },
            }}
            {...other}
          />
        );
      }}
    />
  );
}

RHFTimePicker.propTypes = RHFTimePickerProps;
