import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useCancelTransactionMutation } from 'src/redux-toolkit/services/transactionApi';
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
const CancelTransactionDialog = (props) => {
  const { onClose, open, transaction } = props;

  const [cancelTransaction, cancelResponse] = useCancelTransactionMutation();

  const handleCancelTransaction = useCallback(async () => {
    console.log('Cancel Transaction: ', transaction);
    const response = await cancelTransaction(transaction?.id);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in canceling transaction', { variant: 'error' });
      console.error('Error in canceling transaction', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Transaction Canceled!');
      console.warn('Transaction Canceled!', response);
      onClose();
    }
  }, [cancelTransaction, onClose, transaction]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Cancel Transaction!"
      content="After canceling transaction, this can not be undone!"
      action={
        <LoadingButton
          loading={cancelResponse?.isLoading}
          onClick={handleCancelTransaction}
          color="error"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

CancelTransactionDialog.propTypes = Props;

export default CancelTransactionDialog;
