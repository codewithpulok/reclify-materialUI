'use client';

import PropTypes from 'prop-types';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import * as Yup from 'yup';
import WarehouseCreateFields from './warehouse-create-fields';

const WarehouseCreateViewProps = {
  /** @type {Warehouse | undefined} */
  sourceWarehouse: PropTypes.object,
};

const WarehouseCreateSchema = Yup.object().shape({
  name: Yup.string().required('Warehouse name is required'),
  location: Yup.string().required('Address is required'),
  totalSpace: Yup.number()
    .min(1, 'Must be greater than or equal 1')
    .required('Total space is required'),
  pricePerSquare: Yup.number()
    .min(1, 'Must be greater than or equal 1')
    .required('Price per square is required'),
  description: Yup.string().required('Description is required'),
  photos: Yup.array(
    Yup.object().shape({
      title: Yup.string().required('Photo title is required'),
      coverUrl: Yup.string().required('Photo url is required'),
    })
  ),
});

const defaultValues = {
  name: '',
  location: '',
  totalSpace: 0,
  pricePerSquare: 0,
  descripiton: '',
  photos: [],
};

/**
 * @param {WarehouseCreateViewProps} props
 * @returns {JSX.Element}
 */
const WarehouseCreateView = (props) => {
  const { sourceWarehouse } = props;
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();

  const methods = useForm({
    resolver: yupResolver(WarehouseCreateSchema),
    defaultValues: sourceWarehouse || defaultValues,
  });
  const { handleSubmit } = methods;

  // handle form submit
  const onSubmit = (values) => {
    console.log({ values });
    enqueueSnackbar('Warehouse created!');
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Warehouse"
        links={[{ name: 'warehouse', href: '/warehouse' }, { name: 'create' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WarehouseCreateFields />
      </FormProvider>
    </Container>
  );
};

WarehouseCreateView.propTypes = WarehouseCreateViewProps;

export default WarehouseCreateView;
