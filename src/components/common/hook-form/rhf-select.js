import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
// mui
import {
  Box,
  Checkbox,
  Chip,
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
            multiple
            value={Array.isArray(field.value) ? field.value : []}
            onChange={(e) => field.onChange(e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} variant="outlined" />
                ))}
              </Box>
            )}
            input={<OutlinedInput label={label} />}
            {...other}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={field.value.indexOf(option.value) > -1} />
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
