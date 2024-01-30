import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useBillingInfoPrimaryQuery } from 'src/redux-toolkit/services/billingInfoApi';
import { useCardPrimaryQuery } from 'src/redux-toolkit/services/cardApi';
import { BillingAddressListDialog, PaymentCardListDialog } from '../../../custom-dialog';
import { ErrorState, LoadingState } from '../../../custom-state';
import FormProvider from '../../../hook-form/form-provider';
import { Props as FieldProps } from '../payment-fields';
import PurchaseFormFields from './purchase-form-fields';

export const Props = {
  submitCallback: PropTypes.func,
  ...FieldProps,
};

const defaultValues = {
  billing_details: undefined,
  card: undefined,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseForm = (props) => {
  const { submitCallback, ...other } = props;

  const { user } = useAppSelector(selectAuth);

  const billingAddressResponse = useBillingInfoPrimaryQuery();
  const paymentCardResponse = useCardPrimaryQuery();

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, watch, setValue } = methods;

  const billingDetails = watch('billing_details', undefined);
  const card = watch('card', undefined);

  const cardsDialog = useBoolean();
  const billingDetailsDialog = useBoolean();

  const onAddressChange = (newAddress) => {
    setValue('billing_details', newAddress);
  };
  const onCardChange = (newCard) => {
    setValue('card', newCard);
  };

  const onSubmit = async (values) => submitCallback(values);

  const renderContent = useCallback(() => {
    if (billingAddressResponse?.isError || paymentCardResponse?.isError) {
      return <ErrorState />;
    }

    if (billingAddressResponse.isSuccess && paymentCardResponse.isSuccess) {
      return (
        <PurchaseFormFields
          openBillingDialog={billingDetailsDialog.onTrue}
          openCardDialog={cardsDialog.onTrue}
          {...other}
        />
      );
    }

    return <LoadingState />;
  }, [
    billingAddressResponse?.isError,
    billingAddressResponse.isSuccess,
    billingDetailsDialog,
    cardsDialog,
    other,
    paymentCardResponse?.isError,
    paymentCardResponse.isSuccess,
  ]);

  useEffect(() => {
    const changes = { ...defaultValues };

    if (billingAddressResponse.isSuccess && billingAddressResponse?.data?.results)
      changes.billing_details = billingAddressResponse.data.results;
    if (paymentCardResponse.isSuccess && billingAddressResponse?.data?.results)
      changes.card = paymentCardResponse.data.results;

    reset(changes);
  }, [billingAddressResponse, paymentCardResponse, reset]);

  // refetch api on user update
  useEffect(() => {
    if (user?.id) {
      billingAddressResponse.refetch();
      paymentCardResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {renderContent()}
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

PurchaseForm.propTypes = Props;

export default PurchaseForm;
