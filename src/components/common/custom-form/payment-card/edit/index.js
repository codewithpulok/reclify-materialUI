import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../../config-custom-form';
import Fields from './fields';
import { paymentCardEditSchema } from './schema';

const Props = {
  ...CustomFormProps,
  /** @type {PaymentCard} */
  card: PropTypes.object.isRequired,
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
const PaymentCardEditForm = (props) => {
  const {
    actions,
    failedCallback = () => {},
    successCallback = () => {},
    wrapperElement,
    sx = {},
    card,
  } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(paymentCardEditSchema) });
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle edit payment card
  const onSubmit = useCallback(
    (values) => {
      try {
        enqueueSnackbar('Payment card edited!');
        console.log('Payment card edited: ', values);
        successCallback(values, false, onReset);
      } catch (error) {
        enqueueSnackbar('Error in editing payment card!', { variant: 'error' });
        console.error('Payment card edit error: ', error);
        failedCallback(values, error, onReset);
      }
    },
    [enqueueSnackbar, failedCallback, onReset, successCallback]
  );

  // update default values
  useEffect(() => {
    if (card) {
      reset(card);
    } else {
      reset(defaultValues);
    }
  }, [card, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <Fields />
      </Box>

      {actions}
    </FormProvider>
  );
};

PaymentCardEditForm.propTypes = Props;

export default PaymentCardEditForm;
