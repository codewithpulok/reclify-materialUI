'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useSettingsContext } from 'src/components/common/settings';
import { paths } from 'src/routes/paths';
import WarehouseEditFields from './edit-fields';
import editSchema from './edit-schema';

const WarehouseProps = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
};

/**
 * @param {WarehouseProps} param0
 * @returns {JSX.Element}
 */
const WarehouseEdit = ({ warehouse }) => {
  const settings = useSettingsContext();
  const methods = useForm({ defaultValues: warehouse, resolver: yupResolver(editSchema) });
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values) => {
    console.log('Warehouse Update: ', values);
    enqueueSnackbar('Warehouse updated', { variant: 'success' });
  };

  useEffect(() => {
    if (warehouse) {
      reset(warehouse);
    }
  }, [warehouse, reset]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Edit Warehouse"
        links={[
          { name: 'warehouse', href: paths.dashboard.listing },
          { name: warehouse?.id, href: `${paths.warehouse.root}/${warehouse?.id}` },
          { name: 'edit' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WarehouseEditFields />
      </FormProvider>
    </Container>
  );
};

WarehouseEdit.propTypes = WarehouseProps;

export default WarehouseEdit;
