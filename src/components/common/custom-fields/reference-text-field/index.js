import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

const Props = {
  name: PropTypes.string.isRequired,
  /** @type {(value: string | number) => string | number } */
  valueTransformer: PropTypes.func.isRequired,
  /** @type {(value: string | number) => string | number } */
  srcTransformer: PropTypes.func.isRequired,
};

/**
 * @param {Props & import('@mui/material').TextFieldProps} props
 * @returns {JSX.Element}
 */
const ReferenceTextField = (props) => {
  const { name, valueTransformer, srcTransformer, ...other } = props;
  const { watch, setValue } = useFormContext();

  // field value
  const value = watch(name);

  const onChange = useCallback(
    (v) => {
      const returnedValue = valueTransformer(v);

      setValue(name, returnedValue);
    },
    [name, setValue, valueTransformer]
  );

  return (
    <TextField
      value={srcTransformer(value)}
      onChange={(e) => onChange(e.target.value)}
      {...other}
    />
  );
};

ReferenceTextField.propTypes = Props;

export default ReferenceTextField;
