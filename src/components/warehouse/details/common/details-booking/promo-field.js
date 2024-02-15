import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Props = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PromoField = (props) => {
  const { onChange, value, sx = {} } = props;

  const handleChange = useCallback(
    async (newValue) => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <TextField
      type="text"
      label="PROMO Code"
      variant="filled"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      sx={{ ...sx }}
      fullWidth
    />
  );
};

PromoField.propTypes = Props;

export default PromoField;
