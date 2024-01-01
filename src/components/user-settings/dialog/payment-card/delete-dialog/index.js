import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';

const PaymentCardDeleteDialogProps = {
  /** @type {PaymentCard} */
  paymentCard: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  title: PropTypes.string,
  content: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {PaymentCardDeleteDialogProps} props
 * @returns {JSX.Element}
 */
const PaymentCardDeleteDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    // optional props
    title = 'Delete card',
    content = 'Are you sure to delete? because it cannot be undone.',
    sx = {},
    paymentCard,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  // handle delete
  const onConfirm = useCallback(() => {
    enqueueSnackbar('Card Deleted!');
    console.log('Card Deleted: ', paymentCard);
    onClose();
  }, [paymentCard, enqueueSnackbar, onClose]);

  return (
    <ConfirmDialog
      title={title}
      content={content}
      open={open}
      onClose={onClose}
      action={
        <Button color="error" variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      }
      sx={sx}
    />
  );
};

PaymentCardDeleteDialog.propTypes = PaymentCardDeleteDialogProps;

export default PaymentCardDeleteDialog;
