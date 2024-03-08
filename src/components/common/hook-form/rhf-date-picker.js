import { DatePicker, DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFDatePickerProps = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  /** @type {'mobile' | 'desktop' | 'default'} */
  variant: PropTypes.string,
};

// ----------------------------------------------------------------------

/**
 * Custom Date Picker with React hook form
 * @param {RHFDatePickerProps & import('@mui/x-date-pickers').DatePickerProps} props
 * @returns {JSX.Element}
 */
export default function RHFDatePicker(props) {
  const { name, helperText, variant = 'default', ...other } = props;
  const { control } = useFormContext();

  const VariantDatePicker = useMemo(() => {
    if (variant === 'desktop') return DesktopDatePicker;
    if (variant === 'mobile') return MobileDatePicker;

    return DatePicker;
  }, [variant]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <VariantDatePicker
          {...field}
          value={new Date(field.value)}
          onChange={(value) => field.onChange(new Date(value).getTime())}
          {...other}
          slotProps={{
            ...(other?.slotProps || {}),
            textField: {
              error: !!error,
              helperText: error ? error?.message : helperText,
              ...(other?.slotProps?.textField || {}),
            },
          }}
        />
      )}
    />
  );
}

RHFDatePicker.propTypes = RHFDatePickerProps;
