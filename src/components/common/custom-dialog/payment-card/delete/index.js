import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';

const Props = {
  /** @type {PaymentCard} */
  card: PropTypes.object.isRequired,
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
  const { enqueueSnackbar } = useSnackbar();

  // handle delete
  const onConfirm = useCallback(() => {
    enqueueSnackbar('Payment Card Deleted!');
    console.log('Payment Card Deleted: ', card);
    onClose();
  }, [card, enqueueSnackbar, onClose]);

  return (
    <ConfirmDialog
      title="Delete card"
      content="Are you sure to delete? because it cannot be undone."
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

PaymentCardDeleteDialog.propTypes = Props;

export default PaymentCardDeleteDialog;
