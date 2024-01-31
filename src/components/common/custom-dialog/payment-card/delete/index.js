import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useCardDeleteMutation } from 'src/redux-toolkit/services/cardApi';

const Props = {
  /** @type {PaymentCard | undefined} */
  card: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PaymentCardDeleteDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    card,
    // optional props
    sx = {},
  } = props;

  // api state
  const [deleteCard, deleteResponse] = useCardDeleteMutation();

  // handle delete
  const onConfirm = useCallback(async () => {
    console.log('Delete Payment Card:', card);

    const response = await deleteCard(card?.id);
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.log('Error in deleting Payment Card:', response);
      enqueueSnackbar('Error in deleting Payment Card!', { variant: 'error' });
    }

    // success state
    else if (data?.success) {
      enqueueSnackbar('Payment Card deleted!');
      console.log('Payment Card deleted:', response);
      onClose(); // close dialog after delete success
    }
  }, [card, deleteCard, onClose]);

  return (
    <ConfirmDialog
      title="Delete card"
      content="Are you sure to delete? because it cannot be undone."
      open={open}
      onClose={onClose}
      action={
        <LoadingButton
          loading={deleteResponse.isLoading}
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Confirm
        </LoadingButton>
      }
      sx={sx}
    />
  );
};

PaymentCardDeleteDialog.propTypes = Props;

export default PaymentCardDeleteDialog;
