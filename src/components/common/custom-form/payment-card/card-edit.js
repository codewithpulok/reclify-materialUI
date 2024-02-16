import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { fCreditExpire } from 'src/utils/format-time';
import { CustomFormProps } from '../config-custom-form';
import CardFields from './common/card-fields';
import { cardSchema } from './common/card-schema';

const Props = {
  ...CustomFormProps,
  /** @type {PaymentCard} */
  card: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PaymentCardEditForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {}, card } = props;

  /** @type {PaymentCard} */
  const defaultValues = useMemo(
    () => ({
      cardNumber: card?.cardNumber || '',
      cardHolder: card?.cardHolder || '',
      cvv: card?.cvv || null,
      expirationDate: card?.expirationDate || fCreditExpire(new Date()),
      isPrimary: card?.isPrimary || false,
    }),
    [card]
  );

  const methods = useForm({ defaultValues, resolver: yupResolver(cardSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(() => {
    reset({});
  }, [reset]);

  // handle edit payment card
  const onSubmit = (values) => submitCallback(values, onReset);

  // update default values
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <CardFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

PaymentCardEditForm.propTypes = Props;

export default PaymentCardEditForm;
