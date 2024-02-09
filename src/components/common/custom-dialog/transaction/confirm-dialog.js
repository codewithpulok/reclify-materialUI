import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useApproveTransactionMutation } from 'src/redux-toolkit/services/transactionApi';
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
const ConfirmTransactionDialog = (props) => {
  const { onClose, open, transaction } = props;

  const [confirmTransaction, confirmResponse] = useApproveTransactionMutation();

  const handleConfirm = useCallback(async () => {
    console.log('Confirm Transaction: ', transaction);
    const response = await confirmTransaction(transaction?.id);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in confirming transaction', { variant: 'error' });
      console.error('Error in confirming transaction', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Transaction Confirmed!');
      console.warn('Transaction Confirmed!', response);
      onClose();
    }
  }, [confirmTransaction, onClose, transaction]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Confirm Order!"
      content="After confirming order, this can not be undone!"
      action={
        <LoadingButton
          loading={confirmResponse?.isLoading}
          onClick={handleConfirm}
          color="success"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

ConfirmTransactionDialog.propTypes = Props;

export default ConfirmTransactionDialog;
