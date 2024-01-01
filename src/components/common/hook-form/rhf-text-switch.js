import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import { Chip, Stack, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

const RHFTextSwitchProps = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
};

// ----------------------------------------------------------------------

/**
 * Custom Text Switch with React hook form
 * @param {RHFTextSwitchProps & import('@mui/material').ChipProps} props
 * @returns {JSX.Element}
 */
export default function RHFTextSwitch(props) {
  const { name, helperText, label, trueLabel = 'Yes', falseLabel = 'No', ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {label && (
              <Typography
                variant="body2"
                component="label"
                sx={{ cursor: 'pointer', flex: 1 }}
                onClick={() => field.onChange(!field.value)}
              >
                {label}
              </Typography>
            )}

            <Stack direction="row" alignItems="center" spacing={0.1}>
              <Chip
                label={trueLabel}
                variant={field.value ? 'soft' : 'outlined'}
                color={field.value ? 'primary' : 'default'}
                sx={{ borderRadius: 0.3 }}
                onClick={field.value ? undefined : () => field.onChange(true)}
                {...other}
              />
              <Chip
                label={falseLabel}
                variant={!field.value ? 'soft' : 'outlined'}
                color={!field.value ? 'error' : 'default'}
                sx={{ borderRadius: 0.3 }}
                onClick={!field.value ? undefined : () => field.onChange(false)}
                {...other}
              />
            </Stack>
          </Stack>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

RHFTextSwitch.propTypes = RHFTextSwitchProps;
