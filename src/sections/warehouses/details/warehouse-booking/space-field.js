import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import * as Yup from 'yup';

const Props = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  /** @type {string | undefined} */
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SpaceField = (props) => {
  const { onChange, value, sx = {}, error = undefined, setError, min, max } = props;

  const handleChange = useCallback(
    async (newValue) => {
      let numValue = newValue === '' ? 0 : Number(newValue);
      try {
        const validation = await Yup.number()
          .label('Order Space')
          .min(min, `Minimum orderable space is ${min}`)
          .max(max, `Maximum orderable space is ${max}`)
          .required()
          .validate(numValue);

        numValue = validation;
        setError(undefined);
      } catch (validationError) {
        setError(validationError?.message || 'Invalid data');
      }
      onChange(numValue);
    },
    [onChange, min, max, setError]
  );

  return (
    <TextField
      helperText={error}
      error={!!error}
      type="number"
      label="Space you want to order (pallets)"
      variant="filled"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      sx={{ ...sx }}
      fullWidth
    />
  );
};

SpaceField.propTypes = Props;

export default SpaceField;
