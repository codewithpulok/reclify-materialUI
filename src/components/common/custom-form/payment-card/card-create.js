import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import CardCreateFields from './common/card-create-fields';
import { cardSchema } from './common/card-schema';

const Props = {
  ...CustomFormProps,
  hidePrimary: PropTypes.bool,
};

/** @type {PaymentCard} */
const defaultValues = {
  cardHolder: '',
  isPrimary: false,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PaymentCardCreateForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {}, hidePrimary } = props;

  const stripe = useStripe();
  const elements = useElements();

  const methods = useForm({ defaultValues, resolver: yupResolver(cardSchema) });
  const { handleSubmit, reset, setError, clearErrors } = methods;

  // generate token from stripe
  const getToken = async (name) => {
    clearErrors(); // reset errors
    if (!stripe || !elements) return null;

    const { error, token } = await stripe.createToken(elements.getElement('card'), {
      name,
      currency: 'usd',
    });

    if (error) {
      console.error('ERROR: Create Token ->', error);
      setError('root', { message: error?.message || 'Error in creating card' });
      return null;
    }

    return token;
  };

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle create payment card
  const onSubmit = async (values) => {
    const token = await getToken(values?.cardHolder);
    if (!token) return null; // if token generation error then stop execution
    return submitCallback({ cardToken: token.id, ...values }, onReset);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <CardCreateFields hidePrimary={hidePrimary} />
      </Box>

      {actions}
    </FormProvider>
  );
};

PaymentCardCreateForm.propTypes = Props;

export default PaymentCardCreateForm;
