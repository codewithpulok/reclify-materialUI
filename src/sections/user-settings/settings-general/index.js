import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// mui
// components
import { Card, Stack } from '@mui/material';
import { getUserByID, getUserByType } from 'src/assets/dummy/users';
import { addressFieldSchema } from 'src/components/common/custom-fields';
import { EmptyState } from 'src/components/common/custom-state';
import FormProvider from 'src/components/common/hook-form';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { fDate } from 'src/utils/format-time';
import Cover from './cover';
import Fields from './fields';

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
    <Stack spacing={5}>
      <Card sx={{ height: 290 }}>
        <Cover
          joined={fDate(user.createdAt)}
          name={user?.displayName}
          avatarUrl={user?.avatar}
          coverUrl="https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg"
        />
      </Card>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Fields />
      </FormProvider>
    </Stack>
  );
};

export default SettingsGeneral;
