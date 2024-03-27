import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// mui
import { Card, Stack } from '@mui/material';
// redux
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
// utils
import { fDate } from 'src/utils/format-time';
// components
import { optionalAddressFieldSchema } from 'src/components/common/custom-fields/address-field/schema';
import { EmptyState } from 'src/components/common/custom-state';
import FormProvider from 'src/components/common/hook-form';
import { PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import {
  useLazyProfileGetQuery,
  useProfileUpdateMutation,
} from 'src/redux-toolkit/services/profileApi';
import BannerField from './banner-field';
import Fields from './fields';

// schema
const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string().label('First name').required(),
  lastName: Yup.string().label('Last name').required(),
  email: Yup.string().label('Email').required().email(),
  website: Yup.string().label('Website URL').url(),
  avatar: Yup.string().label('Avatar').notRequired(),
  banner: Yup.string().label('Banner').notRequired(),
  logo: Yup.string().label('Logo').notRequired(),
  phone: Yup.string().label('Phone number').optional(),
  address: optionalAddressFieldSchema,
  about: Yup.string().label('About').optional(),
});

// ----------------------------------------------------------------------

const SettingsGeneral = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAppSelector(selectAuth);

  const [getProfile, profileResponse] = useLazyProfileGetQuery();
  const [updateProfile] = useProfileUpdateMutation();

  // form states
  const defaultValues = useMemo(
    () => ({
      firstName: profileResponse.data?.results?.firstName || '',
      lastName: profileResponse.data?.results?.lastName || '',
      email: profileResponse.data?.results?.email || '',
      website: profileResponse.data?.results?.website || '',
      company: profileResponse.data?.results?.company || '',
      goods: profileResponse.data?.results?.goods || '',
      serviceType: profileResponse.data?.results?.serviceType || '',
      avatar: profileResponse.data?.results?.avatar || null,
      logo: profileResponse.data?.results?.logo || null,
      banner: profileResponse.data?.results?.banner || PLACEHOLDER_PROFILE_BANNER,
      phone: profileResponse.data?.results?.phone || '',
      address: profileResponse.data?.results?.address || {},
      about: profileResponse.data?.results?.about || '',
    }),
    [
      profileResponse.data?.results?.about,
      profileResponse.data?.results?.address,
      profileResponse.data?.results?.avatar,
      profileResponse.data?.results?.banner,
      profileResponse.data?.results?.company,
      profileResponse.data?.results?.email,
      profileResponse.data?.results?.firstName,
      profileResponse.data?.results?.goods,
      profileResponse.data?.results?.lastName,
      profileResponse.data?.results?.logo,
      profileResponse.data?.results?.phone,
      profileResponse.data?.results?.serviceType,
      profileResponse.data?.results?.website,
    ]
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [getProfile, user]);

  // update state
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  // if somehow user account is not available then show some errors
  if (!user || profileResponse?.isError || profileResponse?.data?.isError) {
    return <EmptyState text="User Account not found" />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} onReset={onReset}>
      <Stack spacing={5}>
        <Card sx={{ height: 290 }}>
          <BannerField joined={fDate(new Date())} />
        </Card>
        <Fields />
      </Stack>
    </FormProvider>
  );
};

export default SettingsGeneral;
