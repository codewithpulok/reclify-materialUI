'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// local components
import { useSnackbar } from 'notistack';
import {
  approvedUsesDefaultValues,
  facilityDefaultValues,
  featuresDefaultValues,
  servicesDefaultValues,
} from 'src/assets/data';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useSettingsContext } from 'src/components/common/settings';
import { paths } from 'src/routes/paths';
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
  approvedUses: approvedUsesDefaultValues,
  features: featuresDefaultValues,
  facilityDetails: facilityDefaultValues,
  services: servicesDefaultValues,
  rules: [],
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CreateView = (props) => {
  const { sourceWarehouse } = props;

  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();

  const methods = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: sourceWarehouse || defaultValues,
  });
  const { handleSubmit } = methods;

  // handle form submit
  const onSubmit = async (values) => {
    console.log('Warehouse Create: ', values);

    enqueueSnackbar('Warehouse created!');
  };

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
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <CreateFields />
      </FormProvider>
    </Container>
  );
};

CreateView.propTypes = Props;

export default CreateView;
