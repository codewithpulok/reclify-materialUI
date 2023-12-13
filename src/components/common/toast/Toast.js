import { Alert } from '@mui/material';
import { SnackbarContent, closeSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const ToastProps = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const Toast = forwardRef((props, ref) => {
  const { id, message, variant, ...other } = props;

  console.log(props);

  return (
    <SnackbarContent ref={ref} role="alert" {...other}>
      <Alert onClose={() => closeSnackbar(id)} severity={variant}>
        {message}
      </Alert>
    </SnackbarContent>
  );
});

Toast.propTypes = ToastProps;

export default Toast;
