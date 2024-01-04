import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { BillingAddressEditForm } from 'src/components/common/custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {BillingAddress | undefined} */
  billingAddress: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingAddressEditDialog = (props) => {
  const { open, onClose, billingAddress } = props;

  const handleSuccess = useCallback(
    (values, errors, reset) => {
      onClose();
      reset();
    },
    [onClose]
  );

  const handleFailed = useCallback(
    (values, errors, reset) => {
      onClose();
      reset();
    },
    [onClose]
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Edit Billing Address</DialogTitle>
      <BillingAddressEditForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Edit
            </Button>
          </DialogActions>
        }
        successCallback={handleSuccess}
        failedCallback={handleFailed}
        billingAddress={billingAddress}
      />
    </Dialog>
  );
};

BillingAddressEditDialog.propTypes = Props;

export default BillingAddressEditDialog;
