import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useBillingInfoPrimaryQuery } from 'src/redux-toolkit/services/billingInfoApi';
import { useCardPrimaryQuery } from 'src/redux-toolkit/services/cardApi';
import { BillingAddressListDialog, PaymentCardListDialog } from '../../custom-dialog';
import { ErrorState, LoadingState } from '../../custom-state';
import FormProvider from '../../hook-form/form-provider';
import PaymentFields from './payment-fields';

export const Props = {
  submitCallback: PropTypes.func,
};

const defaultValues = {
  billing_details: undefined,
  card: undefined,
};

/**
 * @param {Props | import('./payment-fields').Props} props
 * @returns {JSX.Element}
 */
const SubscriptionForm = (props) => {
  const { submitCallback, ...other } = props;

  // auth state
  const { user } = useAppSelector(selectAuth);

  // api state
  const billingAddressResponse = useBillingInfoPrimaryQuery();
  const paymentCardResponse = useCardPrimaryQuery();

  // form state
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
        <PaymentFields
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

  // update form state
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

SubscriptionForm.propTypes = Props;

export default SubscriptionForm;
