'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// local components
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useRef } from 'react';
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
import { useWarehouseCreateMutation } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { getPredefinedFieldsDefaultValue } from 'src/utils/predefined-fields';
import WarehouseFields, { stepFields } from '../common/warehouse-fields/index';
import warehouseSchema from '../common/warehouse-schema';
import WarehouseStepper from '../common/warehouse-stepper';

// ----------------------------------------------------------------------
const Props = {
  /** @type {Warehouse | undefined} */
  sourceWarehouse: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseCreateContent = (props) => {
  const { sourceWarehouse: warehouse } = props;
  const ref = useRef();

  const router = useRouter();
  const appearance = useAppearance();

  // app states
  const { activeStep, goBack, goNext } = useStepper(0, 2);

  const isPreview = useBoolean();

  // api state
  const [createWarehouse] = useWarehouseCreateMutation();

  // form state
  const defaultValues = useMemo(
    () => ({
      name: warehouse?.name || '',
      address: warehouse?.address || '',
      totalSpace: warehouse?.totalSpace || 0,
      pricePerSpace: warehouse?.pricePerSpace || 0,
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
  const methods = useForm({
    resolver: yupResolver(warehouseSchema),
    defaultValues,
  });
  const { handleSubmit, formState, reset, trigger, watch } = methods;
  const { isSubmitting } = formState;
  const values = watch();

  // ACTIONS ----------------------------------------------------------------------

  // handle go next
  const handleGoNext = useCallback(() => {
    if (ref?.current) ref.current?.scrollIntoView();
    goNext();
  }, [goNext, ref]);

  // handle go back
  const handleGoBack = useCallback(() => {
    if (ref?.current) ref.current?.scrollIntoView();
    goBack();
  }, [goBack, ref]);

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  // handle form submit
  const handleCreate = useCallback(
    async (formValues) => {
      // updateing total space
      formValues.totalSpace = Math.round(formValues.totalSpace);

      console.log('Warehouse Create: ', formValues);
      const response = await createWarehouse(formValues);
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(error?.data?.message || data?.message || 'Error in warehouse create', {
          variant: 'error',
        });
      } else if (!error || data?.success) {
        enqueueSnackbar('Warehouse created!');
        reset(defaultValues);
        router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createWarehouse, defaultValues]
  );

  // validate steps before going to next step
  const validateStep = useCallback(async () => {
    const fields = stepFields[activeStep];
    if (!fields) return;

    const response = await trigger(fields, { shouldFocus: true });

    if (!response) return;

    handleGoNext();
  }, [activeStep, handleGoNext, trigger]);

  // mannualy submit form
  const submitForm = async () => {
    // Trigger validations before submitting
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(handleCreate)();
    }
  };

  // update form on warehous changes
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'} ref={ref}>
      <CustomBreadcrumbs
        heading="Create Warehouse"
        links={[
          { name: 'warehouses', href: paths.settings.warehouses },
          { name: 'create', href: '#' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button variant="soft" color="primary" onClick={isPreview.onToggle}>
            {isPreview.value ? 'Create Mode' : 'Preview Mode'}
          </Button>
        }
      />

      {!isPreview.value && (
        <FormProvider methods={methods} onSubmit={handleSubmit(handleCreate)} onReset={onReset}>
          <Stack spacing={1.5}>
            <WarehouseStepper
              activeStep={activeStep}
              handleBack={handleGoBack}
              handleNext={validateStep}
            />

            <WarehouseFields
              activeStep={activeStep}
              excludeImages={defaultValues?.photos?.map((p) => p.link) || []}
            />
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
                {activeStep === 2 ? 'Create' : 'Next'}
              </LoadingButton>

              <Button
                variant="soft"
                size="large"
                color="error"
                onClick={activeStep === 0 ? onReset : handleGoBack}
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

WarehouseCreateContent.propTypes = Props;

export default WarehouseCreateContent;
