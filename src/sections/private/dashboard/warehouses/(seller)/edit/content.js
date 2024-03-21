'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

// local components
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import {
  predefinedAmenities,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
} from 'src/assets/data/predefined-fields/warehouse';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { WarehouseDetailsPreview } from 'src/components/warehouse/details';
import { useBoolean } from 'src/hooks/use-boolean';
import useStepper from 'src/hooks/use-stepper';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useWarehouseUpdateMutation } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { getPredefinedFieldsDefaultValue } from 'src/utils/predefined-fields';
import WarehouseFields, { stepFields } from '../common/warehouse-fields';
import warehouseSchema from '../common/warehouse-schema';
import WarehouseStepper from '../common/warehouse-stepper';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Content = (props) => {
  const { warehouse } = props;
  const router = useRouter();
  const appearance = useAppearance();
  const { enqueueSnackbar } = useSnackbar();

  // app states
  const { activeStep, goBack, goNext } = useStepper(0, 2);
  const isPreview = useBoolean();

  // api states
  const [updateWarehouse] = useWarehouseUpdateMutation();

  // form states
  const defaultValues = useMemo(
    () => ({
      name: warehouse?.name || '',
      address: warehouse?.address || '',
      totalSpace: warehouse?.totalSpace || 0,
      pricePerSpace: warehouse?.pricePerSpace || 0,
      discountRate: warehouse?.discountRate || 0,
      maxSpaceOrder: warehouse?.maxSpaceOrder || 0,
      minSpaceOrder: warehouse?.minSpaceOrder || 0,
      description: warehouse?.description || '',
      photos: warehouse?.photos || [],
      features: warehouse?.features || getPredefinedFieldsDefaultValue(predefinedFeatures),
      facilityDetails:
        warehouse?.facilityDetails || getPredefinedFieldsDefaultValue(predefinedFacility),
      services: warehouse?.services || getPredefinedFieldsDefaultValue(predefinedServices),
      amenities: warehouse?.amenities || getPredefinedFieldsDefaultValue(predefinedAmenities),
      regionScope: warehouse?.regionScope || '',
      region: warehouse?.region || '',
      documents: warehouse?.documents || [],
      discount1: warehouse?.discount1 || 0,
      discount3: warehouse?.discount3 || 0,
      discount6: warehouse?.discount6 || 0,
      discount12: warehouse?.discount12 || 0,
      hasPromo: warehouse?.hasPromo || false,
      price1: warehouse?.price1 || 0,
      price12: warehouse?.price12 || 0,
      price3: warehouse?.price3 || 0,
      price6: warehouse?.price6 || 0,
      promoCode: warehouse?.promoCode || '',
      hotRackEnabled: warehouse?.hotRackEnabled || false,
      discountOption: warehouse?.discountOption || 'percentage',
      logo: warehouse?.logo || null,
      miniLogo: warehouse?.miniLogo || null,
      banner: warehouse?.banner || null,
      highlights: warehouse?.highlights,
    }),
    [warehouse]
  );
  const methods = useForm({ defaultValues, resolver: yupResolver(warehouseSchema) });
  const { handleSubmit, reset, formState, trigger, watch } = methods;
  const { isSubmitting } = formState;
  const values = watch();

  // reset form
  const onReset = useCallback(() => {
    reset({});
    router.back();
  }, [reset, router]);

  // handle submit form request
  const handleUpdate = useCallback(
    async (formValues) => {
      // updateing total space
      formValues.totalSpace = Math.round(formValues.totalSpace);

      console.log('Warehouse Update: ', formValues);

      const response = await updateWarehouse({ data: formValues, id: warehouse?.id });
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(error?.data?.message || data?.message || 'Error in warehouse update', {
          variant: 'error',
        });
        console.error('Error Warehouse Update: ', response);
      } else if (!error && data?.success) {
        enqueueSnackbar('Warehouse updated!');
        reset({});
        router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
      }
    },
    [enqueueSnackbar, reset, router, updateWarehouse, warehouse?.id]
  );

  // validate steps before going to next step
  const validateStep = useCallback(async () => {
    const fields = stepFields[activeStep];
    if (!fields) return;

    const response = await trigger(fields, { shouldFocus: true });

    if (!response) return;

    goNext();
  }, [activeStep, goNext, trigger]);

  // mannualy submit form
  const submitForm = async () => {
    // Trigger validations before submitting
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(handleUpdate)();
    }
  };

  // scroll to top after step change
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [activeStep]);

  // update form on warehous changes
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Edit Warehouse"
        links={[{ name: 'warehouses', href: paths.settings.warehouses }, { name: 'edit' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button variant="soft" color="primary" onClick={isPreview.onToggle}>
            {isPreview.value ? 'Edit Mode' : 'Preview Mode'}
          </Button>
        }
      />

      {!isPreview.value && (
        <FormProvider methods={methods} onSubmit={handleSubmit(handleUpdate)} onReset={onReset}>
          <Stack>
            <WarehouseStepper
              activeStep={activeStep}
              handleBack={goBack}
              handleNext={validateStep}
            />
            <WarehouseFields activeStep={activeStep} />
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
              spacing={1}
              mt={5}
            >
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                size="large"
                type="button"
                onClick={activeStep === 2 ? submitForm : validateStep}
                color="primary"
              >
                {activeStep === 2 ? 'Save Changes' : 'Next'}
              </LoadingButton>

              <Button
                variant="soft"
                size="large"
                color="error"
                onClick={activeStep === 0 ? onReset : goBack}
              >
                {activeStep === 0 ? 'Cancel' : 'Back'}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      )}

      {isPreview.value && (
        <WarehouseDetailsPreview warehouse={values || {}} reviews={values?.reviews || []} />
      )}
    </Container>
  );
};

Content.propTypes = Props;

export default Content;
