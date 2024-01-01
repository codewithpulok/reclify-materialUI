import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { ICONS } from 'src/components/user-settings/config-user-settings';
import PaymentCardCreateFields from './fields';

const PaymentCardCreateDialogProps = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  title: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/** @type {PaymentCard} */
const defaultValues = {
  cardNumber: '',
  cardType: 'visa',
  primary: false,
};

/**
 * @param {PaymentCardCreateDialogProps} props
 * @returns {JSX.Element}
 */
const PaymentCardCreateDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    // optional props
    title = 'Add new card',
    sx = {},
  } = props;
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  // handle create payment card
  const onSubmit = useCallback(
    (values) => {
      enqueueSnackbar('Payment Created!');
      console.log('Payment Created: ', values);
      onClose();
    },
    [enqueueSnackbar, onClose]
  );

  // handle cancel payment card creation
  const onCancel = useCallback(() => {
    onClose();
    reset(defaultValues);
  }, [onClose, reset]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} sx={{ ...sx }}>
      <DialogTitle
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        {title}

        <IconButton onClick={onClose}>{ICONS.close()}</IconButton>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <PaymentCardCreateFields />
        </DialogContent>
        <DialogActions>
          <Button type="button" color="error" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

PaymentCardCreateDialog.propTypes = PaymentCardCreateDialogProps;

export default PaymentCardCreateDialog;
