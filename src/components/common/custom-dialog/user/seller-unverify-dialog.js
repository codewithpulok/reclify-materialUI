import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useUpdateSellerVerificationMutation } from 'src/redux-toolkit/services/adminApi';
import ConfirmDialog from '../confirm-dialog';

/**
 * @param {SellerUnverifyDialog.propTypes} props
 * @returns {JSX.Element}
 */
const SellerUnverifyDialog = (props) => {
  const { onClose, open, data } = props;

  const [updateVerification, updateResponse] = useUpdateSellerVerificationMutation();

  const handleConfirm = useCallback(async () => {
    console.log('Verify User: ', data);
    const response = await updateVerification({ id: data?.id, isVerified: false });

    if (response?.error) {
      enqueueSnackbar('Error in unverify user', { variant: 'error' });
      console.error('User unverify error: ', response);
    } else if (!response?.error || response?.data) {
      enqueueSnackbar('User unverified successfully');
      console.warn('User unverified successfully', response);
      onClose();
    }
  }, [data, updateVerification, onClose]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Unverify Seller!"
      content="By making this action you will unverify all warehouses of this seller also."
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

SellerUnverifyDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  /** @type {User} */
  data: PropTypes.object,
};

export default SellerUnverifyDialog;
