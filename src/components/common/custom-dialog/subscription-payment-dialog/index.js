import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
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

  const handleCreatePurchase = async (values) => {
    // const newValues = {
    //   warehouseId: purchaseData?.warehouse?.id,
    //   pallet: purchaseData?.pallet,
    //   price: purchaseData?.price,
    //   total: purchaseData?.total,
    //   month: purchaseData?.month,
    //   billingInfoId: values?.billing_details?.id,
    //   cardId: values?.card?.id,
    // };

    // console.log('Purchase Create: ', newValues);
    // const response = await createPurchase(newValues);
    // const { data, error } = response;

    // if (error || data?.isError) {
    //   enqueueSnackbar('Error in create purchase', { variant: 'error' });
    //   console.error('Error in create purchase', response);
    // } else if (!error || data?.success) {
    enqueueSnackbar('Subscription Created!');
    console.warn('Subscription Created!', values);
    onClose();
    // }
  };

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
        submitCallback={handleCreatePurchase}
      />
    </Dialog>
  );
};

SubscriptionPaymentDialog.propTypes = Props;

export default SubscriptionPaymentDialog;
