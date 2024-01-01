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
import AddressCreateFields from './fields';

const BillingAddressCreateDialogProps = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  title: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/** @type {BillingAddress} */
const defaultValues = {
  fullName: '',
  primary: false,
  addressType: 'home',
  address: {
    city: '',
    country: '',
    state: '',
    streetAddress: '',
    streetNumber: '',
    zipCode: '',
  },
  phoneNumber: '',
};

/**
 * @param {BillingAddressCreateDialogProps} props
 * @returns {JSX.Element}
 */
const BillingAddressCreateDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    // optional props
    title = 'Add new address',
    sx = {},
  } = props;
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  // handle create address
  const onSubmit = useCallback(
    (values) => {
      enqueueSnackbar('Address Created!');
      console.log('Address Created: ', values);
      onClose();
    },
    [enqueueSnackbar, onClose]
  );

  // handle cancel address creation
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
          <AddressCreateFields />
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

BillingAddressCreateDialog.propTypes = BillingAddressCreateDialogProps;

export default BillingAddressCreateDialog;
