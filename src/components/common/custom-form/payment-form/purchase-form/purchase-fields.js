import { Alert, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';

import { RHFCheckbox } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../../config-custom-form';
import PaymentTypeTab from './payment-type-tab';
import PurchaseFormDetails from './purchase-details';

export const Props = {
  purchaseData: PropTypes.object,
  primaryBillingAddress: PropTypes.object,
  priamryPaymentCard: PropTypes.object,
  ...CustomFormProps,
};

const defaultValues = {
  billing_details: undefined,
  card: undefined,
  ach: undefined,
  agree: false,
  paymentType: 'ACH',
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
  const { handleSubmit, reset, watch, formState } = methods;
  const { isSubmitting } = formState;

  const agree = watch('agree', false);

  // handle events
  const onSubmit = (values) => {
    if (values.paymentType === 'ACH') {
      return submitCallback({
        agree: values.agree,
        paymentType: values.paymentType,
        achId: values.ach?.id,
      });
    }

    return submitCallback({
      agree: values.agree,
      paymentType: values.paymentType,
      billingInfoId: values.billing_details?.id,
      cardId: values.card?.id,
    });
  };
  const onReset = () => cancelCallback();

  // update primary/default values
  useEffect(() => {
    const changes = { ...defaultValues };

    if (primaryBillingAddress) changes.billing_details = primaryBillingAddress;
    if (priamryPaymentCard) changes.card = priamryPaymentCard;

    reset(changes);
  }, [primaryBillingAddress, priamryPaymentCard, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Stack component={wrapperElement} sx={{ py: 1 }} spacing={2}>
        <PurchaseFormDetails
          due={purchaseData?.due}
          pricePerMonth={purchaseData?.price}
          totalPrice={purchaseData?.total}
          totalSpace={purchaseData?.pallet}
        />

        <PaymentTypeTab />

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
  );
};

PurchaseFormFields.propTypes = Props;

export default PurchaseFormFields;
