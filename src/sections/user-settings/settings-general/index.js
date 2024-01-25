import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// mui
// components
import { Card, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { addressFieldSchema } from 'src/components/common/custom-fields';
import { EmptyState } from 'src/components/common/custom-state';
import FormProvider from 'src/components/common/hook-form';
import { PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import {
  useProfileGetQuery,
  useProfileUpdateMutation,
} from 'src/redux-toolkit/services/profileApi';
import { fDate } from 'src/utils/format-time';
import BannerFields from './banner-fields';
import Fields from './fields';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  website: '',
  serviceType: '',
  avatar: null,
  banner: PLACEHOLDER_PROFILE_BANNER,
  phone: '',
  address: {},
  about: '',
};

// schema
const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string().label('First name').required(),
  lastName: Yup.string().label('Last name').required(),
  email: Yup.string().label('Email').required().email(),
  website: Yup.string().label('Website URL').url(),
  // avatar: Yup.mixed().label('Avatar').nullable().required(),
  // banner: Yup.mixed().label('banner').nullable().required(),
  phone: Yup.string().label('Phone number').required(),
  address: addressFieldSchema,
  about: Yup.string().label('About').required(),
});

// ----------------------------------------------------------------------

const SettingsGeneral = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAppSelector(selectAuth);

  const profileResponse = useProfileGetQuery();
  const [updateProfile] = useProfileUpdateMutation();

  const methods = useForm({ resolver: yupResolver(UpdateUserSchema), defaultValues });
  const { handleSubmit, reset } = methods;

  // handle form submit
  const onSubmit = handleSubmit(async (values) => {
    const response = await updateProfile(values);
    const { error, data } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in profile update', { variant: 'error' });
      console.error('Error in profile update:', response);
    }
    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Profile updated');
      console.info('Profile updated:', response);
    }
  });

  // handle form reset
  const onReset = useCallback(async () => {
    reset(defaultValues);
  }, [reset]);

  // update state
  useEffect(() => {
    const changes = defaultValues;

    if (profileResponse.isSuccess && profileResponse.data?.success) {
      Object.keys(defaultValues).forEach((key) => {
        if (profileResponse.data?.results?.[key])
          changes[key] = profileResponse.data?.results?.[key];
      });
    }

    reset(changes);
  }, [profileResponse, reset]);

  // if somehow user account is not available then show some errors
  if (!user || profileResponse?.isError || profileResponse?.data?.isError) {
    return <EmptyState text="User Account not found" />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} onReset={onReset}>
      <Stack spacing={5}>
        <Card sx={{ height: 290 }}>
          <BannerFields joined={fDate(new Date())} />
        </Card>
        <Fields />
      </Stack>
    </FormProvider>
  );
};

export default SettingsGeneral;
