'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// local components
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import {
  predefinedApprovedUses,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
} from 'src/assets/data';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useSettingsContext } from 'src/components/common/settings';
import { useWarehouseCreateMutation } from 'src/redux-toolkit/services/warehouseApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { getPredefinedFieldsDefaultValue } from 'src/utils/predefined-fields';
import CreateFields from './create-fields';
import createSchema from './create-schema';

const Props = {
  /** @type {Warehouse | undefined} */
  sourceWarehouse: PropTypes.object,
};

/** @type {Warehouse} */
const defaultValues = {
  name: '',
  address: '',
  totalSpace: undefined,
  pricePerSpace: undefined,
  discountRate: undefined,
  maxSpaceOrder: undefined,
  minSpaceOrder: undefined,
  description: '',
  photos: [],
  approvedUses: getPredefinedFieldsDefaultValue(predefinedApprovedUses),
  features: getPredefinedFieldsDefaultValue(predefinedFeatures),
  facilityDetails: getPredefinedFieldsDefaultValue(predefinedFacility),
  services: getPredefinedFieldsDefaultValue(predefinedServices),
  rules: [],
  region: 'northeast',
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Content = (props) => {
  const { sourceWarehouse } = props;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();

  const [createWarehouse] = useWarehouseCreateMutation();

  const methods = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: sourceWarehouse || defaultValues,
  });
  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
    router.back();
  }, [reset, router]);

  // handle form submit
  const onSubmit = useCallback(
    async (values) => {
      // updateing total space
      values.totalSpace = Math.round(values.totalSpace);

      console.log('Warehouse Create: ', values);
      const response = await createWarehouse(values);
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(data?.message || 'Error in warehouse create', { variant: 'error' });
      } else if (!error || data?.success) {
        enqueueSnackbar('Warehouse created!');
        reset(defaultValues);
        router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
      }
    },
    [createWarehouse, enqueueSnackbar, reset, router]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Warehouse"
        links={[
          { name: 'warehouses', href: paths.dashboard.warehouses.root },
          { name: 'create', href: '#' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
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
              Create Warehouse
            </LoadingButton>

            <Button
              LinkComponent={RouterLink}
              href={paths.dashboard.warehouses.root}
              variant="soft"
              size="large"
              color="error"
              type="reset"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
};

Content.propTypes = Props;

export default Content;
