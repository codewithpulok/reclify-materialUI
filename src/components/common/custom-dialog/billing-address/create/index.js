import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { BillingAddressCreateForm } from 'src/components/common/custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingAddressCreateDialog = (props) => {
  const { open, onClose } = props;

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
      <DialogTitle>New Billing Address</DialogTitle>
      <BillingAddressCreateForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        }
        successCallback={handleSuccess}
        failedCallback={handleFailed}
      />
    </Dialog>
  );
};

BillingAddressCreateDialog.propTypes = Props;

export default BillingAddressCreateDialog;
