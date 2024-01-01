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
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { ICONS } from 'src/components/user-settings/config-user-settings';
import AddressEditFields from './fields';

/** @type {PaymentCard} */
const defaultValues = {
  cardNumber: '',
  cardType: 'visa',
  primary: false,
};

const PaymentCardEditDialogProps = {
  /** @type {PaymentCard} */
  paymentCard: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  title: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {PaymentCardEditDialogProps} props
 * @returns {JSX.Element}
 */
const PaymentCardEditDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    // optional props
    title = 'Edit card',
    sx = {},
    paymentCard,
  } = props;
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  // handle edit card
  const onSubmit = useCallback(
    (values) => {
      enqueueSnackbar('Payment Card Edited!');
      console.log('Payment Card Edited: ', values);
      onClose();
    },
    [enqueueSnackbar, onClose]
  );

  // handle cancel edit warehouse
  const onCancel = useCallback(() => {
    onClose();
    reset(defaultValues);
  }, [onClose, reset]);

  // update default values
  useEffect(() => {
    if (paymentCard) {
      reset(paymentCard);
    }
  }, [paymentCard, reset]);

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
          <AddressEditFields />
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

PaymentCardEditDialog.propTypes = PaymentCardEditDialogProps;

export default PaymentCardEditDialog;
