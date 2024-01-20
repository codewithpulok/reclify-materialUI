import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// mui
// components
import { Card, Stack } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { getUserByType } from 'src/assets/dummy/users';
import { addressFieldSchema } from 'src/components/common/custom-fields';
import { EmptyState } from 'src/components/common/custom-state';
import FormProvider from 'src/components/common/hook-form';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { fDate } from 'src/utils/format-time';
import Cover from './cover';
import Fields from './fields';

// schema
const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string().label('First name').required(),
  lastName: Yup.string().label('Last name').required(),
  email: Yup.string().label('Email').required().email(),
  website: Yup.string().label('Website URL').url(),
  avatar: Yup.mixed().label('Avatar').nullable().required(),
  phoneNumber: Yup.string().label('Phone number').required(),
  address: addressFieldSchema,
  about: Yup.string().label('About').required(),
  // not required
  isPublic: Yup.boolean(),
});

// ----------------------------------------------------------------------

const SettingsGeneral = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: authUser } = useAppSelector(selectAuth);

  const user = getUserByType(authUser?.userType); // TODO: added for testing.

  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      website: user?.website || '',
      avatar: user?.avatar || null,
      cover:
        user?.cover || 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
      about: user?.about || '',
    }),
    [user]
  );

  const methods = useForm({ resolver: yupResolver(UpdateUserSchema), defaultValues });
  const { handleSubmit, reset } = methods;

  // handle form submit
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('User updated', { variant: 'success' });
      console.info('User updated: ', data);
    } catch (error) {
      console.error(error);
    }
  });

  // handle form reset
  const onReset = useCallback(async () => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // if somehow user account is not available then show some errors
  if (!user) {
    return <EmptyState text="User Account not found" />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} onReset={onReset}>
      <Stack spacing={5}>
        <Card sx={{ height: 290 }}>
          <Cover joined={fDate(user.createdAt)} />
        </Card>
        <Fields />
      </Stack>
    </FormProvider>
  );
};

export default SettingsGeneral;
