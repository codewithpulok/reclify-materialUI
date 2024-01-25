import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { SubscriptionForm } from '../../custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SubscriptionPaymentDialog = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <SubscriptionForm
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

SubscriptionPaymentDialog.propTypes = Props;

export default SubscriptionPaymentDialog;
