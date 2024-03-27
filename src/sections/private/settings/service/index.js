'use client';

import { Button, Stack } from '@mui/material';
// local components

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { ServiceDetailsPreview } from 'src/components/service/details';
import { getServiceType } from 'src/constant/service-types';
import { useBoolean } from 'src/hooks/use-boolean';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import {
  useLazyGetOwnServiceQuery,
  useUpdateOwnServiceMutation,
} from 'src/redux-toolkit/services/serviceApi';
import ServiceFields from './service-fields';
import createSchema from './service-schema';

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
  const serviceType = getServiceType(user?.serviceType);

  /** @type {Service} */
  const defaultValues = useMemo(
    () => ({
      name: serviceResponse?.data?.results?.name || '',
      address: serviceResponse?.data?.results?.address || '',
      website: serviceResponse?.data?.results?.website || '',
      highlights: serviceResponse?.data?.results?.highlights || '',
      type: user?.serviceType || '',
      features: serviceResponse?.data?.results?.features || {},
      photos: serviceResponse?.data?.results?.photos || [],
      description: serviceResponse?.data?.results?.description || '',
      keyFeatures: serviceResponse?.data?.results?.keyFeatures || [],
      customerList: serviceResponse?.data?.results?.customerList || [],
      foundedYear: serviceResponse?.data?.results?.foundedYear || 1800,
      promoCode: serviceResponse?.data?.results?.promoCode || '',
      logo: serviceResponse?.data?.results?.logo || null,
      banner: serviceResponse?.data?.results?.banner || null,
      businessHours: {
        start: serviceResponse?.data?.results?.businessHours?.start || new Date(),
        end: serviceResponse?.data?.results?.businessHours?.end || new Date(),
      },
      operatingDays: serviceResponse?.data?.results?.operatingDays || [],
    }),
    [
      serviceResponse?.data?.results?.name,
      serviceResponse?.data?.results?.address,
      serviceResponse?.data?.results?.website,
      serviceResponse?.data?.results?.highlights,
      serviceResponse?.data?.results?.features,
      serviceResponse?.data?.results?.photos,
      serviceResponse?.data?.results?.description,
      serviceResponse?.data?.results?.keyFeatures,
      serviceResponse?.data?.results?.customerList,
      serviceResponse?.data?.results?.foundedYear,
      serviceResponse?.data?.results?.promoCode,
      serviceResponse?.data?.results?.logo,
      serviceResponse?.data?.results?.banner,
      serviceResponse?.data?.results?.businessHours?.start,
      serviceResponse?.data?.results?.businessHours?.end,
      serviceResponse?.data?.results?.operatingDays,
      user?.serviceType,
    ]
  );

  const methods = useForm({ resolver: yupResolver(createSchema), defaultValues });
  const { handleSubmit, formState, reset, getValues } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

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
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <>
      <Stack direction="row" justifyContent="end" mb={5}>
        <Button
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          color="primary"
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
          {!previewMode.value && <ServiceFields serviceType={serviceType} />}

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
