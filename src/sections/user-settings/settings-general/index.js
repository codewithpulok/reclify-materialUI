import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import Grid from '@mui/material/Unstable_Grid2';

import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { regions } from 'src/assets/data';
import { getUserByID } from 'src/assets/dummy/users';
import { useAuthContext } from 'src/auth/hooks';
import EmptyState from 'src/components/common/empty-state/empty-state';
import FormProvider from 'src/components/common/hook-form';
import GeneralAvatarFields from './general-avatar-fields';
import GeneralInfoFields from './general-info-fields';

// ----------------------------------------------------------------------

const SettingsGeneral = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: authUser } = useAuthContext();

  const user = getUserByID(authUser?.id);

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    photoURL: Yup.mixed().nullable().required('Avatar is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    region: Yup.string()
      .oneOf(regions.map((r) => r.code))
      .required('Region is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
    about: Yup.string().required('About is required'),
    // not required
    isPublic: Yup.boolean(),
  });

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || null,
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    region: user?.region || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('User updated', { variant: 'success' });
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  // if somehow user account is not available then show some errors
  if (!user) {
    return <EmptyState text="User Account not found" />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <GeneralAvatarFields />

          <Button variant="soft" color="error" sx={{ mt: 3 }} fullWidth>
            Delete Account
          </Button>
        </Grid>

        <Grid xs={12} md={8}>
          <GeneralInfoFields />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SettingsGeneral;
