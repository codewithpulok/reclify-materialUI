import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { PaymentCardEditForm } from 'src/components/common/custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {PaymentCard | undefined} */
  card: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PayemntCardEditDialog = (props) => {
  const { open, onClose, card } = props;

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
      <DialogTitle>Edit Card</DialogTitle>
      <PaymentCardEditForm
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
        card={card}
      />
    </Dialog>
  );
};

PayemntCardEditDialog.propTypes = Props;

export default PayemntCardEditDialog;
