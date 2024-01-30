import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCreatePurchaseMutation } from 'src/redux-toolkit/services/purchaseApi';
import { PurchaseForm } from '../../custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  purchaseData: PropTypes.objectOf({
    warehouse: PropTypes.object,
    pallet: PropTypes.number,
    price: PropTypes.number,
    total: PropTypes.number,
    month: PropTypes.number,
  }),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchasePaymentDialog = (props) => {
  const { open, onClose, purchaseData } = props;

  const [createPurchase, createResponse] = useCreatePurchaseMutation();

  const handleCreatePurchase = async (values) => {
    const newValues = {
      warehouseId: purchaseData?.warehouse?.id,
      pallet: purchaseData?.pallet,
      price: purchaseData?.price,
      total: purchaseData?.total,
      month: purchaseData?.month,
      billingInfoId: values?.billing_details?.id,
      cardId: values?.card?.id,
    };

    console.log('Purchase Create: ', newValues);
    const response = await createPurchase(newValues);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in create purchase', { variant: 'error' });
      console.error('Error in create purchase', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Purchase Created!');
      console.warn('Purchase Created!', response);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <PurchaseForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              loading={createResponse.isLoading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Confirm Payment
            </LoadingButton>
          </DialogActions>
        }
        submitCallback={handleCreatePurchase}
        purchaseData={purchaseData}
      />
    </Dialog>
  );
};

PurchasePaymentDialog.propTypes = Props;

export default PurchasePaymentDialog;
