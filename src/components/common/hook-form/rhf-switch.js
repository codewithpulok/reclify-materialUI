import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

const RHFSwitchProps = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};

// ----------------------------------------------------------------------

/**
 * MUI Switch with React hook form
 * @param {RHFSwitchProps & import('@mui/material').SwitchProps} props
 * @returns {JSX.Element}
 */
export default function RHFSwitch(props) {
  const { name, helperText, label, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label ? (
            <FormControlLabel control={<Switch {...field} checked={field.value} {...other} />} />
          ) : (
            <Switch {...field} checked={field.value} {...other} />
          )}

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

RHFSwitch.propTypes = RHFSwitchProps;
