import { Alert, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import {
  BillingAddressListDialog,
  PaymentCardListDialog,
} from 'src/components/common/custom-dialog';
import { RHFCheckbox } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useBoolean } from 'src/hooks/use-boolean';
import { CustomFormProps } from '../../config-custom-form';
import BillingDetails from '../common/billing-details';
import PaymentCard from '../common/payment-card';
import PurchaseFormDetails from './purchase-form-details';

export const Props = {
  purchaseData: PropTypes.object,
  primaryBillingAddress: PropTypes.object,
  priamryPaymentCard: PropTypes.object,
  ...CustomFormProps,
};

const defaultValues = {
  billing_details: undefined,
  card: undefined,
  agree: false,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseFormFields = (props) => {
  const {
    wrapperElement,
    purchaseData,
    priamryPaymentCard,
    primaryBillingAddress,
    submitCallback,
    cancelCallback,
  } = props;

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, watch, setValue, formState } = methods;
  const { isSubmitting } = formState;

  const billingDetails = watch('billing_details', undefined);
  const card = watch('card', undefined);
  const agree = watch('agree', false);

  const cardsDialog = useBoolean();
  const billingDetailsDialog = useBoolean();

  const onAddressChange = (newAddress) => {
    setValue('billing_details', newAddress);
  };
  const onCardChange = (newCard) => {
    setValue('card', newCard);
  };

  // handle events
  const onSubmit = (values) => submitCallback(values);
  const onReset = () => cancelCallback();

  // update primary/default values
  useEffect(() => {
    const changes = { ...defaultValues };

    if (primaryBillingAddress) changes.billing_details = primaryBillingAddress;
    if (priamryPaymentCard) changes.card = priamryPaymentCard;

    reset(changes);
  }, [primaryBillingAddress, priamryPaymentCard, reset]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <Stack component={wrapperElement} sx={{ py: 1 }} spacing={2}>
          <PurchaseFormDetails
            due={purchaseData.due}
            pricePerMonth={purchaseData.price}
            totalPrice={purchaseData.total}
            totalSpace={purchaseData.pallet}
          />
          <BillingDetails billingDetails={billingDetails} onClick={billingDetailsDialog.onTrue} />
          <PaymentCard card={card} onClick={cardsDialog.onTrue} />
          <Alert severity="info" variant="outlined" sx={{ typography: 'body2' }}>
            By clicking confirm payment, you are authorizing a hold on your payment method for the
            total amount specified. Your purchase is pending approval by the warehouse. If approved
            your payment method will be charged. If denied, the hold will be removed.
          </Alert>
          <RHFCheckbox name="agree" label="Agree to terms of privacy & policy" />
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} pb={2}>
            <Button type="reset">Cancel</Button>
            <LoadingButton
              loading={isSubmitting}
              disabled={!agree}
              type="submit"
              color="primary"
              variant="contained"
            >
              Confirm Payment
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>

      <BillingAddressListDialog
        onClose={billingDetailsDialog.onFalse}
        open={billingDetailsDialog.value}
        selected={(id) => billingDetails?.id === id}
        onSelect={onAddressChange}
      />

      <PaymentCardListDialog
        onClose={cardsDialog.onFalse}
        open={cardsDialog.value}
        selected={(id) => card?.id === id}
        onSelect={onCardChange}
      />
    </>
  );
};

PurchaseFormFields.propTypes = Props;

export default PurchaseFormFields;
