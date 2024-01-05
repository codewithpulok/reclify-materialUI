import { IconButton, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
// local imports
import { useBoolean } from 'src/hooks/use-boolean';
import { RHFTextField } from '../../hook-form';
import Iconify from '../../iconify';

const Props = {
  name: PropTypes.string.isRequired,
};

/**
 * @param {Props & import('@mui/material').TextFieldProps} props
 * @returns {JSX.Element}
 */
const PasswordField = (props) => {
  const { name, ...others } = props;
  const password = useBoolean();
  return (
    <RHFTextField
      name={name}
      type={password.value ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={password.onToggle} edge="end">
              <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...others}
    />
  );
};

PasswordField.propTypes = Props;

export default PasswordField;
