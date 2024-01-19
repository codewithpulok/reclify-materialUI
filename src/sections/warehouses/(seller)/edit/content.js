'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// local components
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useSettingsContext } from 'src/components/common/settings';
import { useWarehouseUpdateMutation } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import WarehouseEditFields from './edit-fields';
import editSchema from './edit-schema';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
};

/**
 * @param {Props} param0
 * @returns {JSX.Element}
 */
const Content = ({ warehouse }) => {
  const router = useRouter();
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const [updateWarehouse] = useWarehouseUpdateMutation();

  const methods = useForm({ defaultValues: warehouse, resolver: yupResolver(editSchema) });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset({});
    router.back();
  }, [reset, router]);

  const onSubmit = useCallback(
    async (values) => {
      // updateing total space
      values.totalSpace = Math.round(values.totalSpace);

      console.log('Warehouse Update: ', values);

      const response = await updateWarehouse({ warehouseData: values, id: warehouse?.id });
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(data?.message || 'Error in warehouse update', { variant: 'error' });
        console.error('Error Warehouse Update: ', error || data?.message);
      } else if (!error && data?.isSuccess) {
        enqueueSnackbar('Warehouse updated!');
        reset({});
        router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
      }
    },
    [enqueueSnackbar, reset, router, updateWarehouse, warehouse?.id]
  );

  useEffect(() => {
    if (warehouse) {
      reset(warehouse);
    }
  }, [warehouse, reset]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Edit Warehouse"
        links={[{ name: 'warehouses', href: paths.dashboard.warehouses.root }, { name: 'edit' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <Stack>
          <WarehouseEditFields />
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
          >
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              size="large"
              type="submit"
              color="primary"
            >
              Save Changes
            </LoadingButton>

            <Button variant="soft" size="large" color="error" type="reset">
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
