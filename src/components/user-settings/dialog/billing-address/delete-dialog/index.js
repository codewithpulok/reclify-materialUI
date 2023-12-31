import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';

const BillingAddressDeleteDialogProps = {
  /** @type {BillingAddress} */
  billingAddress: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  title: PropTypes.string,
  content: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {BillingAddressDeleteDialogProps} props
 * @returns {JSX.Element}
 */
const BillingAddressDeleteDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    // optional props
    title = 'Delete address',
    content = 'Are you sure to delete? because it cannot be undone.',
    sx = {},
    billingAddress,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  // handle delete
  const onConfirm = useCallback(() => {
    enqueueSnackbar('Address Deleted!');
    console.log('Address Deleted: ', billingAddress);
    onClose();
  }, [billingAddress, enqueueSnackbar, onClose]);

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

BillingAddressDeleteDialog.propTypes = BillingAddressDeleteDialogProps;

export default BillingAddressDeleteDialog;
