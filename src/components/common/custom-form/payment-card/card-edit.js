import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import CardEditFields from './common/card-edit-fields';
import { cardEditSchema } from './common/card-schema';

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
      isPrimary: card?.isPrimary || false,
      expirationYear: card?.expirationYear || '',
      expirationMonth: card?.expirationMonth || '',
    }),
    [card]
  );

  const methods = useForm({ defaultValues, resolver: yupResolver(cardEditSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(() => {
    reset({});
  }, [reset]);

  // handle edit payment card
  const onSubmit = (values) =>
    submitCallback(
      {
        ...values,
        expirationMonth: values?.expirationMonth?.toString(),
        expirationYear: values?.expirationYear?.toString(),
      },
      onReset
    );

  // update default values
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <CardEditFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

PaymentCardEditForm.propTypes = Props;

export default PaymentCardEditForm;
