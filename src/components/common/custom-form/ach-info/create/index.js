import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../../config-custom-form';
import Fields from './fields';
import { ACHInfoCreateSchema } from './schema';

const Props = {
  ...CustomFormProps,
};

/** @type {ACHType} */
const defaultValues = {
  accountName: '',
  accountNumber: null,
  routingNumber: null,
  primary: false,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoCreateForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {} } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(ACHInfoCreateSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle create payment card
  const onSubmit = (values) => submitCallback(values, onReset);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <Fields />
      </Box>

      {actions}
    </FormProvider>
  );
};

ACHInfoCreateForm.propTypes = Props;

export default ACHInfoCreateForm;
