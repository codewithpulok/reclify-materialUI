import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useUpdateSellerVerificationMutation } from 'src/redux-toolkit/services/adminApi';
import ConfirmDialog from '../confirm-dialog';

/**
 * @param {SellerVerifyDialog.propTypes} props
 * @returns {JSX.Element}
 */
const SellerVerifyDialog = (props) => {
  const { onClose, open, data } = props;

  const [updateVerification, updateResponse] = useUpdateSellerVerificationMutation();

  const handleConfirm = useCallback(async () => {
    console.log('Verify User: ', data);
    const response = await updateVerification({ id: data?.id, isVerified: true });

    if (response?.error) {
      enqueueSnackbar('Error in verify user', { variant: 'error' });
      console.error('User verification error: ', response);
    } else if (!response?.error || response?.data) {
      enqueueSnackbar('User verified successfully');
      console.warn('User verified successfully', response);
      onClose();
    }
  }, [data, updateVerification, onClose]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Verify Seller!"
      content="By making this action you will verify all warehouses of this seller also."
      action={
        <LoadingButton
          loading={updateResponse?.isLoading}
          onClick={handleConfirm}
          color="primary"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

SellerVerifyDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  /** @type {User} */
  data: PropTypes.object,
};

export default SellerVerifyDialog;
