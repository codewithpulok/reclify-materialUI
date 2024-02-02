'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
// local components
import { LoadingButton } from '@mui/lab';
import { useCallback } from 'react';

import PropTypes from 'prop-types';
import FormProvider from 'src/components/common/hook-form/form-provider';
import CreateFields from './services-fields';
import createSchema from './services-schema';

const Props = {
  service: PropTypes.object,
};

/** @type {Warehouse} */
const defaultValues = {
  type: '',
  features: {},
  photos: [],
  description: '',
  keyFeatures: [],
  clientList: '',
  businessSize: 0,
  foundedYear: 1800,
  cta: '',
  promoCode: '',
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceForm = (props) => {
  const { service } = props;
  const methods = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: service,
  });
  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
  }, [reset]);

  // handle form submit
  const onSubmit = useCallback(async (values) => {
    console.log('Update Service:', values);
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Stack spacing={1.5}>
        <CreateFields />
        <Stack
          sx={{
            flexDirection: {
              xs: 'row',
              sm: 'row-reverse',
            },
            justifyContent: {
              xs: 'start',
              sm: 'end',
            },
          }}
          flexWrap="wrap"
          spacing={0.5}
          mt={5}
        >
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            size="large"
            type="submit"
            color="primary"
          >
            Update Service
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

ServiceForm.propTypes = Props;

export default ServiceForm;
