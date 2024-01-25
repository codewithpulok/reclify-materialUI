'use client';

import { Button, Stack } from '@mui/material';
// local components

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { ServiceDetailsPreview } from 'src/components/service/details';
import { useBoolean } from 'src/hooks/use-boolean';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import {
  useLazyGetOwnServiceQuery,
  useUpdateOwnServiceMutation,
} from 'src/redux-toolkit/services/serviceApi';
import ServiceFields from './services-fields';
import createSchema from './services-schema';

/** @type {Service} */
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

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SettingsService = (props) => {
  const { user } = useAppSelector(selectAuth);
  const [getService, serviceResponse] = useLazyGetOwnServiceQuery();
  const [updateService] = useUpdateOwnServiceMutation();
  const previewMode = useBoolean(false);

  const methods = useForm({ resolver: yupResolver(createSchema), defaultValues });
  const { handleSubmit, formState, reset, getValues } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
  }, [reset]);

  // handle form submit
  const onSubmit = useCallback(
    async (values) => {
      console.log('Updating Service:', values);

      const response = await updateService(values);
      const { error, data } = response;

      // handle error state
      if (error || data?.isError) {
        enqueueSnackbar('Error in service update', { variant: 'error' });
        console.error('Error in service update:', response);
      }
      // handle success state
      else if (data?.success) {
        enqueueSnackbar('Service updated');
        console.warn('Service updated:', response);
      }
    },
    [updateService]
  );

  // get service details
  useEffect(() => {
    if (user) getService();
  }, [getService, user]);

  // update values
  useEffect(() => {
    if (serviceResponse.isSuccess && serviceResponse?.data?.success && user?.serviceType) {
      const changes = {};

      Object.keys(defaultValues).forEach((key) => {
        if (serviceResponse?.data?.results?.[key]) {
          changes[key] = serviceResponse.data.results[key];
        } else if (key === 'type') {
          changes[key] = user.serviceType;
        } else {
          changes[key] = defaultValues[key];
        }
      });

      reset(changes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceResponse, user]);

  return (
    <>
      <Stack direction="row" justifyContent="end" mb={5}>
        <Button
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          color={!previewMode.value ? 'primary' : 'secondary'}
          variant="contained"
          onClick={previewMode.onToggle}
          fullWidth
        >
          {!previewMode.value ? 'Preview' : 'Edit Mode'}
        </Button>
      </Stack>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <Stack spacing={1.5}>
          {previewMode.value && <ServiceDetailsPreview service={getValues() || {}} />}
          {!previewMode.value && <ServiceFields />}

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
    </>
  );
};

SettingsService.propTypes = Props;

export default SettingsService;
