import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// mui
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
// components
import { getUserByID, getUserByType } from 'src/assets/dummy/users';
import { addressFieldSchema } from 'src/components/common/custom-fields';
import { EmptyState } from 'src/components/common/custom-state';
import FormProvider from 'src/components/common/hook-form';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import GeneralAvatarFields from './general-avatar-fields';
import GeneralInfoFields from './general-info-fields';

// ----------------------------------------------------------------------

const SettingsGeneral = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: authUser } = useAppSelector(selectAuth);

  const user = getUserByID(authUser?.id) || getUserByType(authUser?.userType); // TODO: added for testing.

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    avatar: Yup.mixed().nullable().required('Avatar is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: addressFieldSchema,
    about: Yup.string().required('About is required'),
    // not required
    isPublic: Yup.boolean(),
  });

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    avatar: user?.avatar || null,
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
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
      console.info('User updated: ', data);
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
