import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import AchFields from './common/ach-fields';
import { AchSchema } from './common/ach-schema';

const Props = {
  ...CustomFormProps,
  /** @type {ACHType} */
  ach: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoEditForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {}, ach } = props;

  /** @type {ACHType} */
  const defaultValues = useMemo(
    () => ({
      accountName: ach?.accountName || '',
      accountNumber: ach?.accountNumber || '',
      routingNumber: ach?.routingNumber || '',
      isPrimary: ach?.isPrimary || false,
    }),
    [ach?.accountName, ach?.accountNumber, ach?.isPrimary, ach?.routingNumber]
  );

  const methods = useForm({ defaultValues, resolver: yupResolver(AchSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [defaultValues, reset]
  );

  // handle edit payment card
  const onSubmit = (values) => submitCallback(values, onReset);

  // update default values
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <AchFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

ACHInfoEditForm.propTypes = Props;

export default ACHInfoEditForm;
