import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';

const Props = {
  /** @type {BillingAddress} */
  billingAddress: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingAddressDeleteDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    billingAddress,
    // optional props
    sx = {},
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  // handle delete
  const onConfirm = useCallback(() => {
    enqueueSnackbar('Billing Address Deleted!');
    console.log('Billing Address Deleted: ', billingAddress);
    onClose();
  }, [billingAddress, enqueueSnackbar, onClose]);

  return (
    <ConfirmDialog
      title="Delete billing address"
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

BillingAddressDeleteDialog.propTypes = Props;

export default BillingAddressDeleteDialog;
