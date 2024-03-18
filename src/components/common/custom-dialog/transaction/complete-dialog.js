import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useCompleteTransactionMutation } from 'src/redux-toolkit/services/transactionApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  /** @type {Transaction} */
  transaction: PropTypes.object,
  successCallback: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CompleteTransactionDialog = (props) => {
  const { onClose, open, transaction, successCallback } = props;

  const [completeTransaction, completeResponse] = useCompleteTransactionMutation();

  const handleComplete = useCallback(async () => {
    console.log('Complete Transaction: ', transaction);
    const response = await completeTransaction(transaction?.id);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in completeing transaction', { variant: 'error' });
      console.error('Error in completeing transaction', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Transaction Completed!');
      console.warn('Transaction Completed!', response);
      onClose();
      if (successCallback) successCallback();
    }
  }, [completeTransaction, onClose, successCallback, transaction]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Complete Order!"
      content="After competeing order, this can not be undone!"
      action={
        <LoadingButton
          loading={completeResponse?.isLoading}
          onClick={handleComplete}
          color="success"
          variant="contained"
        >
          Complete
        </LoadingButton>
      }
    />
  );
};

CompleteTransactionDialog.propTypes = Props;

export default CompleteTransactionDialog;
