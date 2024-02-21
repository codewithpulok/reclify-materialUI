import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

/**
 * @param {Props & import('@mui/material').DialogProps} props
 * @returns {JSX.Element}
 */
const ChangeServiceTypeDialog = (props) => {
  const { onClose, open } = props;

  const handleConfirm = useCallback(async () => {
    // console.log('Approve Transaction: ', transaction);
    // const response = await approveTransaction(transaction?.id);
    // const { data, error } = response;
    // if (error || data?.isError) {
    //   enqueueSnackbar('Error in approving transaction', { variant: 'error' });
    //   console.error('Error in approving transaction', response);
    // } else if (!error || data?.success) {
    //   enqueueSnackbar('Transaction Approved!');
    //   console.warn('Transaction Approved!', response);
    //   onClose();
    // }
    onClose();
  }, [onClose]);

  return (
    <ConfirmDialog
      onClose={onClose}
      open={open}
      title="Change Service Type?"
      content="Are you sure to update the service type for this seller? this will replace his existing service"
      action={
        <LoadingButton onClick={handleConfirm} color="primary" variant="contained">
          Confirm
        </LoadingButton>
      }
    />
  );
};

ChangeServiceTypeDialog.propTypes = Props;

export default ChangeServiceTypeDialog;
