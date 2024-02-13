import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { useApproveTransactionMutation } from 'src/redux-toolkit/services/adminApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  /** @type {Transaction} */
  transaction: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ApproveTransactionDialog = (props) => {
  const { onClose, open, transaction } = props;

  const [approveTransaction, approveResponse] = useApproveTransactionMutation();

  const handleApprove = useCallback(async () => {
    console.log('Approve Transaction: ', transaction);
    const response = await approveTransaction(transaction?.id);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in approving transaction', { variant: 'error' });
      console.error('Error in approving transaction', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Transaction Approved!');
      console.warn('Transaction Approved!', response);
      onClose();
    }
  }, [approveTransaction, onClose, transaction]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Approve Order!"
      content="After approving order, this can not be undone!"
      action={
        <LoadingButton
          loading={approveResponse?.isLoading}
          onClick={handleApprove}
          color="success"
          variant="contained"
        >
          Approve
        </LoadingButton>
      }
    />
  );
};

ApproveTransactionDialog.propTypes = Props;

export default ApproveTransactionDialog;
