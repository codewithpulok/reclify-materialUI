import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { PurchaseForm } from '../../custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  purchaseData: {
    warehouse: PropTypes.object.isRequired,
    pallet: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  },
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchasePaymentDialog = (props) => {
  const { open, onClose, purchaseData } = props;
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <PurchaseForm
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
        purchaseData={purchaseData}
      />
    </Dialog>
  );
};

PurchasePaymentDialog.propTypes = Props;

export default PurchasePaymentDialog;
