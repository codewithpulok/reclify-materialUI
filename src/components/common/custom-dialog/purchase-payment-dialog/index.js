import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCreatePurchaseMutation } from 'src/redux-toolkit/services/purchaseApi';
import { PurchaseForm } from '../../custom-form';

/**
 * @typedef {Object} PurchaseData
 * @property {Warehouse} warehouse,
 * @property {number} totalSpace,
 * @property {number} selectedMonth,
 * @property {number} totalPrice,
 * @property {number} discount,
 * @property {number} totalPricePerMonth,
 * @property {number} discountPerMonth,
 * @property {number} discountRate:
 */

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {PurchaseData} */
  purchaseData: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchasePaymentDialog = (props) => {
  const { open, onClose, purchaseData } = props;

  const [createPurchase] = useCreatePurchaseMutation();

  const handleCreatePurchase = async (values) => {
    const newValues = {
      warehouseId: purchaseData?.warehouse?.id,
      pallet: purchaseData?.totalSpace,
      price: undefined,
      total: undefined,
      discountRate: purchaseData.discountRate,
      month: purchaseData?.selectedMonth,
      ...values,
    };

    if (purchaseData.totalPricePerMonth !== undefined) {
      newValues.price = purchaseData.totalPricePerMonth - (purchaseData?.discountPerMonth || 0);
    }

    if (purchaseData.totalPrice !== undefined) {
      newValues.total = purchaseData.totalPrice - (purchaseData?.discount || 0);
    }

    console.log('Purchase Create: ', newValues);
    const response = await createPurchase(newValues);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in create purchase', { variant: 'error' });
      console.error('Error in create purchase', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Purchase Created!');
      console.warn('Purchase Created!', response);
      onClose();
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <PurchaseForm
        wrapperElement={DialogContent}
        submitCallback={handleCreatePurchase}
        purchaseData={purchaseData}
        cancelCallback={onClose}
      />
    </Dialog>
  );
};

PurchasePaymentDialog.propTypes = Props;

export default PurchasePaymentDialog;
