import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../../config-custom-form';
import Fields from './fields';
import { paymentCardCreateSchema } from './schema';

const Props = {
  ...CustomFormProps,
};

/** @type {PaymentCard} */
const defaultValues = {
  number: '',
  holder: '',
  securityNumber: '',
  expire: Date.now(),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PaymentCardCreateForm = (props) => {
  const {
    actions,
    failedCallback = () => {},
    successCallback = () => {},
    wrapperElement,
    sx = {},
  } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(paymentCardCreateSchema) });
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle create payment card
  const onSubmit = useCallback(
    (values) => {
      try {
        enqueueSnackbar('Payment Card Added!');
        console.log('Payment Card Added: ', values);
        successCallback(values, false, onReset);
      } catch (error) {
        enqueueSnackbar('Error in adding payment card!', { variant: 'error' });
        console.error('Payment Card Create Error: ', error);
        failedCallback(values, error, onReset);
      }
    },
    [enqueueSnackbar, failedCallback, onReset, successCallback]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <Fields />
      </Box>

      {actions}
    </FormProvider>
  );
};

PaymentCardCreateForm.propTypes = Props;

export default PaymentCardCreateForm;
