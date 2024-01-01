import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { PaymentForm } from '../../custom-form';

const PayemntDialogProps = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {PayemntDialogProps} props
 * @returns {JSX.Element}
 */
const PayemntDialog = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <PaymentForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              Confirm Payment
            </Button>
          </DialogActions>
        }
        submitCallback={onClose}
      />
    </Dialog>
  );
};

PayemntDialog.propTypes = PayemntDialogProps;

export default PayemntDialog;
