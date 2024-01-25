import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getPaymentCardsByUserId } from 'src/assets/dummy';
import { getBillingAddressByUserId } from 'src/assets/dummy/billing-address';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
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

  const { user } = useAppSelector(selectAuth);

  const userBillingAddress = getBillingAddressByUserId('2') || getBillingAddressByUserId(user?.id);
  const primaryBillingAddress = userBillingAddress.find((a) => a.primary);
  const userPaymentCards = getPaymentCardsByUserId('2') || getPaymentCardsByUserId(user?.id);
  const primaryPaymentCard = userPaymentCards.find((p) => p.primary);

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values) => {
    console.log('Subscription Create: ', values);
    // const response = await createPurchase(values);
    // const { data, error } = response;

    // if (error || data?.isError) {
    //   enqueueSnackbar('Error in create purchase', { variant: 'error' });
    //   console.error('Error in create purchase', response);
    // } else if (!error || data?.success) {
    //   enqueueSnackbar('Purchase Created!');
    //   console.warn('Purchase Created!', response);
    submitCallback();
    // }
  };

  useEffect(() => {
    const changes = defaultValues;
    if (primaryBillingAddress) changes.billing_details = primaryBillingAddress;
    if (primaryPaymentCard) changes.card = primaryPaymentCard;
    reset(changes);
  }, [primaryBillingAddress, primaryPaymentCard, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PaymentFields
        {...other}
        billingAddresses={userBillingAddress}
        paymentCards={userPaymentCards}
      />
    </FormProvider>
  );
};

SubscriptionForm.propTypes = Props;

export default SubscriptionForm;
