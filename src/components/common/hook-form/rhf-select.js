import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

// ----------------------------------------------------------------------

const Props = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  /** @type {{value: any, label: any}[]} */
  options: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

/**
 * Material UI Textfield with React Hook Form
 * @param {Props & import('@mui/material/Select').SelectProps} props
 * @returns {JSX.Element}
 */
export default function RHFSelect(props) {
  const { name, helperText, options, label, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            value={Array.isArray(field.value) ? field.value : []}
            onChange={(e) => field.onChange(e.target.value)}
            input={<OutlinedInput label={label} />}
            {...other}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

RHFSelect.propTypes = Props;
