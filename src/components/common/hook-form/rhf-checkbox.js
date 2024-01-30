import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

const Props = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.node,
  /** @type {import('@mui/material').FormControlLabelProps} */
  labelProps: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * MUI Switch with React hook form
 * @param {Props & import('@mui/material').CheckboxProps} props
 * @returns {JSX.Element}
 */
export default function RHFCheckbox(props) {
  const { name, helperText, label, labelProps = {}, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label ? (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} {...other} />}
              label={label}
              {...labelProps}
            />
          ) : (
            <Checkbox {...field} checked={field.value} {...other} />
          )}

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

RHFCheckbox.propTypes = Props;
