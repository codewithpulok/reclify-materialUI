import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDialog } from 'src/hooks/use-dialog';
import { useCreatePurchaseMutation } from 'src/redux-toolkit/services/purchaseApi';
import { paths } from 'src/routes/paths';
import { PurchaseForm } from '../../custom-form';
import ConfirmDialog from '../confirm-dialog';

/** @typedef {{warehouseId: string} & TransactionPurchase} PurchaseData */

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
const PurchaseDialog = (props) => {
  const { open, onClose, purchaseData } = props;
  const router = useRouter();

  // dialog state
  const successDialog = useDialog();

  // api state
  const [createPurchase] = useCreatePurchaseMutation();

  // handle purchase api
  const handleCreatePurchase = useCallback(
    async (values) => {
      if (!purchaseData) return;

      /** @type {TransactionPurchase} */
      const newValues = {
        ...purchaseData,
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
        successDialog.onOpen(data?.results?.id);
        onClose();
      }
    },
    [createPurchase, onClose, purchaseData, successDialog]
  );

  // handle transaction visit
  const goToTransaction = useCallback(() => {
    router.push(paths.dashboard.transactions.details(successDialog.value));
    successDialog.onClose();
  }, [router, successDialog]);

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle>Payment</DialogTitle>
        <PurchaseForm
          wrapperElement={DialogContent}
          submitCallback={handleCreatePurchase}
          purchaseData={purchaseData}
          cancelCallback={onClose}
        />
      </Dialog>
      <ConfirmDialog
        title="Warehouse Reservation Placed!"
        content="Your reservation has been placed and is now awaiting warehouse confirmation."
        onClose={successDialog.onClose}
        open={successDialog.open}
        action={
          <Button variant="contained" color="primary" onClick={goToTransaction}>
            View Transaction
          </Button>
        }
      />
    </>
  );
};

PurchaseDialog.propTypes = Props;

export default PurchaseDialog;
