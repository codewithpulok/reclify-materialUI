import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useAddressDeleteMutation } from 'src/redux-toolkit/services/addressApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  /** @type {Address} */
  address: PropTypes.object,
  successCallback: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AddressDeleteDialog = (props) => {
  const { onClose, open, address, successCallback } = props;

  const [deleteAddress, deleteResponse] = useAddressDeleteMutation();

  const handleConfirm = useCallback(async () => {
    console.log('Delete Address: ', address);
    const response = await deleteAddress(address?.id);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in deleting address', { variant: 'error' });
      console.error('Address delete error: ', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Address deleted successfully');
      console.warn('Address deleted successfully', response);
      onClose();
      successCallback();
    }
  }, [address, deleteAddress, onClose, successCallback]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Delete Address!"
      content="Are you sure to delete this address? After deleting address, it cannot be undone."
      action={
        <LoadingButton
          loading={deleteResponse?.isLoading}
          onClick={handleConfirm}
          color="error"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

AddressDeleteDialog.propTypes = Props;

export default AddressDeleteDialog;
